import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FilterProvider } from './context/FilterContext'
import Layout from './components/layout/Layout'
import LoadingSpinner from './components/ui/LoadingSpinner'
import ScrollToTop from './components/utils/ScrollToTop'
import './App.css'

// Lazy load pages for performance optimization
const HomePage = lazy(() => import('./pages/HomePage'))
const ExplorePage = lazy(() => import('./pages/ExplorePage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const BookingPage = lazy(() => import('./pages/BookingPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const MissionPage = lazy(() => import('./pages/MissionPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <FilterProvider>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="explore" element={<ExplorePage />} />
              <Route path="products/:id" element={<ProductDetailPage />} />
              <Route path="book/:id" element={<BookingPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="mission" element={<MissionPage />} />
              <Route path="contact" element={<ContactPage />} />

            </Route>
          </Routes>
        </Suspense>
      </FilterProvider>
    </BrowserRouter>
  )
}

export default App
