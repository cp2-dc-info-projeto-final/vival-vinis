<script lang="ts">
  import { carrinho, removerDoCarrinho, atualizarQuantidade, limparCarrinho, totalPrice } from '$lib/stores/carrinho';
  import { goto } from '$app/navigation';
  import api from '$lib/api';
  import { getCurrentUser } from '$lib/auth';
  import { type User } from "$lib/auth"

  // variável reativa para o total
  $: total = $totalPrice;

  let endereco: string = "";

  // user precisa ser resolvido com await
  let user: User | null = null;

  // carregar usuário assim que o componente montar
  $: (async () => {
      user = await getCurrentUser();
  })();

  // Tipagem para Compra
  type Compra = {
      id_usuario: number;
      endereco: string;
      itens: object;
      status: string;
      data_pedido: Date;
      atualizado_em: Date;
  };

  let formData: Compra | null = null;

  async function finalizarCompra() {
      if (!user) {
          alert("Você precisa estar logado para finalizar a compra.");
          return;
      }

      formData = {
          id_usuario: Number(user.id),
          endereco: endereco,
          itens: $carrinho, // precisa pegar o valor do store
          status: 'novo',
          data_pedido: new Date(),
          atualizado_em: new Date(),
      };

      await api.post('/compra', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      });

      limparCarrinho();
      goto('/');
  }
</script>
  
  <svelte:head>
    <title>Carrinho de Compras</title>
  </svelte:head>
  
  <div class="max-w-4xl mx-auto px-4 sm:px-6 py-6">
    <h1 class="text-2xl font-bold text-center mb-6">Conferir Compra 🛒 </h1>
  
    {#if $carrinho.length === 0}
      <div class="text-center py-12">
        <p class="text-red-600 text-lg mb-4">Seu carrinho está vazio</p>
      </div>
    {:else}
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6">
          {#each $carrinho as item (item.id)}
            <div class="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
              <div class="flex-1">
                <h3 class="font-semibold text-lg">{item.nome_produto}</h3>
                <p class="text-gray-900 text-sm">{item.descricao}</p>
                <p class="text-green-900 font-semibold mt-1">
                  R$ {String(item.preco).replace('.', ',')}
                </p>
              </div>
              
            </div>
          {/each}
        </div>
        
        <div class="bg-gray-50 px-6 py-4">
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-semibold">Total:</span>
            <span class="text-xl font-bold text-green-900">R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
          
          <div>
            <label for="nome">Endereço:</label>
            <input id="nome" bind:value={endereco} placeholder="Digite o endereço" required class="mt-1" />
          </div>
          <div class="flex gap-3">
            <button
              on:click={finalizarCompra}
              class="flex-1 bg-green-700 hover:bg-green-900 text-white py-3 px-4 rounded-lg transition-colors"
            >
              Finalizar Compra
            </button>
          </div>
          
          <button 
            on:click={() => goto('/')} 
            class="w-full mt-3 text-green-600 hover:text-green-900 py-2 transition-colors"
          >
            ← Continuar Comprando
          </button>
        </div>
      </div>
    {/if}
  </div>