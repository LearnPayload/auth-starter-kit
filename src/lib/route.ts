import memoize from "memoize";
const routes = {
  // marketing pages
  home: "/",

  // auth pages
  login: "/auth/login",
  register: "/auth/register",
  "password.reset": "/auth/password/reset",
  // main app
  "app.dashboard": "/app/dashboard",

  // user account
  "account.settings": "/app/account/settings/profile",
  "account.settings.appearance": "/app/account/settings/appearance",

  // authkitapp/
  "authkit.overview": "/app/authkit",
  "authkit.users": "/app/authkit/users",
  "authkit.orgs": "/app/authkit/organizations",
  "authkit.config": "/app/authkit/configure",

  // payload
  "payload.admin": "/admin",
} as const;

export type Route = keyof typeof routes;

function parseParams<P>(route: Route, params?: P): string {
  const path = routes[route];
  if (!path) {
    throw new Error(`Route ${route} not found`);
  }

  if (!params) {
    return path;
  }

  // string replace
  const parsedRoute = path.replace(/\/:([^/]+)/g, (match, key) => {
    return `/${params[key as keyof P]}`;
  });
  return parsedRoute;
}

function routeFn<P>(route: Route, params?: Partial<P>): string {
  return parseParams(route, params);
}

// optimize with memoization for repeated calls to the same route
const route = memoize(routeFn);

export default route;
