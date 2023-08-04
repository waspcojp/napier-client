<div class="card">
    <div class="card-header">
        ウェブサーバ設定
   </div>
    <div class="card-body">
        <div class="form-check">
            <input class="form-check-input" type="checkbox"
                disabled={run}
                bind:checked={conf.directoryListing} value=true id="directoryListing">
            <label class="form-check-label" for="directroyListing"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="ファイル交換等に使う時はチェックすると楽ですが、ファイルの存在が見えてしまうので注意しましょう">
                インデクスファイルがない場合に自動的に生成して送信する
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox"
                disabled={run}
                bind:checked={conf.symlinks} value=true id="symlinks">
            <label class="form-check-label" for="symlinks"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="有効にすると思いがけないファイルを送信してしまうかも知れません">
                シンボリックリンクを追跡して送信する
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox"
                disabled={run}
                bind:checked={conf.markdown} value=true id="markdown">
            <label class="form-check-label" for="markdown"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="便利ですが、有効にすると生のマークダウンファイルを送信しなくなります">
                マークダウン形式をサーバでレンダリングする
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="checkbox"
                disabled={run}
                bind:checked={conf.authenticate} value=true id="authenticate">
            <label class="form-check-label" for="authenticate"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="あらかじめ登録された利用者のみアクセス可能になります">
                組み込み認証機能を使う
            </label>
            <button type="button" class="btn btn-info"
                disabled={run || !conf.authenticate}
                on:click={editPassword}>パスワードファイル編集</button>
        </div>
        <div class="row">
            <label for="root" class="col-sm-4 col-form-label"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="ウェブで公開するコンテンツのあるフォルダを指定します">
                コンテンツのあるフォルダの場所
            </label>
            <div class="col-sm-8">
                <input type="text" class="form-control"
                    disabled={run}
                    on:click={openDialog}
                    bind:value={conf.public}>
            </div>
        </div>
        <div class="row">
            <label for="root" class="col-sm-4 col-form-label"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="このポート番号はプロキシの起動の時に参照できます。">
                ウェブサーバで使うポートの番号
            </label>
            <div class="col-sm-2">
                <input type="text" class="form-control number"
                    disabled={run}
                    bind:value={conf.port}>
            </div>
        </div>
    </div>
    <div class="card-footer">
        <button type="button" class="btn btn-primary"
            on:click={update}
            disabled={run}
            >設定更新</button>
        {#if (run) }
        <button type="button" class="btn btn-danger"
            on:click={start}>停止</button>
        {:else}
        <button type="button" class="btn btn-primary"
            on:click={start}>始動</button>
        {/if}
    </div>
</div>

<script>
import {onMount, beforeUpdate, afterUpdate, createEventDispatcher} from 'svelte';
const dispatch = createEventDispatcher();

let conf;
let run;

beforeUpdate(() => {
    if  ( !conf )   {
        conf = {};
    }
});
onMount(()=> {
    //console.log('web-server:onMount');
    conf = {};
    api.getConf().then((_env) => {
        if  ( _env.webServer )   {
            conf = {
                public: _env.webServer.public,
                port: _env.webServer.port,
                directoryListing: _env.webServer.directoryListing,
                symlinks: _env.webServer.symlinks,
                markdown: _env.webServer.markdown,
                authenticate: _env.webServer.authenticate
            };
        }
    }).catch((e) => {
        console.log('error', e);
    });

    api.checkWebServer().then((ret) => {
        run = ret;
    })
});

const update = () => {
    console.log('update', conf);
    api.setConf({
        webServer: conf
    });
}

const start = () => {
    if  ( !run )    {
        api.setConf({
            webServer: conf
        }).then(() => {
            api.startWebServer().then(() => {
                run = true;
            });
        });
    } else {
        api.stopWebServer().then(() => {
            run = false;
        }).catch(() => {
        });
    }
}

const openDialog = async () => {
    let path = await api.openDialog();
    if  ( path ) {
        conf.public = path;
    }
}

const editPassword = () => {
    dispatch('editPassword');
}
</script>
