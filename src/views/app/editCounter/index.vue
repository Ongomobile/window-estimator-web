<template>
  <div class="max-w-sm">
    <AddEditCounter
      v-model:windowType="counterData.type"
      v-model:windowLocation="counterData.location"
      v-model:windowPrice="counterData.price"
      v-model:imageUrl="counterData.url"
      :validated="(storeCounters.isValid = true)"
    >
      <template #buttons>
        <button
          @click="handleEditCounter"
          class="bg-slate-900 dark:bg-slate-800 dark:border-b dark:border-slate-700 text-white uppercase p-2 rounded-md"
        >
          Edit Counter
        </button>
        <button
          @click="$router.back()"
          class="ml-4"
        >
          Cancel
        </button>
      </template>
    </AddEditCounter>
    <pre>{{ counterData.value }}</pre>
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

const counterData = ref({});
counterData.value = storeCounters.getCounterContent(route.params.id);
// const windowType = ref('');
// const windowLocation = ref('');
// const windowPrice = ref('');
// const imageUrl = ref('');

const handleEditCounter = () => {
  storeCounters.updateCounter(route.params.id, counterData.value);
  router.push('/app/home');
};

// watch([windowType, () => windowPrice.value], ([type, price]) => {
//   if (type !== '' && price !== '') {
//     storeCounters.isValid = true;
//     storeCounters.isDisabled = false;
//   }

//   if ((type === '' && price === '') || price === '' || type === '') {
//     storeCounters.isValid = false;
//     storeCounters.isDisabled = true;
//   }
// });
</script>
