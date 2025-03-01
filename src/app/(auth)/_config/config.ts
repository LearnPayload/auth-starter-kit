export const AUTH_CONFIG = {
  redirectAfterLogin: "/settings/profile",
  redirectAfterLogout: "/",
  protectedRoutes: ["/settings(.*)"],
  publicRoutes: ["/auth(.*)"],
  defaultSignInRoute: "/auth/login",
};
