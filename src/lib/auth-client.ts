import { env } from "@/env";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : env.NEXT_PUBLIC_BACKEND_AUTH,
  fetchOptions: {
    credentials: "include",
  },
});
