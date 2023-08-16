<div class="card">
    <div class="card-header">
        利用者一覧
    </div>
    <div class="card-body" style="overflow-y:auto;height:220px;">
        <table class="table">
            <thead>
                <tr>
                    <th class="col-2">
                        ユーザ名
                    </th>
                    <th class="col-7">
                        説明
                    </th>
                    <th class="col-1">
                        状態
                    </th>
                    <th class="col-2">

                    </th>
                </tr>
            </thead>
            <tbody>
                {#if (password)}
                {#each password as pass,index}
                <tr>
                    <td>
                        <a
                            data-index={index}
                            on:click|preventDefault={editUser}>
                            {pass.name}
                        </a>
                    </td>
                    <td>
                        {pass.description || ''}
                    </td>
                    <td style="text-align:center;">
                        {#if pass.expire}
                        <div style="font-size:20px;" class="text-danger">
                            <i title="利用停止中" class="fa-solid fa-ban"></i>
                        </div>
                        {/if}
                    </td>
                    <td>
                        <button type="button" class="btn btn-danger btn-sm"
							data-index={index}
							on:click={Delete}>
                            <i title="削除" class="fa-solid fa-trash-can"></i>
                        </button>
                        {#if !pass.expire}
                        <button type="button" class="btn btn-warning btn-sm"
							data-index={index}
							on:click={Stop}>
                            <i title="利用停止" class="fa-solid fa-ban"></i>
                        </button>
                        {/if}
                        {#if pass.expire}
                        <button type="button" class="btn btn-warning btn-sm"
							data-index={index}
							on:click={Restart}>
                            <i title="利用再開" class="fa-solid fa-trash-arrow-up"></i>
                        </button>
                        {/if}
                    </td>
                </tr>
                {/each}
                {/if}
            </tbody>
        </table>
    </div>
    <div class="card-footer">
        <button type="button" class="btn btn-primary"
            on:click={newUser}>
            新規登録
        </button>
    </div>
</div>
<PasswordPopup
    on:update={update}
    bind:entry={entry}
    {modal}>
</PasswordPopup>

<script>
import {onMount, beforeUpdate, afterUpdate, createEventDispatcher} from 'svelte';
import Modal from 'bootstrap/js/dist/modal';

import PasswordPopup from './password_popup.svelte';
let modal;
let entry;
export let password;
const dispatch = createEventDispatcher();

let line_no;
const editUser = (event) => {
    line_no = event.target.dataset.index;
    //console.log('line_no', line_no);
    entry = {
        name: password[line_no].name,
        description: password[line_no].description
    };
    modal.show();
}
const Delete= (event) => {
    line_no = event.currentTarget.dataset.index;
    //console.log('line_no', line_no);
    password.splice(line_no, 1);
    password = password;
    console.log(password);
    dispatch('update');
}
const Stop = (event) => {
    line_no = event.currentTarget.dataset.index;
    //console.log('line_no', line_no);
    password[line_no].expire = new Date();
    dispatch('update');
}
const Restart = (event) => {
    line_no = event.currentTarget.dataset.index;
    //console.log('line_no', line_no);
    password[line_no].expire = undefined;
    dispatch('update');
}
const newUser = (event) => {
    entry = {};
    line_no = undefined;
    modal.show();
}
const update = () => {
    console.log({line_no});
    if  ( line_no ) {
        password[line_no].name = entry.name;
        password[line_no].description = entry.description;
        if  ( entry.password )  {
            password[line_no].hash_password = undefined;
            password[line_no].password = entry.password;
        }
    } else {
        password.push({
            name: entry.name,
            description: entry.description,
            password: entry.password
        });
    }
    password = password;
    dispatch('update');
}
afterUpdate(() => {
    if  ( !modal )  {
        modal = new Modal(document.getElementById('password-modal'));
    }
})

</script>