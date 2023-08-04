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
            {password}></PasswordList>
    </div>
</div>
{/if}

<script>
import WebServer from './info.svelte';
import PasswordList from './password_list.svelte';
import Alert from '../components/alert.svelte';

let alert;
let alert_level;

let password;

const editPassword = () => {
    console.log('editPassword');
    api.getPassword().then((_password) => {
        password = [];
        for ( let name of Object.keys(_password)) {
            let ent = _password[name];
            password.push({
                name: name,
                description: ent.description,
                expire: ent.expire
            });
        }
        console.log(password);
    });
}
</script>
