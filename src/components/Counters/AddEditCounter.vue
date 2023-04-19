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
        type="text"
        id="type"
        name="type"
        class="add-counter-input"
        placeholder="Add Window Type"
        v-model="windowType"
      />
      <label
        for="location"
        class="add-counter-label"
        >Window Location</label
      >
      <input
        type="text"
        id="location"
        name="location"
        class="add-counter-input"
        placeholder="Add Location (default in & out)"
        v-model="windowLocation"
      />

      <label
        for="price"
        class="add-counter-label"
        >Window Price</label
      >
      <!-- Use .number modifier to cast input value as number -->
      <input
        type="text"
        id="price"
        name="price"
        class="add-counter-input"
        v-model.number="windowPrice"
        placeholder="Add Window Price"
      />
      <SelectImage
        :images="windowData"
        @on-select-image="selectImage"
      />
      <input
        type="submit"
        class="add-counter-input submit"
        value="Add Counter"
        :disabled="isDisabled"
      />
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
import { reactive } from 'vue';
import { useStoreCounters } from '@/store/storeCounters';
import SelectImage from '@/components/Counters/SelectImage.vue';
import windowData from './windowData';

const storeCounters = useStoreCounters();

let selectImage = (imageData) => {
  imageUrl = imageData.url;
  alt = imageData.alt;
};

const counterData = reactive({
  windowPrice: '',
  windowType: '',
  windowLocation: '',
  imageUrl: '',
  alt: '',
  quantity: 0,
  counterId: 0,
  subtotal: null,
});

const addCounter = () => {};
</script>
