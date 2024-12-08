<template>
  <div class="w-full">
    <!-- 참여자 목록 -->
    <div
      class="mt-8 h-48 p-6 rounded-lg"
      :style="{ backgroundImage: 'url(/background.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }"
      @dragover.prevent
      @drop="onDrop($event)"
    >
      <ul class="mt-4">
        <li
          v-for="(participant, index) in draggedParticipant"
          :key="index"
          class="py-2 px-4 border-b border-gray-200"
        >
          {{ participant.name }}
        </li>
      </ul>
    </div>

    <!-- 원형 버튼들 -->
    <div class="w-full flex space-x-2 justify-center" @dragover.prevent>
      <div 
        v-for="participant in availableParticipants"
        :key="participant.id"
        class="flex flex-col items-center justify-center gap-1 cursor-pointer"
      >
        <div
        class="w-14 h-14 flex items-center justify-center text-white rounded-full"
        :style="{ backgroundImage: `url(${participant.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
        draggable="true"
        @dragstart="onDragStart($event, participant, 'available')"
        @drop="onDrop($event, 'available')"
      />
      <p class="text-sm">{{ participant.name }}</p> 
    </div>
  </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface Participant {
  id: number;
  name: string;
  imageUrl: string
}
const availableParticipants = ref<Participant[]>([
    { id: 1, name: '이혜인', imageUrl: '/face.png' },
    { id: 2, name: '이예지', imageUrl: '/face.png' },
    { id: 3, name: '장은빈', imageUrl: '/face.png' },
    { id: 4, name: '최진경', imageUrl: '/face.png' },
  ]);

  // 참여자 목록 (드래그 앤 드롭을 통해 참여자로 이동한 항목)
  const participants = ref<Participant[]>([]);

  // 드래그한 참가자와 드래그 시작한 목록을 추적
  const draggedParticipant = ref<Participant | null>(null);
  const draggedFrom = ref<'available' | 'participants' | null>(null);

  const onDragStart = (event: DragEvent, participant: Participant, listType: 'available' | 'participants') => {
    draggedParticipant.value = participant;
    draggedFrom.value = listType;
  };

  const onDrop = (event: DragEvent, targetList: 'available' | 'participants') => {
    // 드래그된 참가자가 있을 경우
    if (draggedParticipant.value) {
      if (targetList === 'participants') {
        // 원형 버튼 목록에서 참여자 목록으로 이동
        if (draggedFrom.value === 'available') {
          participants.value.push(draggedParticipant.value);
          // 이동한 항목을 원형 버튼 목록에서 제거
          availableParticipants.value = availableParticipants.value.filter(p => p.id !== draggedParticipant.value!.id);
        }
      } else {
        // 참여자 목록에서 원형 버튼 목록으로 이동
        if (draggedFrom.value === 'participants') {
          availableParticipants.value.push(draggedParticipant.value);
          // 이동한 항목을 참여자 목록에서 제거
          participants.value = participants.value.filter(p => p.id !== draggedParticipant.value!.id);
        }
      }
      // 드래그된 상태 초기화
      draggedParticipant.value = null;
      draggedFrom.value = null;
    }
  };
</script>

<style scoped>
/* 커스터마이징된 Tailwind CSS */
</style>
