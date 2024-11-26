<template>
  <div class="min-w-screen h-screen bg-blue-200 flex flex-col items-center p-6">
    <p class="text-2xl font-bold text-black mb-4">👽우당탕탕 파자마 교환👽</p>
    <div class="w-full">
      <ParticipantList @draw="drawManitto" />
      <div v-if="results.length" class="mt-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-2">결과</h2>
        <ul>
          <li
            v-for="(pair, index) in results"
            :key="index"
            class="text-gray-700"
          >
            {{ pair.giver }} → {{ pair.receiver }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ParticipantList from './components/ParticipantList.vue';

interface Pair {
  giver: string;
  receiver: string;
}

export default defineComponent({
  components: { ParticipantList },
  setup() {
    const results = ref<Pair[]>([]);

    const drawManitto = (participants: string[]) => {
      const shuffled = [...participants].sort(() => Math.random() - 0.5);
      const pairs: Pair[] = participants.map((participant, i) => ({
        giver: participant,
        receiver: shuffled[i],
      }));
      results.value = pairs;
    };

    return {
      results,
      drawManitto,
    };
  },
});
</script>
