import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    BACKEND_URL: z.url(),
    FRONTENDURL: z.url(),
    API_URL: z.url(),
    AUTH_URL: z.url(),
  },
  client: {
    NEXT_PUBLIC_GOOGLELOGIN_FALLBACKURL: z.url(),
  },
  runtimeEnv: {
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTENDURL: process.env.FRONTENDURL,
    API_URL: process.env.API_URL,
    AUTH_URL: process.env.AUTH_URL,
    NEXT_PUBLIC_GOOGLELOGIN_FALLBACKURL:
      process.env.NEXT_PUBLIC_GOOGLELOGIN_FALLBACKURL,
  },
});
