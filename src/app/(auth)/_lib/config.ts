export const AUTH_CONFIG = {
  redirectAfterLogin: "/dashboard",
  redirectAfterLogout: "/",
  protectedRoutes: ["/dashboard(.*)"],
  publicRoutes: ["/auth(?!/verify-email)(.*)"],
  defaultSignInRoute: "/auth/login",
  unverifiedSignInRoute: "/auth/verify-email",
  otpExpirationMinutes: 5,
};
