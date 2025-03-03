export const AUTH_CONFIG = {
  redirectAfterLogin: "/dashboard",
  redirectAfterLogout: "/",
  protectedRoutes: ["/dashboard(.*)"],
  publicRoutes: ["/auth(.*)"],
  defaultSignInRoute: "/auth/login",
};
