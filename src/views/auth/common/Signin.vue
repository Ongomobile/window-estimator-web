<template>
  <div class="bg-grey-lighter min-h-screen flex flex-col">
    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Sign In</h1>
        <form action="">
          <Textinput
            label="Email"
            type="email"
            placeholder="Enter your email"
            name="email"
            v-model="email"
            :error="emailError"
            classInput="h-[48px]"
          />
          <Textinput
            label="Password"
            type="password"
            placeholder="Enter password"
            name="password"
            v-model="password"
            :error="passwordError"
            hasicon
            classInput="h-[48px]"
            class="mb-7"
          />
          <button
            @click.prevent="signInToFirebase"
            type="submit"
            class="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
          >
            Sign In
          </button>
          <div class="mt-2">
            <router-link
              to="/forgot-password"
              class="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
            >
              Forgot Password?
            </router-link>
          </div>
        </form>
        <div class="text-center text-sm text-grey-dark mt-4">
          By signing up, you agree to the
          <a
            class="no-underline border-b border-grey-dark text-grey-dark"
            href="#"
          >
            Terms of Service
          </a>
          and
          <a
            class="no-underline border-b border-grey-dark text-grey-dark"
            href="#"
          >
            Privacy Policy
          </a>
        </div>
      </div>

      <div class="text-grey-dark mt-6">
        Already have an account?
        <router-link
          to="/register"
          class="text-slate-900 dark:text-white font-medium hover:underline"
        >
          Sign Up</router-link
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStoreAuth } from '@/store/storeAuth';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import Textinput from '@/components/Textinput';

const storeAuth = useStoreAuth();

const schema = yup.object({
  email: yup.string().required('Email is required').email(),
  password: yup.string().required('Password is required').min(8),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: email, errorMessage: emailError } = useField('email');

const { value: password, errorMessage: passwordError } = useField('password');

const signInToFirebase = handleSubmit((values) => {
  storeAuth.loginUser(values);
});
</script>
