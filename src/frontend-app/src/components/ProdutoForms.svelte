<script lang="ts">
  // Formulário de produto
  import { Card, Button, Label, Input, Heading } from 'flowbite-svelte'; // UI
  import { onMount } from 'svelte'; // ciclo de vida
  import api from '$lib/api'; // API backend
  import { goto } from '$app/navigation'; // navegação
  import { ArrowLeftOutline, FloppyDiskAltOutline } from 'flowbite-svelte-icons'; // ícones
  
  export let id: number | null = null; // id do produto
  
  type Produto = {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    estoque: number;
    imagem?: File | null; // Adiciona o campo imagem
  };
  
  let Produto: Produto = { id: 0, nome: '', descricao: '', preco: 0, estoque: 0 }; // dados do form
  let imagemFile: File | null = null; // Variável para armazenar a imagem
  let previewUrl: string = ''; // URL para o preview da imagem
  let loading = false;
  let error = '';

  // Carrega o produto se for edição
  onMount(async () => {
    if (id !== null) {
      loading = true;
      try {
        const res = await api.get(`/produto/${id}`);
        Produto = res.data; // atribui os dados recebidos
        console.log(Produto);
      } catch (e) {
        error = 'Erro ao carregar produto.';
      } finally {
        loading = false;
      }
    }
  });

  // Função para lidar com a seleção da imagem
  function handleImageSelect(event: Event & { target: HTMLInputElement }) {
    if (event.target.files && event.target.files[0]) {
      imagemFile = event.target.files[0];
      previewUrl = URL.createObjectURL(imagemFile);
    }
  }

  // Função para resetar a imagem
  function resetImage() {
    imagemFile = null;
    previewUrl = '';
    const fileInput = document.getElementById('imagem') as HTMLInputElement;
    if (fileInput) fileInput.value = ''; // Limpa o input de imagem
  }

  // Submissão do formulário
  async function handleSubmit() {
    try {
      const produtoData = { ...Produto };
      if (imagemFile) {
        produtoData.imagem = imagemFile; // Adiciona a imagem ao objeto de dados
      }

      const formData = new FormData();
      formData.append('nome', produtoData.nome);
      formData.append('descricao', produtoData.descricao);
      formData.append('preco', produtoData.preco.toString());
      formData.append('estoque', produtoData.estoque.toString());

      // Caso tenha imagem, adiciona ao FormData
      if (imagemFile) {
        formData.append('imagem', imagemFile);
      }

      // Envia os dados para a API
      if (id === null) {
        await api.post('/produto', formData);
      } else {
        await api.put(`/produto/${id}`, formData);
      }
      goto('/produto');
    } catch (e: any) {
      error = e.response?.data?.message || 'Erro ao salvar produto.';
    } finally {
      loading = false;
    }
  }

  function handleCancel() {
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
    <!-- Campo nome -->
    <div>
      <Label for="nome">Nome:</Label>
      <Input id="nome" bind:value={Produto.nome} placeholder="Digite o nome" required class="mt-1" />
    </div>
    <!-- Campo descrição -->
    <div>
      <Label for="descricao">Descrição:</Label>
      <Input id="descricao" bind:value={Produto.descricao} placeholder="Digite a Descrição" required class="mt-1" />
    </div>
    <!-- Campo preço -->
    <div>
      <Label for="preco">Preço:</Label>
      <Input id="preco" bind:value={Produto.preco} placeholder="Digite o preço" required class="mt-1" />
    </div>
    <!-- Campo estoque -->
    <div>
      <Label for="estoque">Estoque:</Label>
      <Input id="estoque" bind:value={Produto.estoque} placeholder="Digite o Estoque" required class="mt-1" />
    </div>

    <!-- Campo para seleção da imagem -->
    <div>
      <Label for="imagem">Imagem:</Label>
      <Input id="imagem" type="file" accept="image/*" on:change={handleImageSelect} class="mt-1" />
    </div>

    <!-- Exibir preview da imagem -->
    {#if previewUrl}
      <div class="mt-4">
        <p class="text-sm font-semibold text-gray-700">Pré-visualização:</p>
        <img src={previewUrl} alt="Pré-visualização da imagem" class="mt-2 w-full max-w-xs rounded-lg shadow-md"/>
      </div>
    {/if}

    <!-- Botões de ação -->
    <div class="flex gap-4 justify-end mt-4">
      <!-- Botão cancelar/voltar -->
      <Button color="light" type="button" onclick={handleCancel} disabled={loading}>
        <ArrowLeftOutline class="inline w-5 h-5 mr-2 align-text-bottom" />
        {id === null ? 'Voltar' : 'Cancelar'}
      </Button>
      <!-- Botão salvar -->
      <Button type="submit" color="light" disabled={loading}>
        <FloppyDiskAltOutline class="inline w-5 h-5 mr-2 align-text-bottom" />
        {id === null ? 'Cadastrar' : 'Salvar'}
      </Button>
    </div>
  </form>
</Card>
