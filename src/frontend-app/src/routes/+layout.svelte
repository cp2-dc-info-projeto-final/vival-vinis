<script lang="ts">
	import '../app.css';
	import Menu from '../components/Menu.svelte';
	let { children } = $props();
</script>

<main class="flex flex-col items-center justify-center min-h-screen w-full bg-white dark:bg-gray-900">
  <Menu />
  <div class="w-full">
    {@render children()}
  </div>
</main>
