<script lang="ts">
    import { Card, Button, Input, Label, Alert } from "flowbite-svelte";
    import { goto } from "$app/navigation";
    import { login as authLogin } from "$lib/auth";
    
    let login = '';
    let password = '';
    let loading = false;
    let error = '';
  
    async function handleLogin() {
      if (!login || !password) {
        error = 'Por favor, preencha todos os campos';
        return;
      }
  
      loading = true;
      error = '';
  
      try {
        const result = await authLogin({ login, password });
        
        if (result.success) {
          goto('/');
        } else {
          error = result.message || 'Credenciais inválidas';
        }
      } catch (err) {
        error = 'Erro interno do servidor';
        console.error('Erro no login:', err);
      } finally {
        loading = false;
      }
    }
  
  
  </script>