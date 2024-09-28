import { useAuthStore } from 'stores/auth';
import { REGEX } from 'config/constants';
import { RootRouter } from 'enums/app';
import { showErrorMessage } from 'utils/message-error';

export default function useSignIn() {
  const { t } = useI18n();
  const router = useRouter();
  const authStore = useAuthStore();

  const isLoading = ref<boolean>(false);

  const formFields = reactive<Auth.SignInForm>({
    email: '',
    password: '',
  });

  const rules = computed<FormRules<Auth.SignInForm>>(() => ({
    email: [
      {
        required: true,
        whitespace: true,
        message: t('required_field', {
          field: t('email_address').toLowerCase(),
        }),
        trigger: ['blur', 'change'],
      },
      {
        type: 'email',
        message: t('email_error'),
        trigger: ['blur', 'change'],
      },
    ],

    password: [
      {
        required: true,
        whitespace: true,
        message: t('required_field', { field: t('password').toLowerCase() }),
        trigger: ['blur', 'change'],
      },
      {
        pattern: REGEX.password,
        message: t('password_error'),
        trigger: ['blur', 'change'],
      },
    ],
  }));

  const onSignIn = (): void => {
    isLoading.value = true;
    authStore.signIn(formFields, {
      onSuccess: () => router.replace({ name: RootRouter.HOME_PAGE }),
      onError: (error: App.ErrorResponse) => showErrorMessage(error),
      onFinally: () => (isLoading.value = false),
    });
  };

  return { isLoading, rules, formFields, onSignIn };
}
