<div class="card">
    <div class="card-header">
            <a href="#" class="nav-link"
                on:click|preventDefault={click}>
                {profile.name}
            </a>
    </div>
    <ProfileCard
        {specs}
        {profile}></ProfileCard>
    <div class="card-footer">
        <div class="row">
            <div class="form-check col-sm-4" id="check" style="padding-top:7px;">
                <input type="checkbox" class="form-check-input"
                    bind:checked={web} value=true
                    on:change={change}>
                <label class="form-check-label" for="start"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="ウェブサーバに指定したポート番号を使用します">
                    web
                </label>
            </div>
            <div class="col-4">
                <input type="text" class="form-control number"
                    disabled={run}
                    bind:value={profile.localPort} >
            </div>
            {#if (run) }
            <button type="button" class="btn btn-danger col-4"
                on:click={start}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="プロキシを停止します(ウェブサーバは連動しません)">
                停止</button>
            {:else if ( specs && !specs.newProfile ) && ( profile.name !== 'default' )}
            <button type="button" class="btn btn-primary col-4" disabled
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="プロキシを起動します">
                開始</button>
            {:else}
            <button type="button" class="btn btn-primary col-4"
                on:click={start}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="プロキシを起動します">
                開始</button>
            {/if}
        </div>
    </div>
</div>

<script>
import {onMount, beforeUpdate, afterUpdate, createEventDispatcher} from 'svelte';
const dispatch = createEventDispatcher();
import ProfileCard from './profile-card.svelte';

export  let profile;
export  let specs;

let web;
let run;
let env;

const change = () => {
    //console.log('profile change', profile, env.webServer);
    if  ( env.webServer )   {
        if  ( web ) {
            profile.localPort = env.webServer.port;
        }
        profile.startWeb = web;
        api.updateProfile(profile);
    }
}

onMount(()=> {
    //console.log('profile:onMount');
    api.getConf().then((_env) => {
        env = _env;
        if  ( env.webServer )   {
            web = profile.startWeb;
        } else {
            web = false;
        }
        change();
        api.checkProxy(profile.name).then((ret) => {
            //console.log('ret', profile.name, ret);
            run = ret;
        })
    });
});

const   click = (event) => {
    dispatch('open', profile);
}
const start = (event) => {
    //console.log('start', profile.name);
    if  ( !run )  {
        api.startProxy(profile.name, profile.localPort).then(() => {
            api.setConf().then(() => {
                run = true;
            });
        });
        if  ( web ) {
            api.checkWebServer().then((ret) => {
                if  ( !ret )    {
                    api.startWebServer();
                }
            });
        }
    } else {
        api.stopProxy(profile.name).then(() => {
            run = false;
        });
/*
        if  ( web ) {
            api.checkWebServer().then((ret) => {
                if  ( ret )    {
                    api.stopWebServer();
                }
            });
        }
*/
    }
}
</script>