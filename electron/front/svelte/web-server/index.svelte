<Alert bind:alert={alert} {alert_level}></Alert>
<div class="row">
    <div class="col-8" style="padding:10px;">
        <WebServer
            on:editPassword={editPassword}>
        </WebServer>
    </div>
</div>
{#if (password)}
<div class="row">
    <div class="col-12" style="padding:10px;">
        <PasswordList
            on:update={update}
            bind:password={password}></PasswordList>
    </div>
</div>
{/if}
<script>
import {onMount, beforeUpdate, afterUpdate, createEventDispatcher} from 'svelte';

import WebServer from './info.svelte';
import PasswordList from './password_list.svelte';
import Alert from '../components/alert.svelte';
let alert;
let alert_level;

let password;

const editPassword = () => {
    console.log('editPassword');
    if  ( !password )   {
        api.getPassword().then((_password) => {
            password = _password;
            console.log(password);
        });
    } else {
        password = undefined;
    }
}
const update = () => {
    console.log('index', password);
    api.putPassword(password);
}
</script>
