import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { TopAppBar } from './components/layout/TopAppBar'
import { GlobalHeader } from './components/layout/GlobalHeader'
import { StickyNavBar } from './components/layout/StickyNavBar'
import { Footer } from './components/layout/Footer'
import { MiniCart } from './components/cart/MiniCart'

// Pages
import { Home } from './pages/Home'
import { CategoryBrowse } from './pages/CategoryBrowse'
import { ProductListing } from './pages/ProductListing'
import { ProductDetails } from './pages/ProductDetails'
import { CartPage } from './pages/CartPage'
import { Checkout } from './pages/Checkout'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Support } from './pages/Support'
import { TrackOrder } from './pages/TrackOrder'
import { Account } from './pages/Account'

import './App.css'

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-background font-sans antialiased text-text-dark">
        {/* Layout Headers */}
        <TopAppBar />
        <GlobalHeader />
        <StickyNavBar />

        {/* Dynamic Pages */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<CategoryBrowse />} />
            <Route path="/categories/:categoryId" element={<ProductListing />} />
            <Route path="/categories/:categoryId/:productId" element={<ProductDetails />} />
            <Route path="/deals" element={<ProductListing />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/support" element={<Support />} />
            <Route path="/track-order" element={<TrackOrder />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Floating overlays & cart sliders */}
        <MiniCart />

        {/* Structural Footer */}
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App
