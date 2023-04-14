<div class="modal" id="login-modal" tabindex="-1" data-bs-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="modalLabel">サーバログイン</h5>
				<button type="button" class="btn-close" id="close-button" area-label="Close"
					on:click={close_}></button>
			</div>
            <form>
                <div class="modal-body">
                    <div class="row">
                        <label for="user_name" class="col-form-label">
                            ユーザ名
                        </label>
                    </div>
                    <div class="row">
                        <div class="input-group">
                            <input type="text" bind:value={user_name} class="form-control" placeholder="User name">
                        </div>
                    </div>
                    <div class="row">
                        <label for="password" class="col-form-label">
                            パスワード
                        </label>
                    </div>
                    <div class="row">
                        <div class="input-group">
                            <input type="password" bind:value={password} class="form-control" placeholder="Password">
                        </div>
                    </div>
                </div>
			    <div class="modal-footer">
                    <button type="button" class="btn btn-info"
                        on:click={close_}>
                        取消
                    </button>
                    <button type="button" class="btn btn-primary"
                        on:click={Login}>
                        ログイン
                    </button>
			    </div>
            </form>
		</div>
	</div>
</div>

<script>
import {onMount, beforeUpdate, afterUpdate, createEventDispatcher} from 'svelte';
const dispatch = createEventDispatcher();

export let alert;
export let alert_level;
export let user_name;
export let specs;
export let modal;

let password;

const close_ = (event) => {
    console.log('close');
	modal.hide();
};

const Login = () => {
    console.log('user_name', user_name);
    try {
        api.login(user_name, password).then(() => {
            alert = 'login OK';
            alert_level = 'alert-success';
            api.setConf({
                user: user_name,
                password: password
            }).then(() => {
                api.getConf().then((_env) => {
                    dispatch('login');
                    specs = _env.serverSpecs;
                    console.log('loginModal', user_name);
                });
            });
        }).catch((msg) => {
            alert = msg;
            alert_level = 'alert-danger'
        });
    } catch(e) {
        console.log('login fail', e);
    }
    close_();
}

</script>