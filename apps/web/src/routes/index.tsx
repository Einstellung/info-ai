import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

// Loading component for suspense fallback
const SuspenseLoading = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="text-lg">Loading...</div>
  </div>
)

// Lazy load page components
const Home = lazy(() => import('../pages/home'))
const Canvas = lazy(() => import('../pages/canvas'))

/**
 * AppRouter component that handles all application routes
 * @param props - Component props
 * @param props.layout - Layout component to wrap around routes
 */
export const AppRouter = (props: { layout?: React.ComponentType<any> }) => {
  const { layout: Layout } = props

  // Wrap with layout if provided, otherwise just render routes
  const LayoutWrapper = Layout ? Layout : ({ children }: { children: React.ReactNode }) => <>{children}</>

  return (
    <Suspense fallback={<SuspenseLoading />}>
      <LayoutWrapper>
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home />} />
          
          {/* Canvas route with integrated chat */}
          <Route path="/canvas/:canvasId" element={<Canvas />} />
          
          {/* Fallback to home for unknown routes */}
          <Route path="*" element={<Home />} />
        </Routes>
      </LayoutWrapper>
    </Suspense>
  )
}
