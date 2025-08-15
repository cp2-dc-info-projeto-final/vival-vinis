<script lang="ts">
  import { Heading, P, ImagePlaceholder } from "flowbite-svelte";
  import Menu from '../../components/Menu.svelte';
</script>

<Menu />

<div class="text-center p-8 pt-32">
  <Heading tag="h1" class="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">Sobre</Heading>
  <P class="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4 text-justify">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Mauris consequat, sapien et dictum cursus, urna erat laoreet enim, nec gravida urna erat at sapien. Etiam nec dolor vitae odio hendrerit venenatis. Proin nec turpis nec sem tempus dictum. Vivamus tincidunt, nisi nec facilisis cursus, enim erat dictum neque, at dignissim enim urna at velit. Integer non turpis id mi tristique cursus. Nullam in sem vitae massa dictum dictum.
  </P>
  <P class="text-base leading-relaxed text-gray-600 dark:text-gray-400 text-justify">
    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.
  </P>
  <ImagePlaceholder class="my-8 mx-auto" />
  <P class="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4 text-justify">
    Curabitur blandit tempus porttitor. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper. Etiam porta sem malesuada magna mollis euismod.
  </P>
  <P class="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4 text-justify">
    Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
  </P>
  <P class="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4 text-justify">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
  </P>
  <P class="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4 text-justify">
    Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
  </P>
  <P class="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4 text-justify">
    Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.
  </P>
  <P class="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4 text-justify">
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci. Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.
  </P>
  <P class="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4 text-justify">
    Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui.
  </P>
</div>




<footer class="bg-white rounded-lg shadow-sm dark:bg-gray-900 m-4">
  <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div class="sm:flex sm:items-center sm:justify-between">
          <a href="" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
              <img src="/images/1000285043 (1).png" class="h-8" alt="Flowbite Logo" />
              <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">vival</span>
          </a>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                  <a href="/about" class="hover:underline me-4 md:me-6">Sobre</a>
              </li>
              <li>
                  <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
              </li>
              <li>
                  <a href="#" class="hover:underline">Contact</a>
              </li>
          </ul>
      </div>
      <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <a href="" class="hover:underline">Vival</a>. All Rights Reserved.</span>
  </div>
</footer>
