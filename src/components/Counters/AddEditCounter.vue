<template>
  <div class="add-counter-form--wrapper">
    <form
      class="add-counter-form"
      @submit.prevent="addCounter"
    >
      <label
        for="type"
        class="add-counter-label"
        title="add"
        >Window Type</label
      >
      <input
        :value="windowType"
        @input="$emit('update:windowType', $event.target.value)"
        type="text"
        id="type"
        name="type"
        class="add-counter-input"
        placeholder="Add Window Type"
      />
      <label
        for="location"
        class="add-counter-label"
        >Window Location</label
      >
      <input
        :value="windowLocation"
        @input="$emit('update:windowLocation', $event.target.value)"
        type="text"
        id="location"
        name="location"
        class="add-counter-input"
        placeholder="Default In & Out"
      />

      <label
        for="price"
        class="add-counter-label"
        >Window Price</label
      >
      <input
        :value="windowPrice"
        @input="$emit('update:windowPrice', $event.target.value)"
        type="number"
        id="price"
        name="price"
        class="add-counter-input"
        placeholder="Add Window Price"
      />
      <SelectImage
        :images="windowData"
        @on-select-image="selectImage"
      />
      <div class="text-center font-semibold">
        <slot name="buttons" />
      </div>
      <div
        class="error-message-wrapper"
        v-if="validated"
      >
        <p class="error-message">* type & price are required *</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStoreCounters } from '@/store/storeCounters';
import SelectImage from '@/components/Counters/SelectImage.vue';
import windowData from './windowData';

const storeCounters = useStoreCounters();

const props = defineProps({
  windowType: {
    type: String,
    required: true,
  },
  windowLocation: {
    type: String,
    default: 'Inside & Out',
  },
  windowPrice: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});

const emit = defineEmits(['update:windowType', 'update:windowLocation', 'update:windowPrice', 'update:imageUrl']);

let selectImage = (imageData) => {
  emit('update:imageUrl', imageData.url);
};

const isDisabled = computed(() => {
  if (this.windowType !== '' && typeof this.windowPrice === 'number') {
    return false;
  } else {
    return true;
  }
});
</script>
