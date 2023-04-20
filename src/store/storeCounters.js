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
    };
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth();
      // Initialize our database refs
      countersCollectionRef = collection(db, 'users', storeAuth.user.id, 'counters');
      countersCollectionQuery = query(countersCollectionRef, orderBy('date', 'desc'));
      console.log(countersCollectionRef);

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
      await addDoc(countersCollectionRef, {
        location: counter.location,
        price: counter.price,
        type: counter.type,
        url: counter.url,
        date,
      });
    },
    async deleteCounter() {
      // delete counter
    },
    async updateCounter() {
      // update counter
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
  },
});
