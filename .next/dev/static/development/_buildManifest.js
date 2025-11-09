self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "/admin/approve": [
    "static/chunks/pages/admin/approve.js"
  ],
  "/provider": [
    "static/chunks/pages/provider.js"
  ],
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/_app",
    "/_error",
    "/admin",
    "/admin/approve",
    "/admin/dashboard",
    "/admin/home",
    "/admin/layout",
    "/admin/provider/[id]",
    "/admin/providers",
    "/admin/settings",
    "/api/approve",
    "/api/jobs",
    "/api/providers",
    "/api/providers/pending",
    "/auth",
    "/email-confirmed",
    "/jobs",
    "/jobs/[id]",
    "/jobs/[id]/applications",
    "/post-job",
    "/provider",
    "/provider/applications",
    "/provider/dashboard",
    "/provider/login",
    "/provider/profile",
    "/provider/register",
    "/verify-otp"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()