// $lib/stores/cart.ts
import { writable } from 'svelte/store';

export type ProdutoCarrinho = {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
};

// Inicializa carrinho a partir do sessionStorage
function createCarrinho() {
  const stored = sessionStorage.getItem('carrinho');
  const initial: ProdutoCarrinho[] = stored ? JSON.parse(stored) : [];
  const { subscribe, set, update } = writable(initial);

  // Atualiza sessionStorage sempre que o store mudar
  subscribe((value) => {
    sessionStorage.setItem('carrinho', JSON.stringify(value));
  });

  return {
    subscribe,
    adicionar: (produto: Omit<ProdutoCarrinho, 'quantidade'>) =>
      update((items) => {
        const index = items.findIndex((p) => p.id === produto.id);
        if (index > -1) {
          items[index].quantidade += 1;
        } else {
          items.push({ ...produto, quantidade: 1 });
        }
        return items;
      }),
    remover: (id: number) =>
      update((items) => items.filter((p) => p.id !== id)),
    limpar: () => set([]),
    getCarrinho: () => {
      const carrinhoString = sessionStorage.getItem('carrinho');
      return carrinhoString ? JSON.parse(carrinhoString) : [];
    }
  };
}

export const carrinho = createCarrinho();

// Funções para a página do carrinho
export const adicionarAoCarrinho = carrinho.adicionar;
export const removerDoCarrinho = carrinho.remover;
export const limparCarrinho = carrinho.limpar;
export const getCarrinho = carrinho.getCarrinho;
