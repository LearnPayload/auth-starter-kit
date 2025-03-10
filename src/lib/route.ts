import memoize from "memoize";
const routes = {
  home: "/",
  login: "/auth/login",
  register: "/auth/register",
  "password.request": "/auth/password/request",
  "app.dashboard": "/app/dashboard",

  // authkitapp/
  "authkit.overview": "/app/authkit",
  "authkit.users": "/app/authkit/users",
  "authkit.orgs": "/app/authkit/organizations",
  "authkit.config": "/app/authkit/configure",
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
  console.log("routeFn", route, params);
  return parseParams(route, params);
}

// optimize with memoization for repeated calls to the same route
const route = memoize(routeFn);

export default route;
