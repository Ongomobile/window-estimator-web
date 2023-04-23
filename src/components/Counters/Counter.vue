<template>
  <div class="counter-wrapper">
    <div class="counter-type-wrapper">
      <p class="counter-type">{{ counter.type }}</p>
      <p class="counter-type">{{ counter.location }}</p>
    </div>
    <div class="counter-controls-wrapper">
      <div class="counter-image-wrapper">
        <img
          :src="counter.url"
          :alt="counter.alt"
          class="counter-image"
        />
      </div>
      <div class="counter-tally-wrapper">
        <input
          type="image"
          id="image"
          class="counter-qty-btn"
          alt="decrement quantity"
          src="https://res.cloudinary.com/dnpje4e34/image/upload/v1641180924/Minus-btn_2x_qr2bqg.png"
          @click="decrementQty(counter)"
        />
        <label for="qty">
          <div class="counter-qty-wrapper">
            <span class="counter-qty-span">{{ counter.quantity }}</span>
          </div>
        </label>
        <input
          type="image"
          id="image"
          class="counter-qty-btn"
          alt="increment quantity"
          src="https://res.cloudinary.com/dnpje4e34/image/upload/v1641180977/Plus-btn_2x_gtzatk.png"
          @click="incrementQty(counter)"
        />
      </div>
    </div>
    <div class="counter-subtotal-wraper">
      <span @click="handleDeleteCounter(counter.id)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      </span>
      <label class="counter-subtotal-label">Subtotal</label>
      <span
        id=""
        class="counter-subtotal-display"
        >{{ counter.subtotal }}</span
      >
      <p
        class="reset-btn"
        @click="resetSubtotal(counter)"
      >
        reset
      </p>
      <RouterLink :to="`/editCounters/${counter.id}`">
        <span>
          <svg
            fill="#475569"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="24px"
            height="24px"
            viewBox="0 0 494.936 494.936"
            xml:space="preserve"
            stroke="#475569"
          >
            <g
              id="SVGRepo_bgCarrier"
              stroke-width="0"
            />

            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <g id="SVGRepo_iconCarrier">
              <g>
                <g>
                  <path
                    d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157 c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21 s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741 c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"
                  />
                  <path
                    d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069 c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963 c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692 C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107 l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005 c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"
                  />
                </g>
              </g>
            </g>
          </svg>
        </span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import Icon from '../Icon';
import { ref } from 'vue';
import { useStoreCounters } from '@/store/storeCounters';
import { useSound } from '@vueuse/sound';
import plusSound from '@/assets/sounds/click-sound.mp3';
import minusSound from '@/assets/sounds/minus-click.mp3';

const plus = useSound(plusSound);
const minus = useSound(minusSound);
const active = ref(false);
const storeCounters = useStoreCounters();

const props = defineProps({
  counter: {
    type: Object,
    required: true,
  },
});

const handleDeleteCounter = (id) => {
  storeCounters.deleteCounter(id);
};

const incrementQty = (counter) => {
  plus.play();
  counter.quantity += 1;
  getSubtotal(counter);
};

const decrementQty = (counter) => {
  if (counter.quantity > 0) {
    minus.play();
    counter.quantity -= 1;
    getSubtotal(counter);
  } else {
    counter.quantity = 0;
  }
};

const getSubtotal = (counter) => {
  let count = counter.quantity;
  let price = counter.price;
  let subTotal = count * price;
  counter.subtotal = subTotal.toFixed(2);
};

const resetSubtotal = (counter) => {
  counter.quantity = 0;
  counter.subtotal = 0.0;
};
</script>

<style scoped>
.counter-wrapper {
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  margin-bottom: 20px;
  border: solid 1px #eee;
  border-radius: 5px;
  box-shadow: var(--box-shadow);
  width: 320px;
}
.counter-type-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.counter-type {
  color: var(--colored-text);
  font-size: 20px;
  margin-bottom: 10px;
  text-transform: capitalize;
}

.counter-controls-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.counter-image-wrapper {
  height: 60px;
  width: 60px;
  padding: 5px;
  border-radius: 5px;
}

.counter-image {
  border-radius: 5px;
}

.counter-tally-wrapper {
  display: flex;
}
.counter-qty-input {
  width: 45px;
  height: 45px;
  font-size: 12px;
}
.counter-qty-btn {
  touch-action: manipulation;
  border: none;
  cursor: pointer;
  outline: none;
  border-radius: 30px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  height: 45px;
  width: 45px;
}

.counter-qty-btn:active {
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.4), inset 4px 4px 4px rgba(0, 0, 0, 0.4);
  transform: translate(6px 6px);
}
.counter-subtotal-wraper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  color: var(--colored-text);
}

.trash-icon {
  color: red;
  height: 20px;
  width: 20px;
}

.counter-subtotal-label {
  margin-right: 10px;
}

.counter-qty-wrapper {
  padding: 10px 20px;
  /* border: solid 1px #eee; */
}

.counter-qty-span {
  font-size: 20px;
  font-weight: 500;
}
.reset-btn {
  color: #0e6d97;
}

@media screen and (max-width: 340px) {
  .counter-wrapper {
    width: 295px;
  }
}
</style>
