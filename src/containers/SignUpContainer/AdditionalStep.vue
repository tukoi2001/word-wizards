<script lang="ts" setup>
import InputComponent from 'components/Form/Input';
import ButtonComponent from 'components/Form/Button';
import { AuthStepLayout } from 'components/AuthStep';

const SkipAdditionalModal = defineAsyncComponent(
  () => import('modals/SkipAdditionalModal'),
);

type Props = {
  formRef: App.Any;
  isLoading: boolean;
  onSignUp: () => void;
  onBackStep: () => void;
};

const props = defineProps<Props>();
const phoneNumber = defineModel<string>('phoneNumber');
const address = defineModel<string>('address');
const { t } = useI18n();

const isValidPhoneNumber = ref<boolean>(true);
const isValidAddress = ref<boolean>(true);
const isShowSkipAdditionalModal = ref<boolean>(false);

const isEmptyValue = computed<boolean>(
  () => !address.value || !phoneNumber.value,
);

const buttonLabel = computed<string>(() =>
  isEmptyValue.value ? t('skip') : t('get_started'),
);

onMounted(() => {
  if (phoneNumber.value) {
    onValidatePhoneNumber();
  }
  if (address.value) {
    onValidateAddress();
  }
});

const onValidatePhoneNumber = (): void => {
  if (props.formRef) {
    props.formRef.validateField('phoneNumber', (isValid: boolean) => {
      isValidPhoneNumber.value = isValid;
    });
  }
};

const onValidateAddress = (): void => {
  if (props.formRef) {
    props.formRef.validateField('address', (isValid: boolean) => {
      isValidAddress.value = isValid;
    });
  }
};

const onContinue = (): void => {
  if (isEmptyValue.value) {
    isShowSkipAdditionalModal.value = true;
  } else {
    props.onSignUp();
  }
};
</script>

<template>
  <div class="additional-step">
    <auth-step-layout
      :title="t('enter_your_additional_information')"
      :description="t('enter_your_additional_information_description')"
      icon="settings"
    >
      <template #content>
        <input-component
          v-model="phoneNumber"
          name="phoneNumber"
          :label="t('phone_number')"
          :placeholder="
            t('enter_your_field', { field: t('phone_number').toLowerCase() })
          "
          :disabled="isLoading"
          is-optional
          in-form
          @input="onValidatePhoneNumber"
        />
        <input-component
          v-model="address"
          name="address"
          :label="t('address')"
          :placeholder="
            t('enter_your_field', { field: t('address').toLowerCase() })
          "
          is-optional
          in-form
          @input="onValidateAddress"
        />
      </template>
      <template #action>
        <button-component
          type="default"
          size="default"
          is-full-width
          :disabled="isLoading"
          :on-click="onBackStep"
        >
          {{ t('back') }}
        </button-component>
        <button-component
          size="default"
          :disabled="!isValidPhoneNumber || !isValidAddress || isLoading"
          is-full-width
          :on-click="onContinue"
        >
          {{ buttonLabel }}
        </button-component>
      </template>
    </auth-step-layout>
    <skip-additional-modal
      v-if="isShowSkipAdditionalModal"
      v-model="isShowSkipAdditionalModal"
      :is-loading="isLoading"
      :on-sign-up="onSignUp"
    />
  </div>
</template>
src/components/Form/Button
