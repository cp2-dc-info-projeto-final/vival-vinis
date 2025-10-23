<script lang="ts">
  import { onMount } from 'svelte';
  import { getCarrinho, removerDoCarrinho, limparCarrinho, type ProdutoCarrinho } from '$lib/cart';
  import { TrashBinOutline } from 'flowbite-svelte-icons';
  import { goto } from '$app/navigation';

  let carrinho: ProdutoCarrinho[] = [];

  onMount(() => {
    carrinho = getCarrinho();
  });

  function removerItem(id: number) {
    removerDoCarrinho(id);
    carrinho = getCarrinho();
  }

  function limpar() {
    limparCarrinho();
    carrinho = [];
  }

  function total() {
    return carrinho.reduce((soma, p) => soma + p.preco * p.quantidade, 0).toFixed(2);
  }
</script>

<h1 class="text-2xl  items-center font-semibold mb-4">🛍️ Carrinho de Compras</h1>

{#if carrinho.length === 0}
  <p class="text-gray-500 mb-4">Seu carrinho está vazio.</p>
  <button on:click={() => goto('/')} class="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-gray rounded-lg font-semibold shadow transition">
    Voltar às compras
  </button>
{:else}
  <table class="w-full border-collapse border border-gray-300 mb-4">
    <thead class="bg-gray-100">
      <tr>
        <th class="border border-gray-300 px-3 py-2 text-left">Produto</th>
        <th class="border border-gray-300 px-3 py-2">Preço</th>
        <th class="border border-gray-300 px-3 py-2">Qtd</th>
        <th class="border border-gray-300 px-3 py-2">Subtotal</th>
        <th class="border border-gray-300 px-3 py-2">Ação</th>
      </tr>
    </thead>
    <tbody>
      {#each carrinho as item}
        <tr>
          <td class="border border-gray-300 px-3 py-2">{item.nome}</td>
          <td class="border border-gray-300 px-3 py-2">R$ {item.preco.toFixed(2)}</td>
          <td class="border border-gray-300 px-3 py-2 text-center">{item.quantidade}</td>
          <td class="border border-gray-300 px-3 py-2">R$ {(item.preco * item.quantidade).toFixed(2)}</td>
          <td class="border border-gray-300 px-3 py-2 text-center">
            <button
              class="p-1 rounded border border-red-300 hover:bg-red-100"
              on:click={() => removerItem(item.id)}
            >
              <TrashBinOutline class="w-4 h-4 text-red-500" />
            </button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="flex justify-between items-center">
    <div class="font-semibold text-lg">Total: R$ {total()}</div>
    <div class="flex gap-2">
      <button class="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-gray rounded-lg font-semibold shadow transition" on:click={limpar}>
        Limpar Carrinho
      </button>
      <button class="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-gray rounded-lg font-semibold shadow transition">
        Finalizar Compra
      </button>
    </div>
  </div>
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
                    <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" class="hover:underline">Contact</a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="" class="hover:underline">Vival</a>. All Rights Reserved.</span>
    </div>
  </footer>