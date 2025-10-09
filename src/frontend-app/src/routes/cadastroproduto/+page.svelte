<script lang="ts">
    import { Card, Button, Input, Label, Alert } from "flowbite-svelte";
    import { goto } from "$app/navigation";
    import  api  from "$lib/api";
    
    let nome = '';
    let descricao = '';
    let preco = '';
    let estoque = '';
    let loading = false;
    let error = '';
  
    async function handleProduto() {
      if (!nome || !descricao || !preco || !estoque ) {
        error = 'Por favor, preencha todos os campos';
        return;
      }
  
      loading = true;
      error = '';
  
      try {
        const result = await authProduto({ nome, descricao, preco, estoque });
        
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