<script lang="ts">
  import { Heading } from 'flowbite-svelte';
  import UsersTable from '../../components/UsersTable.svelte';
  import { UserAddOutline  } from 'flowbite-svelte-icons';
  import { goto } from '$app/navigation';
</script>

<div class="text-center p-8 pt-32">
  <div class="flex items-center justify-between max-w-3xl mx-auto mb-6">
    <Heading tag="h2" class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Usuários</Heading>
    <button class="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold shadow transition" on:click={() => goto('/users/new')}>
      <UserAddOutline class="w-5 h-5" />
      Adicionar
    </button>
  </div>
  <UsersTable />
</div>



<footer class="bg-white rounded-lg shadow-sm dark:bg-gray-900 m-4">
  <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div class="sm:flex sm:items-center sm:justify-between">
          <a href="" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
              <img src="/images/1000285043 (1).png" class="h-8" alt="Flowbite Logo" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">vival</span>
          </a>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                  <a href="/about" class="hover:underline me-4 md:me-6">Sobre</a>
              </li>
              <li>
                  <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
              </li>
              <li>
                  <a href="#" class="hover:underline">Contact</a>
              </li>
          </ul>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="" class="hover:underline">Vival</a>. All Rights Reserved.</span>
  </div>
</footer>
