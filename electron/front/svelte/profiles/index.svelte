<Alert bind:alert={alert} {alert_level}></Alert>
<h1 class="display-6">プロファイル一覧</h1>
{#if ( specs && specs.newProfile )}
<div class="row">
    <div class="col-auto me-auto"></div>
    <div class="col-auto">
        <button type="button" class="btn btn-primary"
            on:click={newProfile}>新規作成</button>
    </div>
</div>
{/if}
<div class="row">
{#each profiles as profile}
    <div class="col-4" style="padding:10px;">
        <Profile
            {specs}
            bind:profile={profile}
            on:open={openProfile}
        ></Profile>
    </div>
{/each}
</div>
<ProfileModal
    {modal}
    {profile}
    {specs}
    on:close={close_}></ProfileModal>

<script>
import {onMount, beforeUpdate, afterUpdate, createEventDispatcher} from 'svelte';
import Profile from './profile.svelte';
import Modal from 'bootstrap/js/dist/modal';
import ProfileModal from './profile-modal.svelte';
import Alert from '../components/alert.svelte';

let alert;
let alert_level;

export let specs;

let profiles = [];
let modal;
const _profile = {
    path: ''
}
let profile = _profile;

const   openProfile = (event) => {
    event.preventDefault();
    profile = event.detail;
    openModal = true;
}
const   newProfile = (event) => {
    profile = _profile;
    openModal = true;
}

const   close_ = (event) => {
    updateProfiles();
}

const   updateProfiles = () => {
    api.getProfiles().then((body) => {
            //console.log('body', {body});
            profiles = body.profiles;
        }).catch ((e) => {
            console.log('error', e);
        })
}

let openModal = false;
afterUpdate(() => {
    if  ( !modal )  {
        modal = new Modal(document.getElementById('profile-modal'));
    }
    if  ( openModal )   {
        modal.show();
        openModal = false;
    }
})

onMount(() => {
    updateProfiles();
})
</script>