import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'https://4b108d86trial.authentication.ap21.hana.ondemand.com',
  redirectUri: window.location.origin,
  clientId: '"sb-na-6c033e0f-40ea-4e57-b1c4-8dbb8f8274fb!t44407',
  responseType: 'code',
  scope: 'openid profile email', 
  showDebugInformation: true,
};
