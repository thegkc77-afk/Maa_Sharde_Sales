import React from 'react'
import { useNavigate } from 'react-router-dom'
import { products, categories, brands } from '../data/mockData'
import { useCartStore } from '../store/useCartStore'
import { useUserStore } from '../store/useUserStore'
import { FeatureCard } from '../components/product/FeatureCard'
import { CategoryCard } from '../components/product/CategoryCard'
import { BrandCard } from '../components/product/BrandCard'
import { ProductCard } from '../components/product/ProductCard'
import { Banner } from '../components/product/Banner'
import LeftHeroSection from '../assets/LeftHeroSection.png'
import saleBannerBg from '../assets/sale_banner_photo_bg.png'
import diyBannerAsset from '../assets/diy_banner_asset.png'
import contractorBannerAsset from '../assets/contractor_banner_asset.png'


export const Home = () => {
  const navigate = useNavigate()
  const { addToCart } = useCartStore()
  const { wishlistItems, toggleWishlistItem } = useUserStore()

  // Get top 4 featured products
  const featuredProducts = products.filter(p => p.isProGrade || p.isSale).slice(0, 4)

  const handleAddToCart = (id) => {
    const product = products.find(p => p.id === id)
    if (product) {
      addToCart(product, 1)
    }
  }

  const handleToggleWishlist = (id) => {
    toggleWishlistItem(id)
  }

  return (
    <div className="w-full bg-background pb-16">
      {/* 1. Hero Banner Grid Section (560px height constraints) */}
      <div className="w-full max-w-[1320px] mx-auto px-10 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Promo Banner (Spans 8 columns on desktop) */}
          <div className="lg:col-span-8 bg-white rounded-[20px] overflow-hidden p-8 sm:p-12 relative flex flex-col justify-center text-text-dark h-[360px] sm:h-[480px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100/60">
            <div className="max-w-[480px] relative z-10">
              <span className="text-[#0F2C59] text-xs font-extrabold uppercase tracking-widest leading-none">
                Top Quality Products
              </span>
              <h1 className="text-3xl sm:text-4.5xl lg:text-[52px] font-extrabold tracking-tight mt-4 text-[#0F2C59] leading-[1.05]">
                THE BEST <br />
                <span className="text-[#F97316]">PLUMBING SUPPLY</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-5 leading-relaxed max-w-[420px]">
                We provide the best plumbing products for your home, business and industrial needs. Trusted brands, unbeatable prices and fast delivery.
              </p>
              <div className="flex flex-wrap items-center gap-6 mt-8">
                <button
                  onClick={() => navigate('/categories/all')}
                  className="bg-[#0F2C59] text-white hover:bg-[#F97316] font-bold text-xs sm:text-sm px-8 py-3.5 rounded-[8px] shadow-md transition-all duration-300"
                >
                  SHOP NOW
                </button>
                <button
                  onClick={() => navigate('/categories/all')}
                  className="flex items-center gap-3 text-[#0F2C59] hover:text-[#F97316] font-bold text-xs sm:text-sm transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-[#F97316] group-hover:scale-105 transition-transform flex-shrink-0">
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                  </div>
                  <span>View Categories</span>
                </button>
              </div>
            </div>
            {/* Background Hero Image */}
            <img
              src={LeftHeroSection}
              alt="Plumbing Supplies"
              className="absolute right-0 bottom-0  h-full w-auto object-contain object-right pointer-events-none select-none z-0 opacity-20 md:opacity-100 block"
            />
          </div>

          {/* Secondary Flash Sale Banner (Spans 4 columns) */}
          <div className="lg:col-span-4 bg-[#0F2C59] rounded-[20px] overflow-hidden flex flex-col justify-between text-white h-[360px] sm:h-[480px] relative shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100/10">
            {/* Blueprint Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 z-0 mix-blend-overlay"
              style={{ backgroundImage: `url(${saleBannerBg})` }}
            />

            {/* Top Text Content */}
            <div className="p-8 relative z-10 flex flex-col gap-1">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase leading-none">
                SEASON <br />
                <span className="text-[#F97316]">SALE</span> <br />
                <span className="text-xs font-semibold tracking-wider text-gray-300">ON ALL SUPPLIES</span>
              </h2>
            </div>

            {/* Diagonal Orange Bottom Section */}
            <div
              className="absolute inset-0 bg-[#F97316] z-0"
              style={{ clipPath: 'polygon(0 55%, 100% 35%, 100% 100%, 0 100%)' }}
            />

            {/* Bottom Content (Inside the Orange Area) */}
            <div className="p-8 pt-0 pb-10 relative z-10 flex flex-col gap-4 mt-auto">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F2C59]/80">UP TO</span>
                <span className="text-5xl font-black text-white leading-none">50% <span className="text-2xl font-bold uppercase">OFF</span></span>
              </div>
              <button
                onClick={() => navigate('/deals')}
                className="w-full bg-white text-[#F97316] hover:bg-[#0F2C59] hover:text-white font-bold text-sm py-3.5 rounded-[8px] transition-colors shadow-md"
              >
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Horizontal Trust Features Row */}
      <div className="w-full max-w-[1320px] mx-auto px-10 pt-10">
        <div className="bg-white rounded-[16px] border border-gray-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.015)] p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-gray-100">
          {/* Feature 1 */}
          <div className="flex items-center gap-4 px-4">
            <div className="w-12 h-12 rounded-full bg-[#0F2C59]/5 text-[#0F2C59] flex items-center justify-center flex-shrink-0 select-none">
              <span className="material-symbols-outlined text-2xl font-bold">local_shipping</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#0F2C59] leading-tight">Free Shipping</span>
              <span className="text-xs text-gray-400 mt-1">On orders over $150</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-4 px-4">
            <div className="w-12 h-12 rounded-full bg-[#0F2C59]/5 text-[#0F2C59] flex items-center justify-center flex-shrink-0 select-none">
              <span className="material-symbols-outlined text-2xl font-bold">cached</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#0F2C59] leading-tight">Easy Returns</span>
              <span className="text-xs text-gray-400 mt-1">30-day return policy</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-4 px-4">
            <div className="w-12 h-12 rounded-full bg-[#0F2C59]/5 text-[#0F2C59] flex items-center justify-center flex-shrink-0 select-none">
              <span className="material-symbols-outlined text-2xl font-bold">credit_card</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#0F2C59] leading-tight">Secure Payment</span>
              <span className="text-xs text-gray-400 mt-1">100% secure checkout</span>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex items-center gap-4 px-4">
            <div className="w-12 h-12 rounded-full bg-[#0F2C59]/5 text-[#0F2C59] flex items-center justify-center flex-shrink-0 select-none">
              <span className="material-symbols-outlined text-2xl font-bold">support_agent</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#0F2C59] leading-tight">Expert Support</span>
              <span className="text-xs text-gray-400 mt-1">24/7 customer support</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Browse by Department Category Grid */}
      <div className="w-full max-w-[1320px] mx-auto px-10 pt-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold text-secondary uppercase tracking-widest leading-none">
              Visual Browse
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-text-dark tracking-tight mt-1">
              Shop by Department
            </h2>
          </div>
          <button
            onClick={() => navigate('/categories/all')}
            className="text-xs font-bold text-primary hover:text-secondary hover:underline transition-colors uppercase tracking-wider"
          >
            See All Categories
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              title={cat.name}
              imageSrc={cat.image}
              itemCount={cat.count}
              variant="square"
              onClick={() => navigate(`/categories/${cat.id}`)}
            />
          ))}
        </div>
      </div>

      {/* 4. Trending & Featured Products Carousel Grid */}
      <div className="w-full max-w-[1320px] mx-auto px-10 pt-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold text-secondary uppercase tracking-widest leading-none">
              High Converting Products
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-text-dark tracking-tight mt-1">
              Trending Pro Fixtures
            </h2>
          </div>
          <button
            onClick={() => navigate('/categories/all')}
            className="text-xs font-bold text-primary hover:text-secondary hover:underline transition-colors uppercase tracking-wider"
          >
            View Full Inventory
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              originalPrice={product.originalPrice}
              imageSrc={product.imageSrc}
              rating={product.rating}
              reviewCount={product.reviewCount}
              isProGrade={product.isProGrade}
              isSale={product.isSale}
              sku={product.sku}
              specifications={product.specifications}
              isWishlisted={wishlistItems.includes(product.id)}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
        </div>
      </div>

      {/* 5. Promotional Action Double Banners */}
      <div className="w-full max-w-[1320px] mx-auto px-10 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Banner
            title="Need Help Finding The Right Fit?"
            subtitle="Connect with our live plumbing support team to cross-reference faucet configurations and pipe connections. Avoid project stalling."
            buttonText="Speak with an Expert"
            badgeText="DIY Project Guide"
            variant="dark"
            imageSrc={diyBannerAsset}
            onButtonClick={() => navigate('/support')}
          />
          <Banner
            title="Are You An Independent Contractor?"
            subtitle="Apply for tax-exempt invoicing, commercial volume price tiers, custom quote creations, and early morning jobsite courier dispatching."
            buttonText="Create Contractor Account"
            badgeText="PRO PORTAL BENEFITS"
            variant="secondary"
            imageSrc={contractorBannerAsset}
            onButtonClick={() => navigate('/account')}
          />
        </div>
      </div>

      {/* 6. Partner Brands Showcase */}
      <div className="w-full max-w-[1320px] mx-auto px-10 pt-16">
        <div className="text-center mb-8">
          <span className="text-xs font-extrabold text-secondary uppercase tracking-widest leading-none">
            Authorized Distributor
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-text-dark tracking-tight mt-1">
            Trusted Manufacturer Brands
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <BrandCard
              key={brand.id}
              brandName={brand.name}
              logoUrl={brand.logo}
              onClick={() => navigate(`/categories/all?brand=${brand.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Home
