<script>
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Heading } from "flowbite-svelte";
</script>

<div class="relative px-8">
  <Navbar class="fixed start-0 top-0 z-20 w-full bg-yellow-900 px-2 py-2.5 sm:px-4">
    <NavBrand href="/">
      <img src= "/images/1000285043 (1).png" class="me-3 h-6 sm:h-15" alt="" />
      <Heading class="self-center text-xl font-semibold whitespace-nowrap text-primary-500 text-white">Vival</Heading>
    </NavBrand>
    <NavHamburger />
    <NavUl>
      <NavLi href="/" class="text-lg font-bold px-4 py-2 text-primary-500 text-white hover:text-yellow-300 hover:bg-gray-700 focus:text-white focus:bg-gray-700 transition-colors rounded-lg">Pagina inicial</NavLi>
      <NavLi href="/about" class="text-lg font-bold px-4 py-2 text-primary-500 text-white hover:text-yellow-300 hover:bg-gray-700 focus:text-white focus:bg-gray-700 transition-colors rounded-lg">Sobre</NavLi>
      <NavLi href="/users" class="text-lg font-bold px-4 py-2 text-primary-500 text-white hover:text-yellow-300 hover:bg-gray-700 focus:text-white focus:bg-gray-700 transition-colors rounded-lg">Usuários</NavLi>
    </NavUl>
  </Navbar>
</div>

