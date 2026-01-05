import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import ProductDetailPage from './pages/ProductDetailPage'
import BookingPage from './pages/BookingPage'
import AdminPage from './pages/AdminPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="book/:id" element={<BookingPage />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
