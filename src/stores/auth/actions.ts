import { signIn } from 'api/auth';
import { setAccessToken, setRefreshToken, setUserInfo } from 'utils/auth-cookie';
import type { AuthStoreOptions } from './types';

const actions: AuthStoreOptions['actions'] = {
  async signIn(formFields: Auth.SignInForm, callback: App.Callback): Promise<void> {
    const onSuccess = get(callback, 'onSuccess', noop);
    const onError = get(callback, 'onError', noop);
    const onFinish = get(callback, 'onFinish', noop);
    try {
      const response = await signIn(formFields);
      this.setAuthResponse(response);
      onSuccess(response);
    } catch (error) {
      onError(error);
    } finally {
      onFinish();
    }
  },
  setUserInfo(userInfo: Auth.User): void {
    this.currentUser = userInfo;
    setUserInfo(userInfo);
  },
  setAuthResponse(response: Auth.SignInResponse) {
    const { accessToken, refreshToken, userInfo } = response;
    this.setUserInfo(userInfo);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  },
  reset() {
    this.$reset();
  },
};

export default actions;
