declare namespace Request {
  type DecodedToken = {
    exp: number;
    [key: string]: App.Any;
  };

  type TokenResponse = {
    accessToken: string;
    refreshToken: string;
  };
}
