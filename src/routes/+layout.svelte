<script lang="ts"  >
	let { data, children } = $props();
	import 'flowbite';
	import '../app.css'
  import { goto } from '$app/navigation';

  function paraLogin() {
    goto('/login');
  }
</script>

<nav class="bg-yellow-800 border-gray-200 dark:bg-gray-900">
  
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="1000272312.png" class="h-12" alt="Flowbite Logo" />
      <span class="self-center text-2xl font-semibold whitespace-nowrap text-amber-50">vival vinis</span>
  </a>
   
  <div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
    <button type="button" class="text-amber-50 bg-amber-50 hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-orange-300 dark:hover:bg-orange-200 dark:focus:ring-orange-500" onclick={paraLogin}>Login</button>
      
      <button data-collapse-toggle="navbar-cta" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
  
  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-900">
      <li>
        <a href="#" class="block py-2 px-3 md:p-0 text-white bg-orange-700 rounded-sm md:bg-transparent md:text-gray-900 md:dark:text-gray-900" aria-current="page">Página Inicial</a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-300 md:dark:hover:text-orange-300 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Sobre</a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-300 md:dark:hover:text-orange-300 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Serviços</a>
      </li>
      <li>
        <a href="#" class="block py-2 px-3 md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-300 md:dark:hover:text-orange-300 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contate-nos</a>
      </li>
      <div class="relative hidden md:block">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only">Search icon</span>
      </div>
    </ul>
  </div>
  </div>
  
</nav>
<br>
<form method="POST" action="/login">
	<!-- content -->
</form>

<div class="layout">
	<main>
		{@render children()}
	</main>

</div>

<style>
	@media (min-width: 640px) {
		.layout {
			display: grid;
			gap: 2em;
			grid-template-columns: 1fr 16em;
		}
	}
</style>