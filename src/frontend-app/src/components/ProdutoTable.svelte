<script lang="ts">
  import { goto } from '$app/navigation';
  import api from '$lib/api'; // API backend
  import { onMount } from 'svelte'; // ciclo de vida
  import { adicionarAoCarrinho } from '$lib/stores/carrinho'
  import {getToken, getCurrentUser, type User} from '$lib/auth';
  import { TrashBinOutline,  UserEditOutline } from 'flowbite-svelte-icons'; // ícones
  import ConfirmModal from './ConfirmModal.svelte'; // modal de confirmação]
  
  const baseURL = api.defaults.baseURL;

  // Tipagem para Produto
  type Produto = {
      id: number;
      nome: string;
      descricao: string;
      preco: number; 
      estoque: number;
      imagem: string;
  };

  let produtos: Produto[] = [];
  let erro = '';
  let search = '';
  let isAdmin = false; 
  let loading = false;

  let user: User | null = null;
  //let hasToken = false;

  let produtoAdicionado: number | null = null;

  function mostrarFeedback(id: number) {
      produtoAdicionado = id;
      setTimeout(() => {
        produtoAdicionado = null;
      }, 2000);
  }

  async function adicionarProdutoAoCarrinho(produto: Produto) {
    adicionarAoCarrinho({
      id: produto.id,
      nome_produto: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      estoque: produto.estoque,
      imagem: produto.imagem,
    
    });
    mostrarFeedback(produto.id);
  }

  async function buscarUsuarioLogado() {
    try {
      const token = getToken();
      if (!token) {
        isAdmin = false;
        return;
      }
      else{
        const res = await api.get('/users/me');
        isAdmin = res.data.data.tipo_usuario?.toLowerCase().trim() === 'admin';
      }
    } catch (e: any) {
      if (e.response?.status === 401) {
        isAdmin = false;
      } else {
        console.error('Erro ao buscar usuário logado:', e);
        isAdmin = false;
      }
    }
  }

  async function buscarProdutos() {
    erro = '';
    loading = true;
    try {
      const res = await api.get('/produto');
      produtos = res.data.data;
    } catch (e: any) {
      erro = e.response?.data?.message || 'Erro ao buscar produtos';
      produtos = [];
    } finally {
      loading = false;
    }
  }
  
  if (/*hasToken && */!user) {
      getCurrentUser().then(userData => {
        user = userData;
      }).catch(() => {
        user = null;
        //hasToken = false;
      });
    } /*else if (!hasToken) {
      user = null;
    }*/
  async function buscarProdutosPorNome(nome: string) {
    erro = '';
    loading = true;
    try {
      const res = await api.get(`/produto/nome_produto/${encodeURIComponent(nome)}`);
      produto = res.data.data;
    } catch (e: any) {
      erro = e.response?.data?.message || 'Erro ao buscar produtos por nome';
      produto = [];
    } finally {
      loading = false;
    }
  }

  async function removerProduto(id: number) {
    erro = '';
    try {
      await api.delete(`/produto/${id}`);
      if (search.length >= 3) {
        buscarProdutosPorNome(search);
      } else {
        buscarProdutos();
      }
    } catch (e: any) {
      erro = e.response?.data?.message || 'Erro ao remover produto';
    }
  }
    
  let produto: Produto[] = []; // lista de usuários
  
  let error = '';
  let deletingId: number | null = null; // id em deleção
  let confirmOpen = false; // modal aberto?
  let confirmTargetId: number | null = null; // id alvo do modal

  // Abre modal de confirmação
  function openConfirm(id: number) {
    confirmTargetId = id;
    confirmOpen = true;
  }
  // Fecha modal
  function closeConfirm() {
    confirmOpen = false;
    confirmTargetId = null;
  }

  // Confirma remoção
  function handleConfirm() {
    if (confirmTargetId !== null) {
      handleDelete(confirmTargetId);
    }
    closeConfirm();
  }

  // Cancela remoção
  function handleCancel() {
    closeConfirm();
  }

  async function handleDelete(id: number) {
    deletingId = id;
    error = '';
    try {
      await api.delete(`/produto/${id}`);
      produtos = produtos.filter(produto => produto.id !== id);
    } catch (e: any) {
      console.error('Erro ao deletar produto:', e);
      error = e.response?.data?.message || 'Erro ao remover produto.';
    } finally {
      deletingId = null;
    }
  }
  
  onMount(async () => {
  try {
    await buscarUsuarioLogado();
  } finally {
    await buscarProdutos();
  }
});

  $: {
    if (search.length >= 3) {
      buscarProdutosPorNome(search);
    } else if (search.length === 0) {
      buscarProdutos();
    } else {
      produtos = [];
      erro = 'Digite pelo menos 3 caracteres para buscar.';
    }
  }

</script>


{#if erro}
<p class="text-red-500 mb-4">{erro}</p>
{:else if loading}
<p class="text-gray-600 mb-4">Carregando...</p>
{:else if produtos.length === 0}
<p class="text-gray-600">Nenhum produto encontrado.</p>
{:else}
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each produtos as produto}
    <div class="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between border border-gray-200">
      {#if produto.imagem}
        <div class="mb-3 flex justify-center">
          <img 
            src={baseURL + produto.imagem} 
            alt={produto.nome}
            class="w-full h-80 object-cover rounded-lg border"
            on:error={(e) => {
                const target = e.target;
                if (target instanceof HTMLImageElement) {
                  console.error('Erro ao carregar imagem:', produto.imagem);
                  target.style.display = 'none';
                }
              }}    
          />
        </div>
      {:else}
        <div class="mb-3 flex justify-center items-center h-48 bg-gray-100 rounded-lg border">
          <span class="text-gray-400">📷 Sem imagem</span>
        </div>
      {/if}

      <div class="space-y-2 flex-grow">
        <p><span class="font-semibold">Nome:</span> {produto.nome}</p>
        <p><span class="font-semibold">Descrição:</span> {produto.descricao}</p>
        <p><span class="font-semibold">Preço:</span> R$ {produto.preco}</p>
        <p><span class="font-semibold">Quantidade:</span> {produto.estoque}</p>
      </div>

      <div class="mt-4 flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
        <button
          class="bg-green-800 hover:bg-green-800 text-white px-3 py-2 rounded text-sm w-full flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          on:click={() => adicionarProdutoAoCarrinho(produto)}
          disabled={produtoAdicionado === produto.id}
        >
          {#if produtoAdicionado === produto.id}
            <span> Adicionado!</span>
          {:else}
            <span>🛒 Adicionar ao Carrinho</span>
          {/if}
        </button>
      </div>
      
      {#if user?.role === 'admin'}
        <div class="mt-4 flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
          <!-- Botão editar -->
          <button
          class="p-2 rounded border border-green-800 hover:border-green-800 transition bg-transparent"
          title="Editar"
          on:click={() => goto(`/cadastroproduto/edit/${produto.id}`)}
        >
          <UserEditOutline class="w-5 h-5 text-green-800" />
        </button>
           <!-- Botão remover -->
           <button
           title="Remover"
           class="p-2 rounded border border-green-800 hover:border-green-800 transition bg-transparent"
           on:click={() => openConfirm(produto.id)}
           disabled={deletingId === produto.id || loading}
         >
           <TrashBinOutline class="w-5 h-5 text-green-800" />
         </button>
        </div>
      {/if}
    </div>
    {/each}
  </div>
{/if}

<!-- Modal de confirmação -->
<ConfirmModal
  open={confirmOpen}
  message="Tem certeza que deseja remover este produto?"
  confirmText="Remover"
  cancelText="Cancelar"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>