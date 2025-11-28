
<script lang="ts">
	import '../app.css';
	import Menu from '../../components/Menu.svelte';
    import PedidosTable from '../../components/PedidosTable.svelte';
	let { children } = $props();
    import { Heading } from 'flowbite-svelte';
    import UsersTable from '../../components/UsersTable.svelte';
    import { UserAddOutline  } from 'flowbite-svelte-icons';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import {logout, getCurrentUser, getToken, type User} from '$lib/auth';
    import { ArrowRightToBracketOutline } from "flowbite-svelte-icons";

    let user: User | null = null;
  let hasToken = false;

  // Verifica token sincronamente (instantâneo)
  function updateAuthStatus() {
    hasToken = getToken() !== null;
    
    // Se tem token, carrega dados do usuário em background
    if (hasToken && !user) {
      getCurrentUser().then(userData => {
        user = userData;
      }).catch(() => {
        user = null;
        hasToken = false;
      });
    } else if (!hasToken) {
      user = null;
    }
  }
  /**
   * se não existir usuário redireciona para a página de login
   * se não for admin redireciona para a página inicial
   */

   // função para logout (só apaga o token)
   async function handleLogout() {
    console.log('Logout iniciado...');
    try {
      await logout();
      user = null; // Limpar estado local
      console.log('Logout concluído, redirecionando...');
      goto('/login');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  }
  onMount(async () => {
    const user = await getCurrentUser();
    if (!user) {
      goto('/login');
    } else if (user.role !== 'admin') {
      goto('/');
    }
  });
</script>

<Menu/>

<div class="text-center p-8 pt-32">
    <div class="flex items-center justify-between max-w-3xl mx-auto mb-6">
      <Heading tag="h2" class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Pedido</Heading>
      
    </div>
    <PedidosTable />
  </div>