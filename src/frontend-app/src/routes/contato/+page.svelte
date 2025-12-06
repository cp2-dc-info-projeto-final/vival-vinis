
<script lang="ts">
    import { Heading, P, Label, Input, Textarea, Button } from "flowbite-svelte";

    // Variáveis para armazenar os dados do formulário (reatividade Svelte)
    let name: string = '';
    let email: string = '';
    let subject: string = '';
    let message: string = '';

    function handleSubmit() {
        // 💡 Aqui você colocaria a lógica de envio do formulário,
        // por exemplo, chamando uma API ou um endpoint de formulário.
        console.log("Dados do Formulário Enviados:");
        console.log({ name, email, subject, message });

        alert("Mensagem enviada com sucesso! Em breve entraremos em contato.");

        // Limpa o formulário após o envio (opcional)
        name = '';
        email = '';
        subject = '';
        message = '';
    }
</script>

<div class="p-8 pt-20 max-w-4xl mx-auto">
    <br><br>
    <Heading tag="h1" class="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-4">
        Fale Conosco
    </Heading>
    
    <P class="text-lg text-center mb-10 text-gray-700 dark:text-gray-300">
        Tem dúvidas sobre um disco, precisa de ajuda com seu pedido ou quer nos mandar uma sugestão? Entre em contato!
    </P>

    <div class="grid md:grid-cols-2 gap-12">
        
        <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 class="text-2xl font-bold dark:text-white mb-6 text-center">Envie Sua Mensagem</h2>
            
            <form on:submit|preventDefault={handleSubmit} class="space-y-6">
                
                <div>
                    <Label for="name" class="mb-2 block">Seu Nome</Label>
                    <Input id="name" type="text" placeholder="Seu nome completo" bind:value={name} required />
                </div>

                <div>
                    <Label for="email" class="mb-2 block">Seu Email</Label>
                    <Input id="email" type="email" placeholder="nome@exemplo.com" bind:value={email} required />
                </div>

                <div>
                    <Label for="subject" class="mb-2 block">Assunto</Label>
                    <Input id="subject" type="text" placeholder="Dúvida sobre um produto, etc." bind:value={subject} required />
                </div>

                <div>
                    <Label for="message" class="mb-2 block">Sua Mensagem</Label>
                    <Textarea id="message"  placeholder="Digite sua mensagem aqui..." bind:value={message} required />
                </div>

                <Button type="submit" color="green" class="w-full" size="lg">Enviar Mensagem</Button>
            </form>
        </div>

        <div class="p-6">
            <h2 class="text-2xl font-bold dark:text-white mb-6 text-center md:text-left">Informações Diretas</h2>
            
            <div class="mb-6">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">E-mail</h3>
                <P class="text-gray-600 dark:text-gray-400">
                    Para dúvidas gerais e suporte:
                    <a href="mailto:contato@vivalvinis.com" class="text-blue-600 hover:underline dark:text-blue-400 block font-medium">contato@vivalvinis.com</a>
                </P>
            </div>

            <div class="mb-6">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">WhatsApp / Telefone</h3>
                <P class="text-gray-600 dark:text-gray-400">
                    Atendimento de Segunda a Sexta, das 9h às 18h:
                    <a href="tel:+5521987654321" class="text-blue-600 hover:underline dark:text-blue-400 block font-medium">(21) 98765-4321</a>
                </P>
            </div>

            <div class="mb-6">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">Siga Nossas Redes</h3>
                <P class="text-gray-600 dark:text-gray-400">
                    Acompanhe novidades, pré-vendas e histórias sobre vinil!
                </P>
                
            </div>
        </div>
    </div>
</div>
<footer class="bg-white rounded-lg shadow-sm dark:bg-gray-900 m-4">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="/images/1000285043 (1).png" class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">vival</span>
            </a>
            <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <a href="/sobre" class="hover:underline me-4 md:me-6">Sobre</a>
                </li>
                <li>
                    <a href="/politica" class="hover:underline me-4 md:me-6">Política de Privacidade</a>
                </li>
                <li>
                    <a href="/contato" class="hover:underline">Contato</a>
                </li>
            </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="/" class="hover:underline">Vival</a>. All Rights Reserved.</span>
    </div>
  </footer>