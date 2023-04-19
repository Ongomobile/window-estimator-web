<template>
  <div>
    <div class="px-6 max-w-sm">
      <Button
        icon="heroicons-outline:plus"
        text="Add Counter"
        btnClass="btn-dark w-full block  "
        @click=""
      />
    </div>
    <!-- <AddCounters /> -->
  </div>
</template>

<script setup>
import Button from '@/components/Button';
import AddCounters from '@/components/Counters/AddCounters.vue';
</script>
