<template>
  <Modal
    :activeModal="editModal"
    @close="closeEditModal"
    title="Edit Counter"
    centered
  >
    <div class="max-w-sm">
      <AddEditCounter
        v-model:windowType="counterData.type"
        v-model:windowLocation="counterData.location"
        v-model:windowPrice="counterData.price"
        v-model:imageUrl="counterData.url"
        v-model:counterId="counterData.id"
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
  </Modal>
</template>
<script setup>
import { computed, ref, watch } from 'vue';
import Modal from '@/components/Modal';
import { useStoreCounters } from '@/store/storeCounters';
import AddEditCounter from '@/components/Counters/AddEditCounter';

const props = defineProps({
  counterId: {
    type: String,
    required: true,
  },
});

const storeCounters = useStoreCounters();
const windowType = ref('');
const windowLocation = ref('');
const windowPrice = ref('');
const imageUrl = ref('');
const counterId = ref('');
const counterData = ref({});
counterData.value = storeCounters.getCounterContent(props.counterId);

const handleEditCounter = () => {
  console.log(props.counterId);
  //storeCounters.updateCounter(tempId, counterData.value);
};

const editModal = computed(() => storeCounters.editModal);

const closeEditModal = () => {
  storeCounters.closeEditCounterModal();
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
