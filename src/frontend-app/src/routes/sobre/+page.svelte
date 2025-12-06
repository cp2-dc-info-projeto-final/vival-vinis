<script lang="ts">
    import { Heading, P } from "flowbite-svelte"; // ImagePlaceholder e Menu removidos por não serem usados
    
    // As importações comentadas não são necessárias para o componente final.
    // import Menu from '../../components/Menu.svelte'; 

    // A variável 'creators' não é mais necessária, então foi removida.
</script>

<div class="text-center p-8 pt-48">
    
    <Heading
        tag="h1" 
        id="sobre" 
        class="pt-20 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6"
    >
        Sobre
    </Heading>

    <div class="max-w-4xl mx-auto">
        <h3 class="text-xl font-extrabold dark:text-white mb-4">🎶 Vival Vinis: Onde a Amizade e o Vinil se Encontram no Ritmo Perfeito</h3>
        
        <P class="mb-3"> A Vival Vinis é mais do que uma loja online; é a concretização de um sonho nascido da paixão compartilhada de quatro amigos inseparáveis. Tudo começou com o ritual sagrado das nossas reuniões: trocas de vinis, descobertas que revolucionavam nossas playlists, e conversas profundas embaladas pelo som inconfundível do áudio analógico. </P>
        
        <P class="mb-3"> Essa amizade, temperada com o estalar quente da agulha e o cheiro inebriante do acetato, gerou uma faísca: a vontade de transformar esse amor em um projeto vivo e pulsante. Queríamos estender o nosso círculo e convidar mais pessoas a experimentar a magia autêntica de ouvir música. </P>
        
        <h4 class="text-lg font-bold dark:text-white mt-6 mb-2">A Filosofia do Som Analógico</h4>
        <P class="mb-3"> No mundo acelerado de hoje, propomos uma pausa, um retorno à essência. Criamos esta curadoria com a missão de compartilhar a história que nos move: o prazer tátil e atencioso de tirar um vinil da capa, colocá-lo no prato e se dedicar, de corpo e alma, a ouvir cada nota do início ao fim. É um ato de carinho e respeito pela obra e pelo artista. </P>
        
        <h4 class="text-lg font-bold dark:text-white mt-6 mb-2">A Curadoria Vival Vinis: Tesouros para a Sua Vitrola</h4>
        <P class="mb-3"> Em nosso catálogo, você não encontrará apenas discos, mas sim uma seleção rigorosa e apaixonada. Cada título foi escolhido a dedo, com o critério de quem realmente entende e valoriza a profundidade da música: </P>
        
        <ul class="list-disc list-inside text-gray-700 dark:text-gray-400 mb-6 mx-auto w-fit text-left">
            <li>Clássicos Atemporais: Os álbuns que definiram gerações e continuam essenciais em qualquer coleção.</li>
            <li>Raridades Escondidas: Aqueles tesouros difíceis de encontrar, que fazem os olhos de colecionadores brilharem.</li>
            <li>Novidades e Edições Especiais: Lançamentos atuais prensados no formato que amamos, provando que a magia do vinil está mais viva do que nunca.</li>
        </ul>
        
        <P class="mb-3"> Aqui, o nome é Vival Vinis, mas o espírito é de Companhia e Descoberta. Somos o seu ponto de encontro para quem entende que a música boa não deve ser apenas ouvida, mas profundamente sentida e vivenciada. </P>
        
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