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
  let deletingId: number | null = null;
  let confirmOpen = false;
  let confirmTargetId: number | null = null;

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

  onMount(async () => {
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