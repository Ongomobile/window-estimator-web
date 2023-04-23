<template>
  <Modal
    :activeModal="editModal"
    @close="closeEditModal"
    title="Edit A Counter"
    centered
  >
    <AddEditCounter
      v-model:windowType="windowType"
      v-model:windowLocation="windowLocation"
      v-model:windowPrice="windowPrice"
      v-model:imageUrl="imageUrl"
      :validated="storeCounters.isValid"
    >
      <template #buttons>
        <button
          @click="handleEditCounter"
          :disabled="storeCounters.isDisabled"
          :class="storeCounters.isDisabled ? 'opacity-10' : ''"
          class="bg-slate-900 dark:bg-slate-800 dark:border-b dark:border-slate-700 text-white uppercase p-2 rounded-md"
        >
          Edit Counter
        </button>
      </template>
    </AddEditCounter>
  </Modal>
</template>
<script setup>
import { computed, ref, watch, onMounted } from 'vue';
import Modal from '@/components/Modal';
import { useStoreCounters } from '@/store/storeCounters';
import AddEditCounter from '@/components/Counters/AddEditCounter';

const storeCounters = useStoreCounters();

const windowType = ref('');
const windowLocation = ref('');
const windowPrice = ref('');
const imageUrl = ref('');

const editModal = computed(() => storeCounters.editModal);

const closeEditModal = () => {
  storeCounters.closeEditCounterModal();
};

onMounted(() => {
  storeCounters.editModal = true;
});

watch([windowType, () => windowPrice.value], ([type, price]) => {
  if (type !== '' && price !== '') {
    storeCounters.isValid = true;
    storeCounters.isDisabled = false;
  }

  if ((type === '' && price === '') || price === '' || type === '') {
    storeCounters.isValid = false;
    storeCounters.isDisabled = true;
  }
});

const handleEditCounter = () => {};

// const handleAddCounter = () => {
//   let newCounter = {
//     type: windowType.value,
//     location: windowLocation.value || 'In & Out',
//     price: parseFloat(windowPrice.value),
//     url: imageUrl.value || 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641851671/Default-img_cntbq2.png',
//     quantity: 0,
//     subtotal: 0,
//     alt: windowType.value,
//   };

//   storeCounters.addCounter(newCounter);
//   storeCounters.closeCounterModal();

//   windowType.value = '';
//   windowLocation.value = '';
//   windowPrice.value = '';
//   imageUrl.value = '';
// };
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
