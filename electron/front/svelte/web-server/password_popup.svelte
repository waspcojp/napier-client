<div class="modal" id="password-modal" tabindex="-1" data-bs-backdrop="static">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header ">
		        <h5 class="modal-title" id="passwordLabel">利用者情報</h5>
		        <button type="button" class="btn-close" id="password-close-button" area-label="Close"
			        on:click={close_}></button>
	        </div>
            <form>
                {#if entry }
    	        <div class="modal-body">
                    <div class="row">
                        <label for="user_name" class="col-form-label">
                            ユーザ名
                        </label>
                    </div>
                    <div class="row">
                        <div class="input-group">
                            <input type="text" bind:value={entry.name} class="form-control" placeholder="User name">
                        </div>
                    </div>
                    <div class="row">
                        <label for="password" class="col-form-label">
                            パスワード
                        </label>
                    </div>
                    <div class="row">
                        <div class="input-group">
                            <input type="text" bind:value={entry.password} class="form-control" placeholder="Password">
                        </div>
                    </div>
                    <div class="row">
                        <label for="description" class="col-form-label">
                            説明
                        </label>
                    </div>
                    <div class="row">
                        <div class="input-group">
                            <input type="text" bind:value={entry.description} class="form-control" placeholder="Description">
                        </div>
                    </div>
                </div>
                {/if}
	            <div class="modal-footer">
                    <button type="button" class="btn btn-info"
                        on:click={close_}>
                        取消
                    </button>
                    <button type="button" class="btn btn-primary"
                        on:click={update}>
                        登録
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
import {onMount, beforeUpdate, afterUpdate, createEventDispatcher} from 'svelte';
const dispatch = createEventDispatcher();

export let modal;
export let entry;

const close_ = () => {
    console.log('close_');
	modal.hide();
}
const update = () => {
    dispatch('update');
	modal.hide();
}
</script>