<template>
  <!-- <form @submit.prevent="onSubmit" class="space-y-4">
    <Textinput
      label="Email"
      type="email"
      placeholder="Type your email"
      name="emil"
      v-model="email"
      :error="emailError"
      classInput="h-[48px]"
    />
    <Textinput
      label="Password"
      type="password"
      placeholder="8+ characters, 1 capitat letter "
      name="password"
      v-model="password"
      :error="passwordError"
      hasicon
      classInput="h-[48px]"
    />

    <div class="flex justify-between">
      <label class="cursor-pointer flex items-start">
        <input type="checkbox" class="hidden" @change="() => (checkbox = !checkbox)" />
        <span
          class="h-4 w-4 border rounded flex-none inline-flex mr-3 relative top-1 transition-all duration-150"
          :class="
            checkbox
              ? 'ring-2 ring-black-500 dark:ring-offset-slate-600 dark:ring-slate-900  dark:bg-slate-900 ring-offset-2 bg-slate-900'
              : 'bg-slate-100 dark:bg-slate-600 border-slate-100 dark:border-slate-600 '
          "
        >
          <img src="@/assets/images/icon/ck-white.svg" alt="" class="h-[10px] w-[10px] block m-auto" v-if="checkbox" />
        </span>
        <span class="text-slate-500 dark:text-slate-400 text-sm leading-6">Keep me signed in</span>
      </label>
      <router-link to="/forgot-password" class="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >Forgot Password?</router-link
      >
    </div>

    <button type="submit" class="btn btn-dark block w-full text-center">Sign in</button>
  </form> -->
  <form action="">
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
      @click="signInToFirebase"
      type="button"
      class="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
    >
      Sign In
    </button>
    <div class="mt-2">
      <router-link to="/forgot-password" class="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium">
        Forgot Password?
      </router-link>
    </div>
  </form>
</template>
<script setup>
import { ref } from 'vue';
import { useFirebaseAuth } from 'vuefire';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import Textinput from '@/components/Textinput';

const toast = useToast();
const router = useRouter();
const auth = useFirebaseAuth();

const userInput = ref({
  email: '',
  password: '',
});

async function signInToFirebase() {
  signInWithEmailAndPassword(auth, userInput.value.email, userInput.value.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      router.push('/app/home');
      toast.success(' Login  successfully', {
        timeout: 2000,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
</script>
