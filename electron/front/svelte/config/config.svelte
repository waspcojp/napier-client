<div class="row">
    <div class="col-6" style="padding:10px;">
        <Server
            {modal}
            bind:user_name={user_name}
            bind:alert={alert}
            bind:alert_level={alert_level}>
        </Server>
    </div>
    {#if ( !user_name || ( user_name == '' )) }
    <div class="col-6" style="padding:10px;">
        <SignUp bind:alert={alert} bind:alert_level={alert_level}>
        </SignUp>
    </div>
    {/if}
</div>
<Alert bind:alert={alert} {alert_level}></Alert>
<Login
    on:login={login}
    {modal}
    bind:user_name={_user_name}
    bind:specs={specs}
    bind:alert={alert}
    bind:alert_level={alert_level}></Login>

<script>
import {onMount, beforeUpdate, afterUpdate, createEventDispatcher} from 'svelte';
import Modal from 'bootstrap/js/dist/modal';

import SignUp from './signup.svelte';
import Server from './server.svelte';
import Login from './login-modal.svelte';
import Alert from '../components/alert.svelte';

const dispatch = createEventDispatcher();

export let user_name;
export let specs;

let alert;
let alert_level;
let _user_name;
let modal;

afterUpdate(() => {
    if  ( !modal )  {
        modal = new Modal(document.getElementById('login-modal'));
    }
})

const   login = () => {
    user_name = _user_name;
    dispatch('login');
    console.log('login', user_name, ':', _user_name);
}

</script>