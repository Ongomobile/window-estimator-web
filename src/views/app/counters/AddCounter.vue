<template>
  <Modal
    :activeModal="addModal"
    @close="closeAddModal"
    title="Add A Counter"
    centered
  >
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
  </Modal>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import Modal from '@/components/Modal';
import { useStoreCounters } from '@/store/storeCounters';
import SelectImage from '@/views/app/counters/SelectImage.vue';
import windowData from './windowData';

const storeCounters = useStoreCounters();

const addModal = computed(() => storeCounters.addModal);
const imageUrl = ref('');
const alt = ref('');

const closeAddModal = () => {
  storeCounters.closeCounterModal();
};

let selectImage = (imageData) => {
  imageUrl = imageData.url;
  alt = imageData.alt;
};
</script>

<style>
.add-counter-form--wrapper {
  display: flex;
  flex-direction: column;
}

.add-counter-form {
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: solid 1px #eee;
  border-radius: 5px;
  margin-bottom: 10px;
  box-shadow: var(--box-shadow);
  background-color: #fff;
}

.add-counter-input {
  width: 100%;
  padding-left: 10px;
  border-radius: 5px;
  border: 1px solid #dcdcdc;
  margin-bottom: 10px;
}

.add-counter-label {
  color: #36454f;
  margin-left: 5px;
}

@media screen and (max-width: 340px) {
  .add-counter-form--wrapper {
    max-width: 295px;
  }
}
</style>
