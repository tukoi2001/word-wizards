<script lang="ts" setup>
import VOtpInput from 'vue3-otp-input';

type Props = {
  numInputs?: number;
  inputType?: 'password' | 'tel' | 'letter-numeric';
  shouldAutoFocus?: boolean;
  shouldFocusOrder?: boolean;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
};

withDefaults(defineProps<Props>(), {
  numInputs: 6,
  inputType: 'letter-numeric',
  shouldAutoFocus: true,
  shouldFocusOrder: true,
  onChange: noop,
  onComplete: noop,
});

const attrs = useAttrs();
const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);

defineExpose({
  otpInput,
});
</script>

<template>
  <v-otp-input
    v-bind="attrs"
    ref="otpInput"
    :numInputs="numInputs"
    :inputType="inputType"
    inputClasses="otp-input"
    :shouldAutoFocus="shouldAutoFocus"
    :shouldFocusOrder="shouldFocusOrder"
    :isDisabled="false"
    @on-change="onChange"
    @on-complete="onComplete"
  />
</template>

<style lang="scss">
.otp-input {
  width: 35px;
  height: 35px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  color: var(--text-primary-color);
  background-color: var(--active-color);
  border: 1px solid var(--text-primary-color);
  text-align: center;
  outline: none;

  &.is-complete {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
  }

  &.error {
    border-color: $danger;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    border-color: var(--primary-color);
  }
}

@media (max-width: 420px) {
  .otp-input {
    width: 30px;
    height: 30px;
    margin: 0 5px;
  }
}
</style>
