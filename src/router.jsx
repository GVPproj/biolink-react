import { createRouter, createRootRoute, createRoute, Outlet } from "@tanstack/react-router"
import IndexPage from "./pages/IndexPage"
import AdminPage from "./pages/AdminPage"

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexPage,
})

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
})

const routeTree = rootRoute.addChildren([indexRoute, adminRoute])

export const router = createRouter({ routeTree })
