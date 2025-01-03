<template>
  <div class="h-screen w-screen flex flex-col items-center justify-center p-2" @click="playAudio()">
    <div class="max-w-[370px] w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <!-- Participants and Gift Box Display -->
      <div class="w-full flex flex-row justify-center">
        <img src="/title.png" :alt="participant" class="h-[6rem]" />
      </div>

      <!-- Canvas for Movement -->
      <canvas ref="ladderCanvas" class="w-full" :width="ladderWidth" :height="svgHeight"></canvas>

      <!-- Gift Box Display -->
      <div class="flex flex-row">
        <div v-for="(participant, index) in participants" :key="index">
          <img :src="`/${participant}_present.png`" :alt="participant" class="h-[6rem]" />
        </div>
      </div>
      <div class="mt-2">
        <button @click="startGame" :disabled="buttonDisabled"
          class="bg-[#ff0096] rounded-lg text-white text-2xl px-10 py-1 font-gwangsu">{{ buttonText }}</button>
      </div>
    </div>
    <div id="jjal" class="absolute z-20"></div>
    <div id="jjalTwo" class="absolute z-30" />
    <audio id="backgroundMusic" src="/air_dancer.mp3" loop></audio>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const participants = ref(["yeji", "eunbin", "hyein", "jinkyung"]);
const svgHeight = window.innerHeight - 17 * 16; // 디바이스 전체 높이에서 17rem 제외
const lineWidth = 370 / participants.value.length; // 캔버스 너비를 참여자 수로 나눔
const ladderWidth = 370;
const ladderCanvas = ref(null);
const playerPositions = ref([]);
const buttonDisabled = ref(false);
const buttonText = ref("결과보기");

const match = (names) => {
  const result = {};
  const participants = [...names];
  const remaining = [...names];

  participants.forEach((participant) => {
    const matched = findMatch(participant, remaining);
    result[participant] = matched;
    const index = remaining.indexOf(matched);
    if (index > -1) remaining.splice(index, 1);
  });

  return result;
};

const findMatch = (target, remaining) => {
  let match;
  do {
    const randomIndex = Math.floor(Math.random() * remaining.length);
    match = remaining[randomIndex];
  } while (match === target);
  return match;
};

const drawInitialPlayers = () => {
  const canvas = ladderCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  playerPositions.value = participants.value.map((_, index) => ({
    x: index * lineWidth + lineWidth / 2,
    y: 0,
  }));

  playerPositions.value.forEach((pos, index) => {
    const img = new Image();
    img.src = `/${participants.value[index]}.png`;
    img.onload = () => {
      ctx.drawImage(img, pos.x - 50, pos.y + 5, 100, 100); // 이미지 크기 증가
    };
  });
};

const startGame = () => {
  buttonDisabled.value = true; // Disable the button after click
  const resultMapping = match(participants.value);
  animatePlayers(resultMapping);
};

const animatePlayers = (resultMapping) => {
  const canvas = ladderCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const interval = setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let finished = true;
    playerPositions.value.forEach((pos, index) => {
      const targetGift = resultMapping[participants.value[index]];
      const targetIndex = participants.value.indexOf(targetGift);
      const targetX = targetIndex * lineWidth + lineWidth / 2;

      // Update positions
      if (pos.y < svgHeight - 50) {
        pos.y += 5;
        if (Math.abs(pos.x - targetX) > 5) {
          pos.x += pos.x < targetX ? 5 : -5;
        }
        finished = false;
      }

      // Draw participant images
      const img = new Image();
      if (pos.y >= svgHeight - 50 && Math.abs(pos.x - targetX) <= 5) {
        img.src = `/${participants.value[index]}_after.png`;
      } else {
        img.src = `/${participants.value[index]}.png`;
      }
      img.onload = () => {
        ctx.drawImage(img, pos.x - 50, pos.y - 50, 100, 100); // 이미지 크기 증가
      };
    });

    if (finished) {
      clearInterval(interval);
      buttonText.value = "잠옷 교환 타임~!"; // Change button text
    }
  }, 30);
};


const moveJjal = () => {
  const jjal = document.getElementById('jjal');
  const jjalTwo = document.getElementById('jjalTwo');
  if (!jjal || !jjalTwo) return;

  let currentRotation = 0; // Initialize rotation angle

  function getRandomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function getRandomPosition(element) {
    const maxX = Math.min(100, window.innerWidth - element.offsetWidth);
    const maxY = window.innerHeight - element.offsetHeight;
    const x = Math.max(-250, Math.floor(getRandomInRange(-5, 5) * maxX));
    const y = Math.max(0, Math.floor(Math.random() * maxY)) - 250;
    return { x, y };
  }

  function animateJjal() {
    const { x: x1, y: y1 } = getRandomPosition(jjal);
    currentRotation += Math.random() * 360; // Increment rotation randomly
    jjal.style.transform = `translate(${x1}px, ${y1}px) rotate(${currentRotation}deg)`;

    // For jjalTwo
    const { x: x2, y: y2 } = getRandomPosition(jjalTwo);
    jjalTwo.style.transform = `translate(${x2}px, ${y2}px)`;
  }

  setInterval(animateJjal, 1200); // Move and rotate every second
};

function playAudio() {
  document.getElementById('backgroundMusic').play()
}

onMounted(() => {
  drawInitialPlayers();
  moveJjal();
});
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

canvas {
  max-width: 370px;
}

#jjal {
  position: absolute;
  width: 300px;
  height: 87px;
  background-image: url('/jjal.png');
  background-size: cover;
  transition: transform 1.2s linear;
}

#jjalTwo {
  position: absolute;
  width: 150px;
  height: 147px;
  background-image: url('/jjal_two.png');
  background-size: cover;
  transition: transform 1.2s linear;
}
</style>
