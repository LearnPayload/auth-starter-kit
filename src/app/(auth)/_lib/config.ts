export const AUTH_CONFIG = {
  redirectAfterLogin: "/dashboard",
  redirectAfterLogout: "/",
  protectedRoutes: ["/dashboard(.*)", "/auth/verify-email"],
  publicRoutes: ["/auth(?!/verify-email)(.*)"],
  defaultSignInRoute: "/auth/login",
  unverifiedSignInRoute: "/auth/verify-email",
  otpExpirationMinutes: 5,
  defaultAvatar: `https://api.dicebear.com/9.x/bottts/png?seed=${Date.now()}`,
};
