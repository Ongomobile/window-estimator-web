import { defineStore } from 'pinia';
import { addDoc, collection, onSnapshot, doc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore';
import { useStoreAuth } from '@/store/storeAuth';
import { db } from '@/firebase';
let countersCollectionRef;
let countersCollectionQuery;

let getCountersSnapshot = null;

export const useStoreCounters = defineStore('storeCounters', {
  state: () => {
    return {
      counters: [],
      addModal: false,
      editModal: false,
      countersLoaded: false,
      isValid: false,
      isDisabled: true,
    };
  },
  actions: {
    init(userId) {
      const storeAuth = useStoreAuth();
      // Initialize our database refs
      countersCollectionRef = collection(db, 'users', userId, 'counters');
      countersCollectionQuery = query(countersCollectionRef, orderBy('date', 'desc'));

      this.getCounters();
    },
    async getCounters() {
      this.countersLoaded = false;
      getCountersSnapshot = onSnapshot(
        countersCollectionQuery,
        (querySnapshot) => {
          let counters = [];
          querySnapshot.forEach((doc) => {
            let counter = {
              id: doc.id,
              date: doc.data().date,
              location: doc.data().location,
              price: doc.data().price,
              type: doc.data().type,
              url: doc.data().url,
              quantity: doc.data().quantity,
              subtotal: doc.data().subtotal,
              alt: doc.data().alt,
            };
            counters.push(counter);
          });
          this.counters = counters;
          this.countersLoaded = true;
        },
        (error) => {
          console.log('error.message', error.message);
        }
      );
    },
    async addCounter(counter) {
      let currentDate = new Date().getTime(),
        date = currentDate.toString();
      await addDoc(
        countersCollectionRef,
        {
          location: counter.location,
          price: counter.price,
          type: counter.type,
          url: counter.url,
          date,
          quantity: counter.quantity,
          subtotal: counter.subtotal,
          alt: counter.alt,
        },
        (error) => {
          console.log('error.message', error.message);
        }
      );
    },
    async deleteCounter(id) {
      await deleteDoc(doc(countersCollectionRef, id)),
        (error) => {
          console.log('error.message', error.message);
        };
    },
    async updateCounter(id, counter) {
      let newDate = new Date().getTime(),
        date = newDate.toString();
      console.log('counter', counter);
      await updateDoc(
        doc(countersCollectionRef, id),
        {
          date,
          location: counter.location,
          price: counter.price,
          type: counter.type,
          url: counter.url,
          quantity: counter.quantity,
          subtotal: counter.subtotal,
          alt: counter.type,
        },
        (error) => {
          console.log('error.message', error.message);
        }
      );
    },
    clearCounters() {
      this.counters = [];
      if (getCountersSnapshot) getCountersSnapshot();
      // unsubscribe from any active listener
    },
    openCounterModal() {
      this.addModal = true;
    },
    closeCounterModal() {
      this.addModal = false;
    },
    openEditCounterModal() {
      this.editModal = true;
    },
    closeEditCounterModal() {
      this.editModal = false;
    },
  },
  getters: {
    getCounterContent: (state) => {
      return (id) => {
        let counterData = state.counters.filter((counter) => counter.id === id)[0];

        return counterData;
      };
    },
  },
});
