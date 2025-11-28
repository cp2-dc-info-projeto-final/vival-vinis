<script lang="ts">
  import { Heading } from 'flowbite-svelte';
  import { Card } from 'flowbite-svelte';
  import Menu from '../components/Menu.svelte';
  import { goto } from '$app/navigation';
  import {  P, ImagePlaceholder, Skeleton, TextPlaceholder } from "flowbite-svelte";
  import { UserEditOutline, TrashBinOutline, ShoppingBagOutline } from 'flowbite-svelte-icons';
  import { produto as authProduto } from "$lib/api";
  import { onMount } from "svelte";
  import { logout, getCurrentUser, getToken, type User } from "$lib/auth";
  import { page } from "$app/stores";
  import ProdutoTable from '../components/ProdutoTable.svelte';
  import { adicionarAoCarrinho } from '$lib/stores/carrinho';
 

// Tipagem para Produto
type Produto = {
      id: number;
      nome: string;
      descricao: string;
      preco: number;
      estoque: number;
      imagem: string;
  };

  // Variáveis principais
  let produtos: Produto[] = []; // Lista de produtos
  let loading = true;
  let error = '';
  let deletingId: number | null = null; // id em deleção
  let confirmOpen = false; // Modal aberto?
  let confirmTargetId: number | null = null; // id alvo do modal

  // Variáveis para upload de imagem
  let imagemFile: File | null = null;
  let previewUrl: string = ''; // URL para o preview da imagem
  let mensagemErro: string = ''; // Mensagem de erro para upload

  

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

  function openConfirm(id: number) {
      confirmTargetId = id;
      confirmOpen = true;
  }
  // Reativo à mudança de página
  $: if ($page.url) {
    updateAuthStatus();
  }

  onMount(() => {
    updateAuthStatus();

  });
  

  </script>

<Menu />

<br><br><br><br><br>
<div class="relative h-56 overflow-hidden rounded-lg md:h-96">
  <!-- Item 1 -->
 <div class="duration-700 ease-in-out" data-carousel-item>
     <img src="../images/vival vinis.png" class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="...">
 </div>
 <!-- Item 2 -->
 <div class="hidden duration-700 ease-in-out" data-carousel-item>
 </div>
</div>
<br><br>
<div class="nav-right text-center">
    <Heading>MAIS VENDIDOS</Heading>
        <p>
            Conheça nosso catálogo de vinis!
        </p>

</div>
<ProdutoTable/>


<footer class="bg-white rounded-lg shadow-sm dark:bg-gray-900 m-4">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="/images/1000285043 (1).png" class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">vival</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="/about" class="hover:underline me-4 md:me-6">Sobre</a>
                </li>
                <li>
                    <a href="/" class="hover:underline me-4 md:me-6">Política de Privacidade</a>
                </li>
                <li>
                    <a href="/" class="hover:underline">Contato</a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="/" class="hover:underline">Vival</a>. All Rights Reserved.</span>
    </div>
  </footer>
  


