<aside class="main-sidebar sidebar-bg-dark sidebar-color-primary shadow">
	<div class="brand-container">
        <a href="" class="brand-link">
            <img src="../../public/napier-white.svg" alt="Logo" class="brand-image opacity-80 shadow">
        </a>
        <a class="pushmenu mx-1" data-lte-toggle="sidebar-mini" href="#" role="button">
            <i class="fas fa-angle-double-left"></i>
        </a>
    </div>
    <div class="sidebar">
	    <nav class="mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column">
                {#if user_name}
			    <li class="nav-item">
				    <a href='#' class={(current == 'profile')  ? 'nav-link active': 'nav-link'}
                            on:click="{() => {current = 'profile'}}">
                        <i class="nav-icon fas fa-circle"></i>
                        プロファイル
                    </a>
			    </li>
			    <li class="nav-item">
    				<a href='#' class={(current == 'user' )  ? 'nav-link active': 'nav-link'}
                            on:click="{() => {current = 'user'}}">
                        <i class="nav-icon fas fa-circle"></i>
                        ユーザ情報
                    </a>
			    </li>
                {/if}
			    <li class="nav-item">
    				<a href='#' class={(current == 'config' )  ? 'nav-link active': 'nav-link'}
                            on:click="{() => {current = 'config'}}">
                        <i class="nav-icon fas fa-circle"></i>
                        サーバ接続設定
                    </a>
			    </li>
			    <li class="nav-item">
    				<a href='#' class={(current == 'web-server' )  ? 'nav-link active': 'nav-link'}
                            on:click="{() => {current = 'web-server'}}">
                        <i class="nav-icon fas fa-circle"></i>
                        ウェブサーバ設定
                    </a>
			    </li>
            </ul>
        </nav>
    </div>
</aside>

<script>
import {onMount} from 'svelte';

export let current;
export let user_name;

const CLASS_NAME_SIDEBAR_MINI = 'sidebar-mini';
const CLASS_NAME_SIDEBAR_MINI_HAD = 'sidebar-mini-had';
const CLASS_NAME_SIDEBAR_HORIZONTAL = 'sidebar-horizontal';
const CLASS_NAME_SIDEBAR_COLLAPSE$1 = 'sidebar-collapse';
const CLASS_NAME_SIDEBAR_CLOSE$1 = 'sidebar-close';
const CLASS_NAME_SIDEBAR_OPEN$1 = 'sidebar-open';
const CLASS_NAME_SIDEBAR_OPENING = 'sidebar-is-opening';
const CLASS_NAME_SIDEBAR_COLLAPSING = 'sidebar-is-collapsing';
const CLASS_NAME_SIDEBAR_IS_HOVER = 'sidebar-is-hover';
const CLASS_NAME_MENU_OPEN$1 = 'menu-open';
const SELECTOR_SIDEBAR = '.sidebar';
const SELECTOR_NAV_SIDEBAR = '.nav-sidebar';
const SELECTOR_NAV_ITEM$1 = '.nav-item';
const SELECTOR_NAV_TREEVIEW = '.nav-treeview';
const SELECTOR_MINI_TOGGLE = '[data-lte-toggle="sidebar-mini"]';
const SELECTOR_FULL_TOGGLE = '[data-lte-toggle="sidebar-full"]';

const bodyClass = document.body.classList;

const   sidebarHover = () => {
    const selSidebar = document.querySelector(SELECTOR_SIDEBAR);
    if (selSidebar) {
        selSidebar.addEventListener('mouseover', () => {
            bodyClass.add(CLASS_NAME_SIDEBAR_IS_HOVER);
        });
        selSidebar.addEventListener('mouseout', () => {
            bodyClass.remove(CLASS_NAME_SIDEBAR_IS_HOVER);
        });
    }
}

const   sidebarOpening = () => {
    bodyClass.add(CLASS_NAME_SIDEBAR_OPENING);
    setTimeout(() => {
        bodyClass.remove(CLASS_NAME_SIDEBAR_OPENING);
    }, 1000);
}

const   expand = () => {
    sidebarOpening();
    bodyClass.remove(CLASS_NAME_SIDEBAR_CLOSE$1);
    bodyClass.remove(CLASS_NAME_SIDEBAR_COLLAPSE$1);
    bodyClass.add(CLASS_NAME_SIDEBAR_OPEN$1);
}

const   collapse = () => {
    sidebarColllapsing();
    bodyClass.add(CLASS_NAME_SIDEBAR_COLLAPSE$1);
}

const   close = () => {
    bodyClass.add(CLASS_NAME_SIDEBAR_CLOSE$1);
    bodyClass.remove(CLASS_NAME_SIDEBAR_OPEN$1);
    bodyClass.remove(CLASS_NAME_SIDEBAR_COLLAPSE$1);
    if  ( bodyClass.contains(CLASS_NAME_SIDEBAR_HORIZONTAL) )   {
        menusClose();
    }
}

const   toggleFull = () => {
    if  ( bodyClass.contains(CLASS_NAME_SIDEBAR_CLOSE$1) )  {
        expand();
    } else {
        close();
    }
    if  ( bodyClass.contains(CLASS_NAME_SIDEBAR_MINI) ) {
        bodyClass.remove(CLASS_NAME_SIDEBAR_MINI);
        bodyClass.add(CLASS_NAME_SIDEBAR_MINI_HAD);
    }
}

const   sidebarColllapsing = () => {
    bodyClass.add(CLASS_NAME_SIDEBAR_COLLAPSING);
    setTimeout(() => {
        bodyClass.remove(CLASS_NAME_SIDEBAR_COLLAPSING);
    }, 1000);
}

const   menusClose = () => {
    const navTreeview = document.querySelectorAll(SELECTOR_NAV_TREEVIEW);
    for (const navTree of navTreeview) {
        navTree.style.removeProperty('display');
        navTree.style.removeProperty('height');
    }
    const navSidebar = document.querySelector(SELECTOR_NAV_SIDEBAR);
    const navItem = navSidebar === null || navSidebar === void 0 ? void 0 : navSidebar.querySelectorAll(SELECTOR_NAV_ITEM$1);
    if (navItem) {
        for (const navI of navItem) {
            navI.classList.remove(CLASS_NAME_MENU_OPEN$1);
        }
    }
}


const   toggleMini = () => {
    if  ( bodyClass.contains(CLASS_NAME_SIDEBAR_MINI_HAD) ) {
        bodyClass.remove(CLASS_NAME_SIDEBAR_MINI_HAD);
        bodyClass.add(CLASS_NAME_SIDEBAR_MINI);
    }
    if  ( bodyClass.contains(CLASS_NAME_SIDEBAR_COLLAPSE$1) )   {
        expand();
    } else {
        collapse();
    }
}

const   ready = () => {
    const fullBtn = document.querySelectorAll(SELECTOR_FULL_TOGGLE);
    for (const btn of fullBtn) {
        btn.addEventListener('click', event => {
            event.preventDefault();
            let button = event.currentTarget;
            if ((button === null || button === void 0 ? void 0 : button.dataset.lteToggle) !== 'sidebar-full') {
                button = button === null || button === void 0 ? void 0 : button.closest(SELECTOR_FULL_TOGGLE);
            }
            if (button) {
                toggleFull();
            }
        });
    }
    const miniBtn = document.querySelectorAll(SELECTOR_MINI_TOGGLE);
    for (const btn of miniBtn) {
        btn.addEventListener('click', event => {
            event.preventDefault();
            let button = event.currentTarget;
            if ((button === null || button === void 0 ? void 0 : button.dataset.lteToggle) !== 'sidebar-mini') {
                button = button === null || button === void 0 ? void 0 : button.closest(SELECTOR_FULL_TOGGLE);
            }
            if (button) {
                toggleMini();
            }
        });
    }
}
onMount(() => {
	console.log('sidebar onMounte');
    sidebarHover();
    ready();
});

</script>
