<script lang="ts">
    // Tabela de usuários
    import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Card, Badge } from 'flowbite-svelte'; // UI
    import ConfirmModal from './ConfirmModal.svelte'; // modal de confirmação
    import { UserEditOutline, TrashBinOutline } from 'flowbite-svelte-icons'; // ícones
    import { goto } from '$app/navigation'; // navegação
    import api from '$lib/api'; // API backend
    import { onMount } from 'svelte'; // ciclo de vida
  
    type Produto = {
      id: number;
      nome: string;
      descricao: string;
      preco: number;
      estoque: number;
    };
  
    let Produto: Produto[] = []; // lista de usuários
    let loading = true;
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
        Produto = Produto.filter(Produto => Produto.id !== id);
      } catch (e: any) {
        console.error('Erro ao deletar produto:', e);
        error = e.response?.data?.message || 'Erro ao remover produto.';
      } finally {
        deletingId = null;
      }
    }
  
    onMount(async () => {
      try {
        const res = await api.get('/Produto');
        Produto = res.data.data;
        console.log(Produto);
      } catch (e: any) {
        console.error('Erro ao carregar produto:', e);
        error = e.response?.data?.message || 'Erro ao carregar produto';
      } finally {
        loading = false;
      }
    });
  </script>
  
  {#if loading}
    <div class="my-8 text-center text-gray-500">Carregando produto...</div>
  {:else if error}
    <div class="my-8 text-center text-red-500">{error}</div>
  {:else}
    <!-- Tabela para telas médias/grandes -->
    <div class="hidden xl:block">
      <!-- Tabela de usuários -->
      <Table class="w-full max-w-5xl mx-auto my-8 shadow-lg border border-gray-200 rounded-lg">
        <TableHead>
          <TableHeadCell class="w-16">ID</TableHeadCell>
          <TableHeadCell class="w-32">Nome</TableHeadCell>
          <TableHeadCell class="min-w-0">Descriçãol</TableHeadCell>
          <TableHeadCell class="w-20">Preço</TableHeadCell>
          <TableHeadCell class="w-20">Estoque</TableHeadCell>
          <TableHeadCell class="w-24"></TableHeadCell> <!-- coluna para editar/remover -->
        </TableHead>
        <TableBody>
          {#each Produto as produto}
            <TableBodyRow>
              <TableBodyCell>{produto.id}</TableBodyCell>
              <TableBodyCell>{produto.nome}</TableBodyCell>
              <TableBodyCell>{produto.descricao}</TableBodyCell>
              <TableBodyCell>{produto.preco}</TableBodyCell>
              <TableBodyCell>{produto.estoque}</TableBodyCell>
              <TableBodyCell class="truncate max-w-0">{produto.descricao}</TableBodyCell>
              <TableBodyCell>
              </TableBodyCell>
              <TableBodyCell>
                <!-- Botão editar -->
                <button
                  class="p-2 rounded border border-primary-200 hover:border-primary-400 transition bg-transparent"
                  title="Editar"
                  on:click={() => goto(`/users/edit/${produto.id}`)}
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
              </TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </Table>
    </div>
    <!-- Cards para telas pequenas -->
    <div class="block xl:hidden">
      <div class="flex flex-col items-center gap-4 my-8 max-w-3xl mx-auto md:grid md:grid-cols-2">
        {#each Produto as produto}
         
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