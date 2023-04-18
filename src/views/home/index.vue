<template>
  <div>Your content goes here.....</div>
</template>
<script setup>
import { useFirestore, useCollection, useCurrentUser } from 'vuefire';
import { collection, query, getDocs } from 'firebase/firestore';
const db = useFirestore();
// VueFire abstraction
const usersCollection = useCollection(collection(db, 'users'));
const currentUser = useCurrentUser();
const currentUserId = currentUser.value.uid;
const usersArr = usersCollection.value;
const currentUserData = usersArr.filter((user) => user.id === currentUserId);
</script>
<style lang=""></style>
