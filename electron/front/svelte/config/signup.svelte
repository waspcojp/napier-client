<div class="card">
    <div class="card-header">
        利用者登録
    </div>
    <div class="card-body login-card-body">
        <form>
            <div class="row">
                <label for="user_name" class="col-form-label"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="デフォルトプロファイルに使われますので、URLに使用できる名前にして下さい">
                    ユーザ名
                </label>
            </div>
            <div class="row">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="User name"
                        id="user_name"
                        bind:value={user_name}>
                </div>
            </div>
            <div class="row">
                <label for="password" class="col-form-label"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="システムでは特に制限をしていませんが、他人にわかりにくいものにして下さい">
                    パスワード
                </label>
            </div>
            <div class="row">
                <div class="input-group">
                    <input type="text"class="form-control" placeholder="Password"
                        id="password"
                        bind:value={password}>
                </div>
            </div>
            <div class="row">
                <label for="inputConfirmPassword" class="col-form-label"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="確認のために再度パスワードを入れて下さい">
                    パスワードの再入力
                </label>
            </div>
            <div class="row">
                <div class="input-group">
                    <input type="text" class="form-control" id="inputConfirmPassword"
                        bind:value={confirmPassword}>
                </div>
            </div>
            <div class="row">
                <label for="mail" class="col-form-label">
                    メールアドレス
                </label>
            </div>
            <div class="row">
                <div class="input-group">
                    <input type="text" class="form-control" id="mail"
                        bind:value={mail}>
                </div>
            </div>
            <div style="margin-top:10px;">
                <button type="button" class="btn btn-primary"
                    on:click|preventDefault={SignUp}>
                    登録
                </button>
            </div>
        </form>
    </div>
</div>

<script>

let user_name;
let password;
let confirmPassword;
let mail;

export let alert;
export let alert_level;

const SignUp = () => {
    try {
        if  ( password == confirmPassword ) {
            api.signup(user_name, password, mail).then((res) => {
                alert = 'signup ok';
                alert_level = 'alert-success'
            }).catch((msg) => {
                alert = msg;
                alert_level = 'alert-danger'
            });
        } else {
            alert = 'password not match';
            alert_level = 'alert-danger'
        }
    } catch(e) {
        console.log('signup fail', e);
    }
}

</script>