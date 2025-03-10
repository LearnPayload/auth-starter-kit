import { LoginRegisterPreview } from "../_components/login-register-preview";
import { RefreshRouteOnSave } from "../_components/refresh-route-on-save";

export const metadata = {
  title: "Sign in | Payload Auth Starter",
  description: "Welcome back! Please sign in to continue.",
};

export default function Login() {
  return (
    <div>
      <RefreshRouteOnSave />
      <LoginRegisterPreview />
    </div>
  );
}
