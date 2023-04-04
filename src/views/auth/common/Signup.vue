<template>
  <!-- component -->
  <div class="bg-grey-lighter min-h-screen flex flex-col">
    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Sign up</h1>
        <form action="">
          <Textinput
            label="Full name"
            type="text"
            placeholder="Enter full name"
            name="name"
            v-model="userInput.name"
            classInput="h-[48px]"
          />
          <Textinput
            label="Email"
            type="email"
            placeholder="Enter your email"
            name="email"
            v-model="userInput.email"
            classInput="h-[48px]"
          />
          <Textinput
            label="Password"
            type="password"
            placeholder="Enter password"
            name="password"
            v-model="userInput.password"
            hasicon
            classInput="h-[48px]"
            class="mb-7"
          />
          <button
            @click="createUser"
            type="button"
            class="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
          >
            Create Account
          </button>
        </form>

        <div class="text-center text-sm text-grey-dark mt-4">
          By signing up, you agree to the
          <a class="no-underline border-b border-grey-dark text-grey-dark" href="#"> Terms of Service </a> and
          <a class="no-underline border-b border-grey-dark text-grey-dark" href="#"> Privacy Policy </a>
        </div>
      </div>

      <div class="text-grey-dark mt-6">
        Already have an account?
        <router-link to="/" class="text-slate-900 dark:text-white font-medium hover:underline"> Sign In</router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useFirebaseAuth, useCurrentUser } from 'vuefire';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useFirestore } from 'vuefire';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import Textinput from '@/components/Textinput';

const db = useFirestore();

const userInput = ref({
  name: '',
  email: '',
  password: '',
});

const checkbox = ref(false);
const auth = useFirebaseAuth();
const toast = useToast();
const router = useRouter();

async function createUser() {
  createUserWithEmailAndPassword(auth, userInput.value.email, userInput.value.password)
    .then((userCredential) => {
      const user = userCredential.user;
      addUser();
      toast.success(' Account Create successfully', {
        timeout: 2000,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('In Catch', errorMessage);
    });
}

// Add a new document with a generated id.
async function addUser() {
  const user = useCurrentUser();
  const userId = user.value.uid;
  const userRef = doc(db, 'users', userId);

  const newUser = {
    name: userInput.value.name,
    email: userInput.value.email,
    counters: [],
    estimates: [],
    customers: [],
  };
  const newDoc = await setDoc(userRef, {
    ...newUser,
  });

  if (newDoc.id) {
    router.push('/');
  }
}
</script>
