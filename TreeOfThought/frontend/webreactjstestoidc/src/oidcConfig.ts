import type { AuthProviderProps } from "react-oidc-context";

export const oidcConfig: AuthProviderProps = {
  authority: "http://localhost:5000",
  client_id: "react_spa", // Update this to match the actual client_id in the OIDC provider
  redirect_uri: window.location.origin + "/callback",
  post_logout_redirect_uri: window.location.origin + "/",
  response_type: "code",
  scope: "openid profile email", // Add any API scopes if necessary
  onSigninCallback: (_user: void | import("oidc-client-ts").User) => {
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    );
  }
};
