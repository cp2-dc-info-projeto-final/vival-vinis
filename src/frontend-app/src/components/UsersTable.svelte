<script lang="ts">
  import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Card, Badge } from 'flowbite-svelte';
  import ConfirmModal from './ConfirmModal.svelte';
  import { UserEditOutline, TrashBinOutline } from 'flowbite-svelte-icons';
  import { goto } from '$app/navigation';
  import api from '$lib/api';
  import { onMount } from 'svelte';
  
  type User = {
    id: number;
    login: string;
    email: string;
    role: string;
  };

  let users: User[] = [];
  let loading = true;
  let error = '';
  let search = '';
  let deletingId: number | null = null;
  let confirmOpen = false;
  let confirmTargetId: number | null = null;

  
  async function buscarUsuarios() {
    error = '';
    loading = true;
    try {
      const res = await api.get('/users');
      users = res.data.data;
    } catch (e: any) {
      error = e.response?.data?.message || 'Erro ao buscar usuários';
      users = [];
    } finally {
      loading = false;
    }
  }

  async function buscarUsuariosPorNome(nome: string) {
    error = '';
    loading = true;
    try {
      const res = await api.get(`/users/nome/${encodeURIComponent(nome)}`);
      users = res.data.data;
    } catch (e: any) {
      error = e.response?.data?.message || 'Erro ao buscar produtos por nome';
      users = [];
    } finally {
      loading = false;
    }
  }

  function openConfirm(id: number) {
    confirmTargetId = id;
    confirmOpen = true;
  }
  function closeConfirm() {
    confirmOpen = false;
    confirmTargetId = null;
  }
  function handleConfirm() {
    if (confirmTargetId !== null) {
      handleDelete(confirmTargetId);
    }
    closeConfirm();
  }
  function handleCancel() {
    closeConfirm();
  }
  async function handleDelete(id: number) {
    deletingId = id;
    error = '';
    try {
      await api.delete(`/users/${id}`);
      users = users.filter(user => user.id !== id);
    } catch (e: any) {
      console.error('Erro ao deletar usuário:', e);
      error = e.response?.data?.message || 'Erro ao remover usuário.';
    } finally {
      deletingId = null;
    }
  }

  $: {
    if (search.length >= 1) {
      buscarUsuariosPorNome(search);
    } else if (search.length === 0) {
      buscarUsuarios();
    } 
  }

  onMount(async () => {
    await buscarUsuarios();
    try {
      const res = await api.get('/users');
      users = res.data.data;
      console.log(users);
    } catch (e: any) {
      console.error('Erro ao carregar usuários:', e);
      error = e.response?.data?.message || 'Erro ao carregar usuários';
    } finally {
      loading = false;
    }
  });
</script>

  <h1 class="text-2xl font-bold text-center mb-6">𝐋𝐢𝐬𝐭𝐚 𝐝𝐞 Usuários</h1>

  <input
    type="text"
    placeholder="Pesquisar planta por nome..."
    bind:value={search}
    class="w-full mb-6 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
  />

{#if loading}
  <div class="my-8 text-center text-gray-500">Carregando usuários...</div>
{:else if error}
  <div class="my-8 text-center text-green-800">{error}</div>
{:else}
  <!-- Desktop Table for large screens -->
  <div class="hidden xl:block">
    <Table class="w-full max-w-5xl mx-auto my-8 shadow-lg border border-gray-200 rounded-lg overflow-x-auto">
      <TableHead>
        <TableHeadCell class="w-16">ID</TableHeadCell>
        <TableHeadCell class="w-32">Login</TableHeadCell>
        <TableHeadCell class="min-w-0">Email</TableHeadCell>
        <TableHeadCell class="w-20">Role</TableHeadCell>
        <TableHeadCell class="w-24"></TableHeadCell>
      </TableHead>
      <TableBody>
        {#each users as user}
          <TableBodyRow>
            <TableBodyCell>{user.id}</TableBodyCell>
            <TableBodyCell>{user.login}</TableBodyCell>
            <TableBodyCell class="truncate max-w-0">{user.email}</TableBodyCell>
            <TableBodyCell>
              <Badge color={user.role === 'admin' ? 'green' : 'blue'} class="text-xs">
                {user.role}
              </Badge>
            </TableBodyCell>
            <TableBodyCell>
              <button
                class="p-2 rounded border border-green-800 hover:border-green-800 transition bg-transparent"
                title="Editar"
                on:click={() => goto(`/users/edit/${user.id}`)}
              >
                <UserEditOutline class="w-5 h-5 text-green-800" />
              </button>
              <button
                title="Remover"
                class="p-2 rounded border border-green-800 hover:border-green-800 transition bg-transparent"
                on:click={() => openConfirm(user.id)}
                disabled={deletingId === user.id || loading}
              >
                <TrashBinOutline class="w-5 h-5 text-green-800" />
              </button>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>
  <!-- Card layout for small screens -->
  <div class="block xl:hidden">
    <div class="flex flex-col items-center gap-4 my-8 max-w-3xl mx-auto md:grid md:grid-cols-2">
      {#each users as user}
        <Card class="w-full md:w-auto shadow-md border border-gray-200">
          <div class="flex justify-between items-center mb-2">
            <span class="font-medium text-lg">#{user.id}</span>
            <Badge color={user.role === 'admin' ? 'green' : 'blue'} class="text-xs">
              {user.role}
            </Badge>
          </div>
          <div>
            <div class="font-semibold">{user.login}</div>
            <div class="text-sm text-gray-500 break-all">{user.email}</div>
          </div>
          <div class="flex justify-end gap-2 mt-4">
            <button
              class="p-2 rounded border border-green-800 hover:border-green-800 transition bg-transparent"
              title="Editar"
              on:click={() => goto(`/users/edit/${user.id}`)}
            >
              <UserEditOutline class="w-5 h-5 text-green-800" />
            </button>
            <button
              title="Remover"
              class="p-2 rounded border border-green-800 hover:border-green-800 transition bg-transparent"
              on:click={() => openConfirm(user.id)}
              disabled={deletingId === user.id || loading}
            >
              <TrashBinOutline class="w-5 h-5 text-green-800" />
            </button>
          </div>
        </Card>
      {/each}
    </div>
  </div>
{/if}

<ConfirmModal
  open={confirmOpen}
  message="Tem certeza que deseja remover este usuário?"
  confirmText="Remover"
  cancelText="Cancelar"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>

<style>
/* Extra styles for responsive card layout in case needed */
@media (max-width: 767px) {
  .card-user {
    width: 100%;
  }
}
</style>