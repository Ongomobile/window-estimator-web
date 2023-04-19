<template>
  <Modal
    :activeModal="addModal"
    @close="closeAddModal"
    title="Add Counter"
    centered
  >
    <div class="add-counter-form--wrapper">
      <h2 class="add-counter-heading">Add A Counter</h2>
      <!-- prevent modifier prevents default -->
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
          :images="windowImages"
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
import { ref, computed } from 'vue';
import Modal from '@/components/Modal';
import { useStoreCounters } from '@/store/storeCounters';
import SelectImage from '@/views/app/counters/SelectImage.vue';
import windowData from './windowData.json';

const storeCounters = useStoreCounters();

const addModal = computed(() => storeCounters.addModal);
const imageUrl = ref('');
const alt = ref('');

const windowImages = [
  {
    id: 0,
    url: 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641788054/singlePane125x125_bwvnor.png',
    name: 'Single Pane',
    alt: 'Single Pane',
    selected: false,
  },
  {
    id: 1,
    url: 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641788053/2pane125x125_ixucil.png',
    name: 'Two Panes',
    alt: 'Two Panes',
    selected: false,
  },
  {
    id: 2,
    url: 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641788053/3pane125x125_wpdngh.png',
    name: 'Three Panes',
    alt: 'Three Panes',
    selected: false,
  },
  {
    id: 3,
    url: 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641788053/10paneFrenchDoor125x125_vjsp4n.png',
    name: 'French Door',
    alt: 'French Door',
    selected: false,
  },
  {
    id: 4,
    url: 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641788053/12paneFrench125x125_c93sk2.png',
    name: 'French Window',
    alt: 'French Window',
    selected: false,
  },
  {
    id: 5,
    url: 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641788053/frostedBathroomWindows_nrheof.png',
    name: 'Frosted Bathroom',
    alt: 'Frosted Bathroom',
    selected: false,
  },
  {
    id: 6,
    url: 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641788053/gardenWindow125x125_ryqide.png',
    name: 'Garden Window',
    alt: 'Garden Window',
    selected: false,
  },
  {
    id: 7,
    url: 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641844853/glassDoors125x125_oxkd1s.png',
    name: 'Glass Door',
    alt: 'Glass Door',
    selected: false,
  },
  {
    id: 8,
    url: 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641788053/Inside-ladder_2x_yyzcuz.png',
    name: 'Ladder Work',
    alt: 'Ladder Work',
    selected: false,
  },
  {
    id: 9,
    url: 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641788053/largePane125x125_ndq5vj.png',
    name: 'Large Pane',
    alt: 'Large Pane',
    selected: false,
  },
  {
    id: 10,
    url: 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641788053/multiPane125x125_n91dtf.png',
    name: 'Multi Pane',
    alt: 'Multi Pane',
    selected: false,
  },
  {
    id: 11,
    url: 'https://res.cloudinary.com/dnpje4e34/image/upload/v1642190642/Storm-window_m2oxyp.png',
    name: 'Storm Window',
    alt: 'Storm Window',
    selected: false,
  },
  {
    id: 12,
    url: 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641788054/screen125x125_et506p.png',
    name: 'Screens',
    alt: 'Screens',
    selected: false,
  },
  {
    id: 13,
    url: 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641788054/shapedWindows125x125_hwfiqd.png',
    name: 'Shaped Windows',
    alt: 'Shaped Windows',
    selected: false,
  },
  {
    id: 14,
    url: 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641788054/slidingDoor125x125_gkngmd.png',
    name: 'Sliding Doors',
    alt: 'Sliding Doors',
    selected: false,
  },
  {
    id: 15,
    url: 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641788054/skylights125x125_na0uaj.png',
    name: 'Sky Lights',
    alt: 'Sky Lights',
    selected: false,
  },
  {
    id: 16,
    url: 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641788054/wagonWheel125x125_xmw7ve.png',
    name: 'Wagon Wheel',
    alt: 'Wagon Wheel',
    selected: false,
  },
  {
    id: 17,
    url: 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641788054/tracks125x125_zuttvg.png',
    name: 'Window Tracks',
    alt: 'Window Tracks',
    selected: false,
  },
  {
    id: 18,
    url: 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641845079/razorBlade125x125_cupci5.png',
    name: 'Construction',
    alt: 'Construction',
    selected: false,
  },
  {
    id: 19,
    url: 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641851671/Default-img_cntbq2.png',
    name: 'Default Image',
    alt: 'Default Image',
    selected: false,
  },
];

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
  max-width: 450px;
  /* margin: 0 auto 30px; */
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

.add-counter-heading {
  margin-bottom: 5px;
  text-align: center;
  color: rgb(71 85 105);
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
