<script lang="ts">
  import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Card, Badge } from 'flowbite-svelte';
  import ConfirmModal from './ConfirmModal.svelte';
  import { UserEditOutline, TrashBinOutline } from 'flowbite-svelte-icons';
  import { goto } from '$app/navigation';
  import api from '$lib/api'; // API backend
  import { onMount } from 'svelte'; // ciclo de vida
  import { adicionarAoCarrinho } from '$lib/cart';
  

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

  // Função para carregar os produtos
  onMount(async () => {
      try {
          const res = await api.get('/Produto');
          produtos = res.data.data;
          console.log(produtos);
      } catch (e: any) {
          console.error('Erro ao carregar produtos:', e);
          error = e.response?.data?.message || 'Erro ao carregar produtos';
      } finally {
          loading = false;
      }
  });

  


  // Função para manipular a seleção de imagem
  function handleImageSelect(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
          imagemFile = target.files[0];

          // Validações
          const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
          if (!allowedTypes.includes(imagemFile.type)) {
              mensagemErro = 'Tipo de arquivo não permitido. Use JPEG, PNG, GIF ou WebP.';
              resetImage();
              return;
          }

          if (imagemFile.size > 5 * 1024 * 1024) {
              mensagemErro = 'Arquivo muito grande. Tamanho máximo: 5MB';
              resetImage();
              return;
          }

          // Criar preview
          previewUrl = URL.createObjectURL(imagemFile);
          mensagemErro = '';
      }
  }

  // Função para resetar a seleção de imagem
  function resetImage() {
      imagemFile = null;
      previewUrl = '';
      const fileInput = document.getElementById('imagem') as HTMLInputElement;
      if (fileInput) fileInput.value = ''; // Limpa o input de imagem
  }

  // Função para abrir o modal de confirmação de remoção
  function openConfirm(id: number) {
      confirmTargetId = id;
      confirmOpen = true;
  }

  // Função para fechar o modal
  function closeConfirm() {
      confirmOpen = false;
      confirmTargetId = null;
  }

  // Função para confirmar a remoção
  function handleConfirm() {
      if (confirmTargetId !== null) {
          handleDelete(confirmTargetId);
      }
      closeConfirm();
  }

  // Função para cancelar a remoção
  function handleCancel() {
      closeConfirm();
  }
  
  function handleAddToCart(produto: Produto) {
  adicionarAoCarrinho({
    id: produto.id,
    nome: produto.nome,
    preco: produto.preco
  });
  alert(`${produto.nome} foi adicionado ao carrinho!`);
}

  // Função para deletar produto
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
</script>

{#if loading}
  <div class="my-8 text-center text-gray-500">Carregando produtos...</div>
{:else if error}
  <div class="my-8 text-center text-red-500">{error}</div>
{:else}
  <!-- Cards para telas pequenas -->
  <div class="block xl:hidden">
      <div class="flex flex-col items-center gap-4 my-8 max-w-3xl mx-auto md:grid md:grid-cols-2">
          {#each produtos as produto}
              <Card class="max-w-sm w-full p-0 overflow-hidden shadow-lg border border-gray-200">
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
                        <ShoppingCartOutline class="w-5 h-5 text-green-500" />
                        </button>
                        <!-- Botão editar -->
                          <button
                              class="p-2 rounded border border-primary-200 hover:border-primary-400 transition bg-transparent"
                              title="Editar"
                              on:click={() => goto(`/cadastroproduto/edit/${produto.id}`)}
                          >
                              <UserEditOutline class="w-5 h-5 text-primary-500" />
                          </button>
                          <!-- Botão remover -->
                          <button
                              title="Remover"
                              class="p-2 rounded border border-red-100 hover:border-red-300 transition bg-transparent"
                              on:click={() => openConfirm(produto.id)}
                              disabled={deletingId === produto.id || loading}
                          >
                              <TrashBinOutline class="w-5 h-5 text-red-400" />
                          </button>
                      </div>

                  </div>
                  <img src={`http://localhost:3000${produto.imagem}`} alt={produto.nome} class="w-full h-48 object-cover" />
                  <div class="px-4 pb-4 pt-2 flex flex-col gap-2 text-left">
                      <div class="flex items-center gap-2 text-left"></div>
                  </div>
              </Card>
          {/each}
      </div>
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
