<template>
  <div>Your content goes here.....</div>
</template>
<script setup>
import { useFirestore, useCollection } from 'vuefire';
import { collection, query, getDocs } from 'firebase/firestore';
const db = useFirestore();
// VueFire abstraction
const usersCollection = useCollection(collection(db, 'users'));

console.log({ usersCollection });
</script>
<style lang=""></style>
