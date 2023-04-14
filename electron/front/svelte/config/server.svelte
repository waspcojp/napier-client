<div class="card">
    <div class="card-header">
        サーバ接続設定
    </div>
    <div class="card-body login-card-body">
        <div class="row full-height">
            <label for="server_name" class="col-form-label">
                サーバのURL
            </label>
        </div>
        <div class="row full-height">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Server API address"
                    id="server_name"
                    bind:value={host}>
            </div>
        </div>
        <div class="row full-height">
            <label for="port" class="col-form-label">
                サーバのweb socketのポート番号
            </label>
        </div>
        <div class="row full-height">
            <div class="input-group">
                <input type="text"class="form-control" placeholder="websocket port"
                    id="port"
                    bind:value={port}>
            </div>
        </div>
        <div style="margin-top:10px;">
            <button type="button" class="btn btn-primary"
                on:click={Update}>
                更新
            </button>
            {#if ( !user_name || ( user_name == '' )) }
            <button type="button" class="btn btn-primary"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="サーバに接続します"
                on:click={Connect}>
                接続
            </button>
            {:else}
            <a on:click|preventDefault={Logout} href="#" class="btn btn-secondary"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="サーバから切断します">
                切断
            </a>
            {/if}
        </div>
    </div>
</div>
<script>
import {onMount, beforeUpdate, afterUpdate, createEventDispatcher} from 'svelte';

export let alert;
export let alert_level;
export let user_name;
export let modal;

let host;
let port;

const Update = () => {
    console.log('host', host);
    api.setConf({
        host: host,
        port: port
    }).then(() => {
        api.logout().then(() => {
        });
    })
}

onMount(() => {
    //console.log('beforeUpdate server.svelte', host, port);
    if  ( !host )   {
        host = env.host;
    }
    if  ( !port )   {
        port = env.port;
    }
})
const Connect = () => {
    console.log('Connect');
    api.setConf({
        host: host,
        port: port
    }).then(() => {
        modal.show();
    });
}
const Logout = () => {
	try	{
		api.logout().then(() => {
			user_name = undefined;
		});
	} catch(e) {
		console.log('logout fail', e)
	}
}

</script>