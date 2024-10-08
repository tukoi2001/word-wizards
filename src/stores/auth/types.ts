import { DefineStoreOptions } from 'pinia';

export type State = {
  currentUser: Auth.User | null;
};

export type Getters = {
  currentUserEmail(state: State): string;
};

export type Actions = {
  signIn(formFields: Auth.SignInForm, callback: App.Callback): Promise<void>;
  signUp(formFields: Auth.SignUpForm, callback: App.Callback): Promise<void>;
  setAuthResponse(response: Auth.SignInResponse): void;
  setUserInfo(userInfo: Auth.User): void;
  reset(): void;
};

export type AuthStoreOptions = DefineStoreOptions<
  string,
  State,
  Getters,
  Actions
>;
