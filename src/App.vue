<template>
  <router-view />
</template>

<script>
import { useThemeSettingsStore } from '@/store/themeSettings';
import { useFirebaseAuth } from 'vuefire';

const auth = useFirebaseAuth();
// console.log({ auth });
export default {
  mounted() {
    this.$store.themeSettingsStore = useThemeSettingsStore();
  },
};
</script>

<style></style>
