<div  class="wrapper">
    <CommonNav
        bind:user_name={user_name}
        bind:current={current}></CommonNav>
    <SideBar bind:current={current}
        user_name={user_name}></SideBar>
    <main class="content-wrapper">
        <div class="content">
            <div class="container-fluid">
            {#if ( current == 'user' ) }
                <User></User>
            {:else if ( current == 'profile' ) }
                <Profiles
                    specs={specs}></Profiles>
            {:else if ( current == 'config' ) }
                <Config
                    bind:user_name={user_name}
                    bind:specs={specs}
                    on:login={loggedIn}
                    ></Config>
            {:else if ( current == 'web-server') }
                <WebServer
                    ></WebServer>
            {:else}
                <div class="row">
                    <div class="col-5" style="padding:10px;">
                    </div>
                    <div class="col-3" style="padding:10px;">
                    </div>
                </div>
            {/if}
            </div>
        </div>
    </main>
    <CommonFooter></CommonFooter>
</div>

<script>
import {onMount, beforeUpdate, afterUpdate, createEventDispatcher} from 'svelte';
import User from './user/index.svelte';
import Profiles from './profiles/index.svelte';
import CommonNav from './common/nav.svelte';
import SideBar from './common/sidebar.svelte';
import Config from './config/config.svelte';
import CommonFooter from './common/footer.svelte';
import WebServer from './web-server/index.svelte';

let user_name;
let specs;
let current;

const loggedIn = () => {
    //console.log('logged in');
}

onMount(() => {
    //console.log('index.svelte', env);
    if  (( env.user ) &&
         ( env.password ) ) {
        console.log('login');
        api.login(env.user, env.password).then(() => {
            api.getConf().then((_env) => {
                console.log('logged in', _env);
                specs = _env.serverSpecs;
                user_name = _env.user;
                current = 'profile';
            });
        }).catch((e) => {
            console.log('login fail', e);
            current = 'config';
        })
    } else {
        current = 'config';
    }
});

</script>
