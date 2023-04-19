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
  </div>
</template>

<script setup>
import Button from '@/components/Button';
import AddCounter from '@/components/Counters/AddCounter';
import { useStoreCounters } from '@/store/storeCounters';

const storeCounters = useStoreCounters();

const openAddModal = () => {
  storeCounters.openCounterModal();
};
</script>
