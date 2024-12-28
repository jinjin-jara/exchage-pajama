<template>
  <div class="h-screen w-screen flex flex-col items-center justify-center" style="background: linear-gradient(to bottom, #d2f5ff 561px, #95d2e1 0);">
    <div 
      class="md:w-full lg:h-full flex items-center justify-center overflow-hidden"
    >
      <img 
        src="/finger_sisters.jpg" 
        alt="Background" 
        class="md:w-full md:h-auto lg:w-auto lg:h-full object-cover"
      />
    </div>
    <button @click="() => $router.push('/game')" 
      class="absolute bottom-[19.2rem] bg-[#ff0096] duration-200 hover:bg-[#ff6fc4] font-gwangsu text-white text-xl px-6 pt-2 pb-1 rounded-lg shadow">Start!</button>
  </div>
</template>

<script setup>
</script>
