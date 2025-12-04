<script lang="ts">
  import { Heading, P, ImagePlaceholder } from "flowbite-svelte";
  import Menu from '../../components/Menu.svelte';
</script>

<Menu />

<div class="text-center p-8 pt-48">
  <Heading
  tag="h1" id="sobre" class="pt-20 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
  Sobre
</Heading>

<h3 class="text-xl font-extrabold dark:text-white">🎶Vival Vinis: Onde a Amizade e o Vinil se Encontram no Ritmo Perfeito</h3>
   <p> A Vival Vinis é mais do que uma loja online; é a concretização de um sonho nascido da paixão compartilhada de quatro amigos inseparáveis. Tudo começou com o ritual sagrado das nossas reuniões: trocas de vinis, descobertas que revolucionavam nossas playlists, e conversas profundas embaladas pelo som inconfundível do áudio analógico.
    
    Essa amizade, temperada com o estalar quente da agulha e o cheiro inebriante do acetato, gerou uma faísca: a vontade de transformar esse amor em um projeto vivo e pulsante. Queríamos estender o nosso círculo e convidar mais pessoas a experimentar a magia autêntica de ouvir música.
    
    A Filosofia do Som Analógico
    No mundo acelerado de hoje, propomos uma pausa, um retorno à essência. Criamos esta curadoria com a missão de compartilhar a história que nos move: o prazer tátil e atencioso de tirar um vinil da capa, colocá-lo no prato e se dedicar, de corpo e alma, a ouvir cada nota do início ao fim. É um ato de carinho e respeito pela obra e pelo artista.
    
    A Curadoria Vival Vinis: Tesouros para a Sua Vitrola
    Em nosso catálogo, você não encontrará apenas discos, mas sim uma seleção rigorosa e apaixonada. Cada título foi escolhido a dedo, com o critério de quem realmente entende e valoriza a profundidade da música:
    
    Clássicos Atemporais: Os álbuns que definiram gerações e continuam essenciais em qualquer coleção.
    
    Raridades Escondidas: Aqueles tesouros difíceis de encontrar, que fazem os olhos de colecionadores brilharem.
    
    Novidades e Edições Especiais: Lançamentos atuais prensados no formato que amamos, provando que a magia do vinil está mais viva do que nunca.
    
    Aqui, o nome é Vival Vinis, mas o espírito é de Companhia e Descoberta. Somos o seu ponto de encontro para quem entende que a música boa não deve ser apenas ouvida, mas profundamente sentida e vivenciada.
    
    🎧 Seja bem-vindo à nossa vitrola. Aumente o som, sinta a vibração e fique completamente à vontade. A história continua no próximo lado B!</p>

  <h2 class="text-4xl font-extrabold dark:text-white">Conheça nossos criadores</h2>

<div class="flex flex-wrap gap-4 p-8">
  <!-- Card 1 -->
  <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
      <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
    </a>
    <div class="p-5">
      <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Vitória Pessanha</h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div>
  </div>

  <!-- Card 2 (repita para mais) -->
  <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
      <img class="rounded-t-lg" src="/images/1000285043 (1).png" alt="" />
    </a>
    <div class="p-5">
      <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Victória Pimentel</h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </div>
  </div>
    <!-- conteúdo do card -->
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
      </a>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Victor Barbosa</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
      </div>
    </div>
    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
      </a>
      <div class="p-5">
        <a href="#">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Luiza Moutinho</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
      </div>
    </div>
  <!-- Adicione mais cards conforme necessário -->
</div>

</div>



