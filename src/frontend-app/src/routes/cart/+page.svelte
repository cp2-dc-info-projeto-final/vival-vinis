<script>
    import { cart, removeFromCart, clearCart } from '$lib/stores/cart';
    import { onDestroy } from 'svelte';
  
    let items = [];
    let total = 0;
  
    const unsubscribe = cart.subscribe(value => {
      items = value;
      total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    });
  
    onDestroy(unsubscribe);
  </script>
  
  <h1 class="text-2xl font-bold mb-4">🛒 Carrinho de Compras</h1>
  
  {#if items.length === 0}
    <p>Seu carrinho está vazio.</p>
  {:else}
    <ul class="space-y-4">
      {#each items as item}
        <li class="border p-4 rounded shadow">
          <div class="flex justify-between">
            <div>
              <h2 class="font-semibold">{item.name}</h2>
              <p>Preço: R$ {item.price.toFixed(2)}</p>
              <p>Quantidade: {item.quantity}</p>
            </div>
            <button
              class="bg-red-500 text-white px-4 py-2 rounded"
              on:click={() => removeFromCart(item.id)}
            >
              Remover
            </button>
          </div>
        </li>
      {/each}
    </ul>
  
    <div class="mt-6">
      <h2 class="text-xl font-bold">Total: R$ {total.toFixed(2)}</h2>
      <button
        class="mt-4 bg-gray-700 text-white px-4 py-2 rounded"
        on:click={clearCart}
      >
        Limpar Carrinho
      </button>
    </div>
  {/if}
  