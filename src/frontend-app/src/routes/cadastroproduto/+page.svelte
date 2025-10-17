<script lang="ts">
    import { Card, Button, Input, Label, Alert } from "flowbite-svelte";
    import { goto } from "$app/navigation";
    import  {produto as authProduto}  from "$lib/api";
    import { Heading } from 'flowbite-svelte';

  import UsersTable from '../../components/UsersTable.svelte';
  import { UserAddOutline  } from 'flowbite-svelte-icons';
  //import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import {logout, getCurrentUser, getToken, type User} from '$lib/auth';
  import { ArrowRightToBracketOutline } from "flowbite-svelte-icons";
	import ProdutoTable from "../../components/ProdutoTable.svelte";
    
  let nome = '';
  let descricao = '';
  let preco = '';
  let estoque = '';
  let imagem: File | null = null;
  let previewUrl = '';
  let loading = false;
  let error = '';

  function handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      imagem = target.files[0];
      previewUrl = URL.createObjectURL(imagem);
    }
  }

    async function handleProduto() {
      if (!nome || !descricao || !preco || !estoque ) {
        error = 'Por favor, preencha todos os campos';
        return;
      }
  
if (!imagem) {
      error = 'Por favor, selecione uma imagem';
      return;
    }

      loading = true;
      error = '';


  
      try {
        const result = await authProduto({ nome, descricao, preco: Number(preco), estoque: Number(estoque) }); //LEMBRAR DE PASSAR IMAGEM!!!!!!
        
        if (result.success) {
          goto('/');
        } else {
          error = result.message || 'Credenciais inválidas';
        }
      } catch (err) {
        error = 'Erro interno do servidor';
        console.error('Erro no nome:', err);
      } finally {
        loading = false;
      }
    }
  
  
  </script>
  
  <div class="text-center p-8 pt-32">
    <div class="flex items-center justify-between max-w-3xl mx-auto mb-6">
      <Heading tag="h2" class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">Produtos</Heading>
      
  
      <button class="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-gray rounded-lg font-semibold shadow transition" on:click={() => goto('/cadastroproduto/new')}>
        Cadastrar
      </button>
    </div>
    <ProdutoTable />
  </div>
  
  
  
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
                    <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
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
  