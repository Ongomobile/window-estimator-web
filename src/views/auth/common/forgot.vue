<template>
  <form class="space-y-4">
    <Textinput
      label="Email"
      type="email"
      placeholder="Type your email"
      name="email"
      v-model="userEmail.email"
      classInput="h-[48px]"
    />

    <button @click.prevent="resetPassword" type="" class="btn btn-dark block w-full text-center">
      Send recovery email
    </button>
  </form>
</template>
<script setup>
import { ref } from 'vue';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import Textinput from '@/components/Textinput';
const toast = useToast();
const router = useRouter();
const auth = getAuth();
const userEmail = ref({ email: '' });

async function resetPassword() {
  sendPasswordResetEmail(auth, userEmail.value.email)
    .then(() => {
      //
      router.push('/');
      toast.success('Password reset email sent!', {
        timeout: 2000,
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}
</script>
