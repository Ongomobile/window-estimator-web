<template>
  <div class="loginwrapper">
    <div class="lg-inner-column">
      <div class="left-column relative z-[1]">
        <div class="max-w-[520px] pt-20 ltr:pl-20 rtl:pr-20">
          <router-link to="/">
            <img
              src="@/assets/images/logo/logo.svg"
              alt=""
              class="mb-10"
              v-if="!this.$store.themeSettingsStore.isDark"
            />
            <img src="@/assets/images/logo/logo-white.svg" alt="" class="mb-10" v-else />
          </router-link>

          <h4>
            Unlock your Project
            <span class="text-slate-800 dark:text-slate-400 font-bold">performance</span>
          </h4>
        </div>
        <div class="absolute left-0 bottom-[-130px] h-full w-full z-[-1]">
          <img src="@/assets/images/auth/ils1.svg" alt="" class="h-full w-full object-contain" />
        </div>
      </div>
      <div class="right-column relative bg-white dark:bg-slate-800">
        <div class="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
          <div class="auth-box h-full flex flex-col justify-center">
            <div class="mobile-logo text-center mb-6 lg:hidden block">
              <router-link to="/"><img src="@/assets/images/logo/logo.svg" alt="" class="mx-auto" /></router-link>
            </div>
            <Signup />
          </div>
          <div class="auth-footer text-center">Copyright 2023, All Rights Reserved.</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Signup from '../common/Signup';

export default {
  components: {
    Signup,
  },
};
</script>
<style lang="scss"></style>
