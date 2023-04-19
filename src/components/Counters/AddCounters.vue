<template>
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
    <div class="total-price-wrapper">
      <p class="total-text">Total Price {{ getTotals }}</p>
    </div>
  </div>
  <div class="counters-wrapper">
    <draggable
      v-model="counters"
      :animation="200"
      :itemKey="id"
      class="counters-list"
    >
      <template #item="{ element }">
        <Counter
          :counter="element"
          @counter-to-delete="deleteSelectedCounter"
        />
      </template>
    </draggable>
  </div>
</template>

<script>
import Counter from './Counter.vue';
import SelectImage from '../../views/app/counters/SelectImage.vue';
import windowData from './windowData.json';
import draggable from 'vuedraggable';
export default {
  data() {
    return {
      drag: false,
      counters: [],
      windowPrice: '',
      windowType: '',
      windowLocation: '',
      imageUrl: '',
      alt: '',
      quantity: 0,
      counterId: 0,
      subtotal: null,
      windowImages: windowData,
      isValid: true,
    };
  },
  components: {
    Counter,
    SelectImage,
    draggable,
  },
  mounted() {
    if (localStorage.getItem('counters')) {
      try {
        this.counters = JSON.parse(localStorage.getItem('counters'));
      } catch (e) {
        localStorage.removeItem('counters');
      }
    }
  },
  methods: {
    addCounter() {
      let newCounter = {
        id: this.counterId + 1,
        windowType: this.windowType,
        windowLocation: this.windowLocation || 'In & Out',
        windowPrice: this.windowPrice,
        imageUrl:
          this.imageUrl || 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641851671/Default-img_cntbq2.png',
        quantity: this.quantity,
        subtotal: this.subtotal,
      };

      if (this.windowPrice !== '' && this.windowType !== '') {
        this.counters.push(newCounter);
      }

      this.windowPrice = '';
      this.windowType = '';
      this.windowLocation = '';
      this.imageUrl = 'https://res.cloudinary.com/dnpje4e34/image/upload/v1641851671/Default-img_cntbq2.png';
      this.alt = '';
      this.quantity = 0;
      this.subtotal = null;
      this.counterId = newCounter.id;
    },
    deleteSelectedCounter(id) {
      const index = this.counters
        .map((item) => {
          return item.id;
        })
        .indexOf(id);
      this.counters.splice(index, 1);
    },
    selectImage(imageData) {
      this.imageUrl = imageData.url;
      this.alt = imageData.alt;
    },
  },
  watch: {
    counters: {
      handler() {
        console.log('counters array has changed');
        let parsed = JSON.stringify(this.counters);
        localStorage.setItem('counters', parsed);
      },
      deep: true,
    },
  },
  computed: {
    isDisabled: function () {
      if (this.windowType !== '' && typeof this.windowPrice === 'number') {
        return false;
      } else {
        return true;
      }
    },
    validated: function () {
      if (this.windowType !== '' && typeof this.windowPrice === 'number') {
        return false;
      } else {
        return true;
      }
    },
    getTotals: function () {
      const grandTotals = this.counters.reduce((prev, counter) => (prev += Number(counter.subtotal)), 0);
      return grandTotals.toFixed(2);
    },
  },
};
</script>

<style scoped>
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

.total-price-wrapper {
  display: flex;
  padding: 20px;
  box-shadow: var(--box-shadow);
  border-radius: 5px;
  background-color: #fff;
}

.counters-list {
  padding: 10px;
  display: flex;
  flex-direction: column;
  list-style: none;
  overflow: auto;
  overflow-y: scroll;
}
.error-message {
  text-transform: capitalize;
  text-align: center;
  color: #ed0606;
}

@media screen and (max-width: 340px) {
  .add-counter-form--wrapper {
    max-width: 295px;
  }
}
</style>
