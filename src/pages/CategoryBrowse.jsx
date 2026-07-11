import React from 'react'
import { useNavigate } from 'react-router-dom'
import { categories } from '../data/mockData'

export const CategoryBrowse = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full bg-background py-12">
      <div className="w-full max-w-[1320px] mx-auto px-10">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs text-text-muted mb-6 uppercase tracking-wider font-semibold">
          <button onClick={() => navigate('/')} className="hover:text-secondary">Home</button>
          <span className="material-symbols-outlined text-[10px]">chevron_right</span>
          <span className="text-text-dark">Departments</span>
        </div>

        {/* Section Title */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-dark tracking-tight">
            Shop Plumbing Departments
          </h1>
          <p className="text-sm text-text-muted mt-2 max-w-[650px] leading-relaxed">
            Browse our full catalog of residential fixtures and commercial-grade piping. Filter by materials, connection designs, and certified finishes.
          </p>
        </div>

        {/* Dual Portal highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Homeowner DIY portal */}
          <div className="bg-surface-lowest border border-outline-variant p-8 rounded-[16px] flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-full bg-surface-high text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">home</span>
              </div>
              <h2 className="text-lg font-bold text-text-dark">DIY Homeowner Portal</h2>
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                Find kitchen taps, modern showerheads, luxury bathroom finishes, and standard repair tools. We provide step-by-step sizing guides and compatible supply hoses.
              </p>
            </div>
            <button
              onClick={() => navigate('/categories/bathroom')}
              className="mt-6 self-start bg-secondary hover:bg-orange-500 text-text-dark font-bold text-xs px-5 py-3 rounded-[10px] transition-colors"
            >
              Browse Fixtures
            </button>
          </div>

          {/* Professional Contractor portal */}
          <div className="bg-primary text-white p-8 rounded-[16px] flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <div className="w-12 h-12 rounded-full bg-surface-high/15 text-secondary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">engineering</span>
              </div>
              <h2 className="text-lg font-bold">Pro Contractor Procurement</h2>
              <p className="text-xs text-gray-300 mt-2 leading-relaxed">
                Source commercial-grade PEX rolls, copper tubing, brass fittings, shutoff gate valves, and professional pipe cutters. Save quotes and download PDF specification sheets.
              </p>
            </div>
            <button
              onClick={() => navigate('/categories/pipes')}
              className="mt-6 self-start bg-white hover:bg-secondary hover:text-text-dark text-primary font-bold text-xs px-5 py-3 rounded-[10px] transition-colors"
            >
              Browse Raw Materials
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div>
          <h3 className="text-sm font-bold text-text-dark uppercase tracking-wider border-b border-outline-variant pb-3 mb-6">
            All Product Divisions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-surface-lowest border border-outline-variant rounded-[10px] overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition-shadow"
              >
                <img
                  src={cat.image}
                  alt=""
                  className="w-full sm:w-1/3 h-40 sm:h-full object-cover"
                />
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="material-symbols-outlined text-primary text-lg">{cat.icon}</span>
                      <h4 className="text-sm font-bold text-text-dark">{cat.name}</h4>
                    </div>
                    <p className="text-[11px] text-text-muted mt-1 leading-snug">
                      High-grade commercial stock, customized fittings, and accessories.
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-4 border-t border-outline-variant/60 pt-3">
                    <span className="text-[11px] text-text-muted font-semibold uppercase">{cat.count} Categories</span>
                    <button
                      onClick={() => navigate(`/categories/${cat.id}`)}
                      className="text-xs font-bold text-secondary hover:text-orange-600 transition-colors uppercase tracking-wider flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default CategoryBrowse
