/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DashboardLayoutImport } from './routes/dashboard/_layout'

// Create Virtual Routes

const DashboardImport = createFileRoute('/dashboard')()
const LoginLazyImport = createFileRoute('/login')()
const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()
const DashboardLayoutIndexLazyImport = createFileRoute('/dashboard/_layout/')()
const DashboardLayoutProductsLazyImport = createFileRoute(
  '/dashboard/_layout/products',
)()
const DashboardLayoutOrdersLazyImport = createFileRoute(
  '/dashboard/_layout/orders',
)()

// Create/Update Routes

const DashboardRoute = DashboardImport.update({
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const LoginLazyRoute = LoginLazyImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/login.lazy').then((d) => d.Route))

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const DashboardLayoutRoute = DashboardLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardLayoutIndexLazyRoute = DashboardLayoutIndexLazyImport.update({
  path: '/',
  getParentRoute: () => DashboardLayoutRoute,
} as any).lazy(() =>
  import('./routes/dashboard/_layout.index.lazy').then((d) => d.Route),
)

const DashboardLayoutProductsLazyRoute =
  DashboardLayoutProductsLazyImport.update({
    path: '/products',
    getParentRoute: () => DashboardLayoutRoute,
  } as any).lazy(() =>
    import('./routes/dashboard/_layout.products.lazy').then((d) => d.Route),
  )

const DashboardLayoutOrdersLazyRoute = DashboardLayoutOrdersLazyImport.update({
  path: '/orders',
  getParentRoute: () => DashboardLayoutRoute,
} as any).lazy(() =>
  import('./routes/dashboard/_layout.orders.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/_layout': {
      id: '/dashboard/_layout'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardLayoutImport
      parentRoute: typeof DashboardRoute
    }
    '/dashboard/_layout/orders': {
      id: '/dashboard/_layout/orders'
      path: '/orders'
      fullPath: '/dashboard/orders'
      preLoaderRoute: typeof DashboardLayoutOrdersLazyImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/dashboard/_layout/products': {
      id: '/dashboard/_layout/products'
      path: '/products'
      fullPath: '/dashboard/products'
      preLoaderRoute: typeof DashboardLayoutProductsLazyImport
      parentRoute: typeof DashboardLayoutImport
    }
    '/dashboard/_layout/': {
      id: '/dashboard/_layout/'
      path: '/'
      fullPath: '/dashboard/'
      preLoaderRoute: typeof DashboardLayoutIndexLazyImport
      parentRoute: typeof DashboardLayoutImport
    }
  }
}

// Create and export the route tree

interface DashboardLayoutRouteChildren {
  DashboardLayoutOrdersLazyRoute: typeof DashboardLayoutOrdersLazyRoute
  DashboardLayoutProductsLazyRoute: typeof DashboardLayoutProductsLazyRoute
  DashboardLayoutIndexLazyRoute: typeof DashboardLayoutIndexLazyRoute
}

const DashboardLayoutRouteChildren: DashboardLayoutRouteChildren = {
  DashboardLayoutOrdersLazyRoute: DashboardLayoutOrdersLazyRoute,
  DashboardLayoutProductsLazyRoute: DashboardLayoutProductsLazyRoute,
  DashboardLayoutIndexLazyRoute: DashboardLayoutIndexLazyRoute,
}

const DashboardLayoutRouteWithChildren = DashboardLayoutRoute._addFileChildren(
  DashboardLayoutRouteChildren,
)

interface DashboardRouteChildren {
  DashboardLayoutRoute: typeof DashboardLayoutRouteWithChildren
}

const DashboardRouteChildren: DashboardRouteChildren = {
  DashboardLayoutRoute: DashboardLayoutRouteWithChildren,
}

const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/login': typeof LoginLazyRoute
  '/dashboard': typeof DashboardLayoutRouteWithChildren
  '/dashboard/orders': typeof DashboardLayoutOrdersLazyRoute
  '/dashboard/products': typeof DashboardLayoutProductsLazyRoute
  '/dashboard/': typeof DashboardLayoutIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/login': typeof LoginLazyRoute
  '/dashboard': typeof DashboardLayoutIndexLazyRoute
  '/dashboard/orders': typeof DashboardLayoutOrdersLazyRoute
  '/dashboard/products': typeof DashboardLayoutProductsLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/about': typeof AboutLazyRoute
  '/login': typeof LoginLazyRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/dashboard/_layout': typeof DashboardLayoutRouteWithChildren
  '/dashboard/_layout/orders': typeof DashboardLayoutOrdersLazyRoute
  '/dashboard/_layout/products': typeof DashboardLayoutProductsLazyRoute
  '/dashboard/_layout/': typeof DashboardLayoutIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/login'
    | '/dashboard'
    | '/dashboard/orders'
    | '/dashboard/products'
    | '/dashboard/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/login'
    | '/dashboard'
    | '/dashboard/orders'
    | '/dashboard/products'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/login'
    | '/dashboard'
    | '/dashboard/_layout'
    | '/dashboard/_layout/orders'
    | '/dashboard/_layout/products'
    | '/dashboard/_layout/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AboutLazyRoute: typeof AboutLazyRoute
  LoginLazyRoute: typeof LoginLazyRoute
  DashboardRoute: typeof DashboardRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AboutLazyRoute: AboutLazyRoute,
  LoginLazyRoute: LoginLazyRoute,
  DashboardRoute: DashboardRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/login",
        "/dashboard"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/about": {
      "filePath": "about.lazy.tsx"
    },
    "/login": {
      "filePath": "login.lazy.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard",
      "children": [
        "/dashboard/_layout"
      ]
    },
    "/dashboard/_layout": {
      "filePath": "dashboard/_layout.tsx",
      "parent": "/dashboard",
      "children": [
        "/dashboard/_layout/orders",
        "/dashboard/_layout/products",
        "/dashboard/_layout/"
      ]
    },
    "/dashboard/_layout/orders": {
      "filePath": "dashboard/_layout.orders.lazy.tsx",
      "parent": "/dashboard/_layout"
    },
    "/dashboard/_layout/products": {
      "filePath": "dashboard/_layout.products.lazy.tsx",
      "parent": "/dashboard/_layout"
    },
    "/dashboard/_layout/": {
      "filePath": "dashboard/_layout.index.lazy.tsx",
      "parent": "/dashboard/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
