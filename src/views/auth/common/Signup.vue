<template>
  <!-- component -->
  <div class="bg-grey-lighter min-h-screen flex flex-col">
    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Sign up</h1>
        <form action="">
          <input
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Full Name"
            v-model="userInput.name"
          />

          <input
            type="text"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            v-model="userInput.email"
          />

          <input
            type="password"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            v-model="userInput.password"
          />
          <!-- <input
            type="password"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
          /> -->

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
        <a class="no-underline border-b border-blue text-blue" href="../login/"> Log in </a>.
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useFirebaseAuth } from 'vuefire';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

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
  console.log('CreateUser Called', userInput.value.email, userInput.value.password);
  createUserWithEmailAndPassword(auth, userInput.value.email, userInput.value.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      router.push('/');
      toast.success(' Account Create successfully', {
        timeout: 2000,
      });

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('In Catch', errorMessage);
    });
}
</script>
<!-- <script>
import Textinput from '@/components/Textinput';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { inject } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
export default {
  components: {
    Textinput,
  },
  data() {
    return {
      checkbox: false,
    };
  },
  setup() {
    // Define a validation schema
    const schema = yup.object({
      email: yup.string().required(' Email is required').email(),
      password: yup.string().required('Password is  required').min(8),
      name: yup.string().required('Full name is required'),
    });
    const swal = inject('$swal');
    const toast = useToast();
    const router = useRouter();
    // Create a form context with the validation schema
    // const users = [];
    const { handleSubmit } = useForm({
      validationSchema: schema,
    });
    // No need to define rules for fields
    const { value: email, errorMessage: emailError } = useField('email');
    const { value: name, errorMessage: nameError } = useField('name');
    const { value: password, errorMessage: passwordError } = useField('password');
    const onSubmit = handleSubmit((values) => {
      // add value into user array if same email not found
      // if (!users.find((user) => user.email === values.email)) {
      //   users.push(values);
      //   localStorage.setItem('users', JSON.stringify(users));
      //   router.push('/');
      //   // use vue-toast-notification app use
      //   toast.success -
      //     500(' Account Create successfully', {
      //       timeout: 2000,
      //     });
      // } else {
      //   // use sweetalert 2
      //   swal.fire({
      //     title: 'Email already exists',
      //     text: 'Please try another email',
      //     icon: 'error',
      //     confirmButtonText: 'Ok',
      //   });
      // }
    });
    return {
      email,
      name,
      nameError,
      emailError,
      password,
      passwordError,
      onSubmit,
    };
  },
};
</script> -->
<style lang="scss"></style>
