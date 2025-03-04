import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom'
import './index.css'

// Lazy load components for better performance
const AppRouter = lazy(() => 
  import('./routes/index').then((module) => ({ default: module.AppRouter }))
)

// Lazy load layout component
const AppLayout = lazy(() => 
  import('./components/layout').then((module) => ({ default: module.AppLayout }))
)

// Loading component for suspense fallback
const SuspenseLoading = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="text-lg">Loading...</div>
  </div>
)

// Main App component
const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00968F',
          borderRadius: 6,
        },
      }}
    >
      <Outlet />
    </ConfigProvider>
  )
}

// Create router with routes
const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
    children: [
      {
        path: '*',
        element: (
          <Suspense fallback={<SuspenseLoading />}>
            <AppRouter layout={AppLayout} />
          </Suspense>
        ),
      },
    ],
  },
])

// Render the app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
