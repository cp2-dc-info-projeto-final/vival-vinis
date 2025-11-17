<script lang="ts">
    import { carrinho, removerDoCarrinho, atualizarQuantidade, limparCarrinho, totalPrice } from '$lib/stores/carrinho';
    import { goto } from '$app/navigation';
  
    // variável reativa para o total (totalPrice é um derived store)
    $: total = $totalPrice;
  
    function finalizarCompra() {
      alert('Compra finalizada com sucesso! Total: R$ ' + total.toFixed(2));
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