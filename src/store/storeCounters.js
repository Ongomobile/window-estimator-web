import { defineStore } from 'pinia';

export const useStoreCounters = defineStore('storeCounters', {
  state: () => {
    return {
      counters: [],
      addModal: false,
      editModal: false,
    };
  },
  actions: {
    async getCounters() {
      // get counters
    },
    async addCounter() {
      // add counter
    },
    async deleteCounter() {
      // delete counter
    },
    async updateCounter() {
      // update counter
    },
    clearNotes() {
      this.counters = [];
      // if (getNotesSnapshot) getNotesSnapshot(); // unsubscribe from any active listener
    },
    openCounterModal() {
      this.addModal = true;
    },
    closeCounterModal() {
      this.addModal = false;
    },
  },
});
