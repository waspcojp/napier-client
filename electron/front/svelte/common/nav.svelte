<nav class="main-header navbar navbar-expand-lg navbar-light bg-light">
	<div class="container-fluid">
		<ul class="navbar-nav">
			<li class="nav-item">
			</li>
		</ul>
		<span class="havbar-text">
		</span>
		<ul class="navbar-nav ms-auto">
			<li class="nav-item dropdown">
				{#if ( user_name) }
				<a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" id="user_menu"
						role="button" aria-expanded="false">
					<span class="d-none d-md-inline">{user_name}</span>
				</a>
				<ul class="dropdown-menu"
						aria-labelledby="user_menu">
					<li>
						<a on:click|preventDefault={Logout} class="dropdown-item">
							Sign out
						</a>
					</li>
				</ul>
				{:else}
				&nbsp;
				{/if}
			</li>
		</ul>
	</div>
</nav>

<script>
export let current;
export let user_name;

const Logout = () => {
	try	{
		api.logout().then(() => {
			user_name = undefined;
			current = 'config';
		});
	} catch(e) {
		console.log('logout fail', e)
	}
}
</script>
