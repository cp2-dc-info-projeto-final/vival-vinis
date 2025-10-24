import { writable } from 'svelte/store';

export const cart = writable([]);

// Adiciona um produto ao carrinho
export function addToCart(product) {
  cart.update(items => {
    const index = items.findIndex(item => item.id === product.id);
    if (index !== -1) {
      // Produto já existe, aumenta a quantidade
      items[index].quantity += 1;
    } else {
      items.push({ ...product, quantity: 1 });
    }
    return [...items];
  });
}

// Remove item do carrinho
export function removeFromCart(productId) {
  cart.update(items => items.filter(item => item.id !== productId));
}

// Limpa o carrinho
export function clearCart() {
  cart.set([]);
}
