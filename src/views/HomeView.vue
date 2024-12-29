<template>
  <div class="h-screen w-screen flex flex-col items-center justify-center" style="background: linear-gradient(to bottom, #d2f5ff 561px, #95d2e1 0);" @click="playAudio()">
    <!-- Marquee Text -->
    <div class="fixed top-0 w-full py-1 bg-black overflow-hidden text-center">
      <div class="text-lg font-bold animate-marquee" style="color: transparent; background: linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet); background-clip: text;">
        화면을 클릭해 브금을 틀어주세요♥
      </div>
    </div>

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
    <audio id="backgroundMusic" src="/air_dancer.mp3" loop></audio>
  </div>
</template>

<script setup>
function playAudio() {
  document.getElementById('backgroundMusic').play()
}
</script>

<style>
@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee {
  display: inline-block;
  white-space: nowrap;
  animation: marquee 7s linear infinite;
}

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

</style>
