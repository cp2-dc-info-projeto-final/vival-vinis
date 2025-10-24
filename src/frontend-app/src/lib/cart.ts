// src/lib/cart.ts

export type ProdutoCarrinho = {
    id: number;
    nome: string;
    preco: number;
    quantidade: number;
  };
  
  // Chave de armazenamento
  const STORAGE_KEY = 'carrinho';
  
  // Obter o carrinho
  export function getCarrinho(): ProdutoCarrinho[] {
    if (typeof sessionStorage === 'undefined') return [];
    const data = sessionStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
  
  // Salvar o carrinho
  function salvarCarrinho(carrinho: ProdutoCarrinho[]) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(carrinho));
  }
  
  // Adicionar produto
  export function adicionarAoCarrinho(produto: Omit<ProdutoCarrinho, 'quantidade'>) {
    const carrinho = getCarrinho();
    const existente = carrinho.find((p) => p.id === produto.id);
  
    if (existente) {
      existente.quantidade += 1;
    } else {
      carrinho.push({ ...produto, quantidade: 1 });
    }
  
    salvarCarrinho(carrinho);
  }
  
  // Remover produto
  export function removerDoCarrinho(id: number) {
    const carrinho = getCarrinho().filter((p) => p.id !== id);
    salvarCarrinho(carrinho);
  }
  
  // Limpar tudo
  export function limparCarrinho() {
    sessionStorage.removeItem(STORAGE_KEY);
  }
  