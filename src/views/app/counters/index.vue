<template>
  <div>
    <div class="px-6 max-w-sm">
      <Button
        icon="heroicons-outline:plus"
        text="Add Counter"
        btnClass="btn-dark w-full block  "
        @click="openAddModal"
      />
    </div>

    <AddCounter />
    <div class="flex flex-col max-w-sm items-center">
      <Totals />
      <draggable
        v-model="storeCounters.counters"
        :animation="200"
        :itemKey="id"
        class="p-3 flex flex-col list-none overflow-auto overflow-y-scroll"
      >
        <template #item="{ element }">
          <Counter
            :counter="element"
            @counter-to-delete="deleteSelectedCounter"
          />
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStoreCounters } from '@/store/storeCounters';
import Button from '@/components/Button';
import AddCounter from '@/components/Counters/AddCounter';
import Totals from '@/components/Counters/Totals';
import Counter from '@/components/Counters/Counter.vue';
import draggable from 'vuedraggable';

const storeCounters = useStoreCounters();
const drag = ref(false);

const openAddModal = () => {
  storeCounters.openCounterModal();
};
</script>
