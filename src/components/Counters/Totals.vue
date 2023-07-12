<template>
  <div class="flex mt-4 p-5 rounded-lg bg-white min-w-[318px]">
    <p class="total-text">Total: {{ getTotals }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStoreCounters } from '@/store/storeCounters';
const storeCounters = useStoreCounters();

const getTotals = computed(() => {
  const grandTotals = storeCounters.counters.reduce((prev, counter) => (prev += Number(counter.subtotal)), 0);
  return grandTotals.toFixed(2);
});
</script>
