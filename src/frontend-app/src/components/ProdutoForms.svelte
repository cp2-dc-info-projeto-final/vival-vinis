<script lang="ts">
    // Formulário de usuário
    import { Card, Button, Label, Input, Heading, Select } from 'flowbite-svelte'; // UI
    import { onMount } from 'svelte'; // ciclo de vida
    import api from '$lib/api'; // API backend
    import { goto } from '$app/navigation'; // navegação
    import { ArrowLeftOutline, FloppyDiskAltOutline } from 'flowbite-svelte-icons'; // ícones
  
    export let id: number | null = null; // id do usuário
  
    type Produto = {
      id: number;
      nome: string;
      descricao: string;
      preco: number;
      estoque: number;
    };
  
    let Produto: Produto = { id: 0, nome: '', descricao: '', preco: 0, estoque: 0 }; // dados do form
    
    let loading = false;
    let error = '';

    // Carrega usuário se for edição
    onMount(async () => {
      if (id !== null) {
        loading = true;
        try {
          
        const res = await api.get(`/produto/${id}`);
        Produto = res.data; // atribui os dados recebidos
          
          console.log('produto');
        } catch (e) {
          error = 'Erro ao carregar usuário.';
        } finally {
          loading = false;
        }
      } 
    });
  
    // Submissão do formulário
    async function handleSubmit() {
      
      try {
        const produtoData = { ...Produto };
        
        if (id === null) {
          await api.post('/produto', produtoData);
        } else {
          await api.put(`/produto/${id}`, produtoData);
        }
        goto('/produto');
      } catch (e: any) {
        error = e.response?.data?.message || 'Erro ao salvar usuário.';
      } finally {
        loading = false;
      }
    }
  
    function handleCancel() {
      console.log('Cancelar');
      goto('/produto');
    }
  </script>
  
  <!-- Card do formulário -->
  <Card class="max-w-md mx-auto mt-10 p-0 overflow-hidden shadow-lg border border-gray-200 rounded-lg">
    <!-- Formulário principal -->
    <form class="flex flex-col gap-6 p-6" on:submit|preventDefault={handleSubmit}>
      <!-- Título -->
      <Heading tag="h3" class="mb-2 text-center">
        {id === null ? 'Cadastrar Produto' : 'Editar Produto'}
      </Heading>
      <!-- Mensagem de erro -->
      {#if error}
        <div class="text-red-500 text-center">{error}</div>
      {/if}
      <!-- Campo login -->
      <div>
        <Label for="nome">nome</Label>
        <Input id="nome" bind:value={Produto.nome} placeholder="Digite o nome" required class="mt-1" />
      </div>
      <!-- Campo email -->
      <div>
        <Label for="descricao">Descrição</Label>
        <Input id="descricao" type="descricao" bind:value={Produto.descricao} placeholder="Digite a Descrição" required class="mt-1" />
      </div>
      <!-- Botões de ação -->
      <div class="flex gap-4 justify-end mt-4">
        <!-- Botão cancelar/voltar -->
        <Button color="light" type="button" onclick={handleCancel} disabled={loading}>
          <ArrowLeftOutline class="inline w-5 h-5 mr-2 align-text-bottom" />
          {id === null ? 'Voltar' : 'Cancelar'}
        </Button>
        <!-- Botão salvar -->
        <Button type="button" color="light" onclick={handleSubmit} disabled={loading}>
          <FloppyDiskAltOutline class="inline w-5 h-5 mr-2 align-text-bottom" />
          {id === null ? 'Cadastrar' : 'Salvar'}
        </Button>
      </div>
    </form>
  </Card>