<script lang="ts">
    // Tabela de usuários
    import { goto } from '$app/navigation';
  import api from '$lib/api'; // API backend
  import { onMount } from 'svelte'; // ciclo de vida
  import { adicionarAoCarrinho } from '$lib/stores/carrinho'
  import {getToken, getCurrentUser, type User} from '$lib/auth';
  import { TrashBinOutline,  UserEditOutline } from 'flowbite-svelte-icons'; // ícones
  import ConfirmModal from './ConfirmModal.svelte'; // modal de confirmação]
  
    type Compras = {
      id: number;
      usuario: string;
      endereco: string;
      total: string;
      status: string;
      data_pedido: number;
      atualizado_em: number;

    };
  
    let compras: Compras[] = []; // lista de usuários
    let loading = true;
    let error = '';
    let deletingId: number | null = null; // id em deleção
    let confirmOpen = false; // modal aberto?
    let confirmTargetId: number | null = null; // id alvo do modal
  
    let user: User | null = null;

    if (/*hasToken && */!user) {
      getCurrentUser().then(userData => {
        user = userData;
      }).catch(() => {
        user = null;
        //hasToken = false;
      });
    }

    function openConfirm(id: number) {
    confirmTargetId = id;
    confirmOpen = true;
  }
  // Fecha modal
  function closeConfirm() {
    confirmOpen = false;
    confirmTargetId = null;
  }
  async function handleDelete(id: number) {
    deletingId = id;
    error = '';
    try {
      await api.delete(`/produto/${id}`);
      compras = compras.filter(compras => compras.id !== id);
    } catch (e: any) {
      console.error('Erro ao deletar produto:', e);
      error = e.response?.data?.message || 'Erro ao remover produto.';
    } finally {
      deletingId = null;
    }
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
  </script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each compras as compras}
    <div class="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between border border-gray-200">

      <div class="space-y-2 flex-grow">
        <p><span class="font-semibold">Usuário:</span> {compras.usuario}</p>
        <p><span class="font-semibold">Endereço:</span> {compras.endereco}</p>
        <p><span class="font-semibold">Total:</span> R$ {compras.total}</p>
        <p><span class="font-semibold">Status:</span> {compras.status}</p>
        <p><span class="font-semibold">Data do pedido:</span> {compras.data_pedido}</p>
        <p><span class="font-semibold">Atualizado em:</span> {compras.atualizado_em}</p>
      </div>
      
      {#if user?.role === 'admin'}
        <div class="mt-4 flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
          <!-- Botão editar -->
          <button
          class="p-2 rounded border border-green-800 hover:border-green-800 transition bg-transparent"
          title="Editar"
          on:click={() => goto(`/pedidos/${compras.id}`)}
        >
          <UserEditOutline class="w-5 h-5 text-green-800" />
        </button>
           <!-- Botão remover -->
           <button
           title="Remover"
           class="p-2 rounded border border-green-800 hover:border-green-800 transition bg-transparent"
           on:click={() => openConfirm(compras.id)}
           disabled={deletingId === compras.id || loading}
         >
           <TrashBinOutline class="w-5 h-5 text-green-800" />
         </button>
        </div>
      {/if}
    </div>
    {/each}
  </div>


<!-- Modal de confirmação -->
<ConfirmModal
  open={confirmOpen}
  message="Tem certeza que deseja remover este usuário?"
  confirmText="Remover"
  cancelText="Cancelar"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>