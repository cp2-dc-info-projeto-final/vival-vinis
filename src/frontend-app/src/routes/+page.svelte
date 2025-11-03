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
  import { adicionarAoCarrinho } from '$lib/stores/cart';
 

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
  
  function handleAddToCart(produto: Produto) {
  adicionarAoCarrinho({

    id: produto.id,
    nome: produto.nome,
    preco: produto.preco
  });
  alert(`${produto.nome} foi adicionado ao carrinho!`);
}
  
  </script>

<Menu />


<div class="nav-right">
    <Heading>NOSSO CATÁLOGO</Heading>
        <p>
            Conheça nosso catálogo de vinis!
        </p>

</div>

      <!-- Cards para telas pequenas -->
      <div class="block xl:hidden">
        <div class="flex flex-col items-center gap-4 my-8 max-w-3xl mx-auto md:grid md:grid-cols-2">
            {#each produtos as produto}
                <Card class="max-w-sm w-full p-0 overflow-hidden shadow-lg border border-gray-200">
                  <img src={`http://localhost:3000${produto.imagem}`} alt={produto.nome} class="w-full h-48 object-cover" />
                  <div class="px-4 pb-4 pt-2 flex flex-col gap-2 text-left">
                      <div class="flex items-center gap-2 text-left"></div>
                  </div>
                  
                  <div class="px-4 pt-4 pb-2 bg-gray-100 text-left flex items-center justify-between">
                        <div>
                            <div class="text-lg font-semibold text-gray-800 text-left">{produto.nome}</div>
                            <div class="text-xs text-gray-400 text-left">ID: {produto.id}</div>
                        </div>
                        <div class="flex gap-2">
                              <!-- Botão adicionar ao carrinho -->
                          <button
                          title="Adicionar ao carrinho"
                          class="p-2 rounded border border-green-200 hover:border-green-400 transition bg-transparent"
                          on:click={() => handleAddToCart(produto)}
                          >
                          <ShoppingBagOutline class="w-5 h-5 text-green-500" />
                          </button>
                        </div>
      
                    </div>
                  
                </Card>
            {/each}
        </div>
      </div>

{#if hasToken}
        {#if user} <!-- se existir usuário é porque conseguiu logar-->
   
          {#if user.role === 'admin'} <!-- só exibe menu usuários para admin-->
<button class="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-gray rounded-lg font-semibold shadow transition" on:click={() => goto('/cadastroproduto')}>
   
    Consulta ou Cadastro de Produtos
</button>

{/if}
{/if}
{/if}
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
                    <a href="#" class="hover:underline me-4 md:me-6">Política de Privacidade</a>
                </li>
                <li>
                    <a href="#" class="hover:underline">Contato</a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="" class="hover:underline">Vival</a>. All Rights Reserved.</span>
    </div>
  </footer>
  


