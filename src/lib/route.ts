const routes = {
  home: "/",
  login: "/auth/login",
  register: "/auth/register",
  property: "/property/:id",
  dashboard: "/dashboard",
  "password.request": "/auth/password/request",
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

// memoize the route function
const route = new Proxy(routeFn, {
  get(target, prop) {
    if (prop === "toString") {
      return () => "route";
    }
    return Reflect.get(target, prop);
  },
});

export default route;
