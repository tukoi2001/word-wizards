import { REGEX } from 'config/constants';

export default function useSignIn() {
  const { t } = useI18n();
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
        message: t('required_field', { field: t('email_address').toLowerCase() }),
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

  const onSignIn = async (): Promise<void> => {
    //TODO: Handle sign in
  };

  return { isLoading, rules, formFields, onSignIn };
}
