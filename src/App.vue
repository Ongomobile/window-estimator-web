<template>
  <router-view />
</template>

<script>
import { useThemeSettingsStore } from '@/store/themeSettings';
import { useStoreAuth } from '@/store/storeAuth';

export default {
  data() {
    return {
      storeAuth: useStoreAuth(),
    };
  },
  mounted() {
    this.$store.themeSettingsStore = useThemeSettingsStore();
    this.init();
  },
  methods: {
    init() {
      this.storeAuth.init();
    },
  },
};
</script>

<style></style>
