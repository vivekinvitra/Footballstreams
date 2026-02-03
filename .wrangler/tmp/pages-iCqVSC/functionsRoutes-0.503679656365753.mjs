import { onRequest as __ssr_js_onRequest } from "D:\\New-world\\google-ai\\footballstreams\\Footballstreams\\functions\\ssr.js"
import { onRequest as ____path___js_onRequest } from "D:\\New-world\\google-ai\\footballstreams\\Footballstreams\\functions\\[[path]].js"

export const routes = [
    {
      routePath: "/ssr",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__ssr_js_onRequest],
    },
  {
      routePath: "/:path*",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [____path___js_onRequest],
    },
  ]