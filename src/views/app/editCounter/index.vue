<template>
  <div class="max-w-sm">
    <AddEditCounter
      v-model:windowType="editedData.type"
      v-model:windowLocation="editedData.location"
      v-model:windowPrice="editedData.price"
      v-model:imageUrl="editedData.url"
      :validated="(storeCounters.isValid = true)"
    >
      <template #buttons>
        <button
          @click="handleEditCounter"
          class="bg-slate-900 dark:bg-slate-800 dark:border-b dark:border-slate-700 text-white uppercase p-2 rounded-md"
        >
          Edit Counter
        </button>
        <button @click="$router.back()" class="ml-4">Cancel</button>
      </template>
    </AddEditCounter>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AddEditCounter from '@/components/Counters/AddEditCounter';
import { useStoreCounters } from '@/store/storeCounters';

const storeCounters = useStoreCounters();
const route = useRoute();
const router = useRouter();

let editedData = ref({});
editedData.value = storeCounters.getCounterContent(route.params.id);

const handleEditCounter = () => {
  storeCounters.updateCounter(route.params.id, editedData.value);
  router.push('/app/home');
};
</script>
