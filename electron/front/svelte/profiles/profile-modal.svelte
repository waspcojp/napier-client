<style>

</style>

<div class="modal" id="profile-modal" tabindex="-1" data-bs-backdrop="static">
	<div class="modal-dialog modal-xl">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="modalLabel">
                    プロキシープロファイル
                </h5>
				<button type="button" class="btn-close" id="close-button" area-label="Close"
					on:click={close_}></button>
			</div>
			<div class="modal-body">
                <div class="row fill-height">
                    <div class="row mb-3">
                        <label for="name" class="col-sm-2 col-form-label">プロファイル名</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control"
                                disabled={ profile.name === 'default' }
                                bind:value={profile.name}>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="path" class="col-sm-2 col-form-label"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="プロトコルの指定は不要です">プロキシパス</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control"
                                disabled={ !specs || !specs.newProfile || ( profile.name === 'default')}
                                bind:value={profile.path}>
                        </div>
                    </div>
                    {#if ( specs && specs.useSSL )}
                    <div class="row mb-3">
                        <label for="ssl" class="col-sm-2 col-form-label"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="httpで接続された時にも強制的にhttpsでの接続にします">
                            強制HTTPS
                        </label>
                        <div class="col-sm-10">
                            <input type="checkbox" class="form-checkbox-input" bind:checked={profile.ssl} id="ssl">
                            <label class="form-checkbox-label" for="ssl">
                                強制的にHTTPSを使う
                            </label>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="lets" class="col-sm-2 col-form-label"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="証明書をLet's Encryptを使って自動的に取得します。">
                            Let's Encrypt
                        </label>
                        <div class="col-sm-10">
                            <input type="checkbox" class="form-checkbox-input" bind:checked={profile.lets} id="lets">
                            <label class="form-checkbox-label" for="lets">
                                Let's Encryptを使う
                            </label>
                        </div>
                    </div>
                    {#if ( !profile.lets)}
                    <hr/>
                    <div class="row mb-3">
                        <p>
                            以下はセキュリティのため表示上はテキスト形式になっていますが、指定する場合はエンコードされた形式で入力します。
                        </p>
                        {#if ( specs && specs.useWildcardCert && profile.name === 'default' )}
                        <p>
                            このサーバのデフォルトプロファイルでは、特別な場合を除いて指定する必要はありません。
                        </p>
                        {/if}
                    </div>
                    <div class="row mb-3">
                        <label for="key" class="col-sm-2 col-form-label">
                            秘密鍵(key)
                        </label>
                        <div class="col-sm-10">
                            <textarea class="form-control monospace" bind:value={profile.key} rows="4"></textarea>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="key" class="col-sm-2 col-form-label">
                            証明書(cert)
                        </label>
                        <div class="col-sm-10">
                            <textarea class="form-control monospace" bind:value={profile.cert} rows="4"></textarea>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="key" class="col-sm-2 col-form-label"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="認証局の証明書が必要な場合に指定します。通常は不要です">
                            認証局証明書
                        </label>
                        <div class="col-sm-10">
                            <textarea class="form-control monospace" bind:value={profile.ca} rows="4"></textarea>
                        </div>
                    </div>
                    {/if}
                    {/if}
                </div>
            </div>
			<div class="modal-footer">
				<button type="button" class="btn btn-info" id="close-button"
						on:click={close_}>取消</button>
				{#if ( profile && profile.name !== 'default' ) }
					<button type="button" class="btn btn-danger" id="delete-button"
						on:click={delete_}>削除</button>
                {/if}
                {#if ( specs && specs.useSSL )}
                    <button type="button" class="btn btn-primary" id="save-button"
						on:click={save}>保存</button>
                {/if}
            </div>
		</div>
	</div>
</div>
<script>

import {onMount, beforeUpdate, afterUpdate, createEventDispatcher} from 'svelte';
const dispatch = createEventDispatcher();

export let modal;
export let profile;
export let specs;

const clean_popup = () => {
	dispatch('close');
	modal.hide();
}

beforeUpdate(() => {
	//console.log('beforeUpdate profile-modal', profile);
});
afterUpdate(() => {
	//console.log('afterUpdate profile-modal');
});

const save = (event) => {
	console.log("save", profile);
    if  (( !profile.key ) ||
         ( !profile.key.match(/^---/) ))    {
        profile.key = undefined;
    }
    if  (( !profile.cert ) ||
         ( !profile.cert.match(/^---/) ))    {
        profile.cert = undefined;
    }
    if  (( !profile.ca ) ||
         ( !profile.ca.match(/^---/) ))    {
        profile.ca = undefined;
    }
    if  ( !profile.ssl )    {
        profile.ssl = false;
    }
	api.updateProfile(profile).then(() => {
		close_();
	}).catch((e) => {
		console.log(e);
	});
};

const close_ = (event) => {
    //console.log('close');
	clean_popup();
};

const delete_ = (event) => {
	api.deleteProfile(profile.id).then(() => {
		clean_popup();
	});
}

</script>
