export const AUTH_CONFIG = {
  redirectIfNotAdmin: "/app/dashboard",
  redirectAfterUserLogin: "/",
  redirectAfterLogout: "/",
  protectedAdminRoutes: ["/app/authkit(.*)"],
  protectedRoutes: ["/app(.*)", "/auth/verify-email"],
  publicRoutes: ["/auth/(?!/verify-email)(.*)"],
  defaultSignInRoute: "/auth/login",
  unverifiedSignInRoute: "/auth/verify-email",
  otpExpirationMinutes: 5,
  defaultAvatar: `https://api.dicebear.com/9.x/bottts/png?seed=${Date.now()}`,
};
