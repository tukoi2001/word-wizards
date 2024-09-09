<script lang="ts" setup>
import { computed, ref } from 'vue';
import { SignUpStep } from 'enums/auth';
import AuthStep from 'components/AuthStep';
import InputComponent from 'components/Input';
import ButtonComponent from 'components/Button';
import otpInput from 'components/OTP';

const currentStep = ref<SignUpStep>(SignUpStep.EMAIL);

const value = ref('');
const otpCode = ref<string>('');

const steps = computed<App.AuthStep[]>(() => [
  {
    title: 'Step 1 Title',
    description: 'Description for step 1',
    icon: 'email',
    action: () => (currentStep.value = SignUpStep.EMAIL),
  },
  {
    title: 'Step 1 Title',
    description: 'Description for step 1',
    icon: 'person',
    action: () => (currentStep.value = SignUpStep.PERSONAL),
  },
  {
    title: 'Step 2 Title',
    description: 'Description for step 2',
    icon: 'password',
    action: () => (currentStep.value = SignUpStep.PASSWORD),
  },
]);
</script>

<template>
  <auth-layout>
    <template #sidebar>
      <auth-step :currentStep="currentStep" :steps="steps" />
    </template>
    <template #default>
      <transition name="slide-fade">
        <div v-if="currentStep === SignUpStep.EMAIL">
          <input-component v-model="value" label="Testing" placeholder="Enter..." />
          <button-component type="danger" size="default" text> Sign In</button-component>
          <otp-input v-model="otpCode" />
        </div>
        <div v-else-if="currentStep === SignUpStep.PERSONAL">content 2</div>
        <div v-else>content 3</div>
      </transition>
    </template>
  </auth-layout>
</template>

<style scoped lang="scss"></style>
