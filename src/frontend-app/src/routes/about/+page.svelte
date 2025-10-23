<script lang="ts">
  import { Heading, P, ImagePlaceholder } from "flowbite-svelte";
  import Menu from '../../components/Menu.svelte';
</script>

<Menu />

<div class="text-center p-8 pt-48">
  <Heading
  tag="h1" id="sobre" class="pt-20 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
  Sobre
</Heading>

  <p class="text-center p-8"> A Vival Vinis nasceu da amizade entre quatro amigos apaixonados por música e pela magia do som analógico. Entre trocas de discos, descobertas musicais e boas conversas, surgiu a ideia de transformar esse amor em um projeto real.<br><br>


    Criamos esta loja online para compartilhar com outras pessoas o que sempre fez parte da nossa história: o prazer de ouvir um vinil do início ao fim, com atenção, carinho e alma.<br><br>
    
    Aqui você encontra uma curadoria especial de vinis — dos clássicos atemporais às raridades escondidas — todos escolhidos com cuidado e respeito pela música.<br><br>
    
    Mais do que uma loja, a Vinil & Cia é um ponto de encontro para quem acredita que música boa merece ser sentida, não só ouvida.<br><br>
    
    🎧 Seja bem-vindo à nossa vitrola. Aumente o som e fique à vontade.</p>

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
      <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
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



