<template>
  <div class="counter-wrapper">
    <div class="counter-type-wrapper">
      <p class="counter-type">{{ counter.windowType }}</p>
      <p class="counter-type">{{ counter.windowLocation }}</p>
    </div>
    <div class="counter-controls-wrapper">
      <div class="counter-image-wrapper">
        <img :src="counter.imageUrl" :alt="counter.alt" class="counter-image" />
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
      <fa class="trash-icon" icon="trash-alt" @click="deleteCounter(counter)" />
      <label class="counter-subtotal-label">Subtotal</label>
      <span id="" class="counter-subtotal-display">{{ counter.subtotal }}</span>
      <p class="reset-btn" @click="resetSubtotal(counter)">reset</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    counter: Object,
  },
  methods: {
    deleteCounter(counter) {
      this.counterIdToDelete = counter.id;
      this.$emit('counter-to-delete', this.counterIdToDelete);
    },
    incrementQty(counter) {
      counter.quantity += 1;
      this.getSubtotal(counter);
      console.log(counter);
    },
    decrementQty(counter) {
      if (counter.quantity > 0) {
        counter.quantity -= 1;
        this.getSubtotal(counter);
      } else {
        counter.quantity = 0;
      }
    },
    getSubtotal: function (counter) {
      let count = counter.quantity;
      let price = counter.windowPrice;
      let subTotal = count * price;
      counter.subtotal = subTotal.toFixed(2);
    },
    resetSubtotal: function (counter) {
      counter.quantity = 0;
      counter.subtotal = 0.0;
    },
  },
};
</script>

<style scoped>
.counter-wrapper {
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  margin-right: 15px;
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
