<template>
  <Modal
    :activeModal="addModal"
    @close="closeAddModal"
    title="Add A Counter"
    centered
  >
    <AddEditCounter
      v-model:windowType="windowType"
      v-model:windowLocation="windowLocation"
      v-model:windowPrice="windowPrice"
      v-model:imageUrl="imageUrl"
    >
      <template #buttons>
        <button
          @click="handleAddCounter"
          class="bg-slate-900 dark:bg-slate-800 dark:border-b dark:border-slate-700 text-white uppercase p-2 rounded-md"
        >
          Add New Counter
        </button>
      </template>
    </AddEditCounter>
  </Modal>
</template>
<script setup>
import { computed, ref } from 'vue';
import Modal from '@/components/Modal';
import { useStoreCounters } from '@/store/storeCounters';
import AddEditCounter from '@/components/Counters/AddEditCounter';

const storeCounters = useStoreCounters();

const windowType = ref('');
const windowLocation = ref('');
const windowPrice = ref(0);
const imageUrl = ref('');

const addModal = computed(() => storeCounters.addModal);

const closeAddModal = () => {
  storeCounters.closeCounterModal();
};

const handleAddCounter = () => {
  let newCounter = {
    type: windowType.value,
    location: windowLocation.value,
    price: windowPrice.value,
    url: imageUrl.value,
  };

  storeCounters.addCounter(newCounter);
  storeCounters.closeCounterModal();

  windowType.value = '';
  windowLocation.value = '';
  windowPrice.value = 0;
  imageUrl.value = '';
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
