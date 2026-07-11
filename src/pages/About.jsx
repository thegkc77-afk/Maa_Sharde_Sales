import React from 'react'

export const About = () => {
  return (
    <div className="w-full bg-background py-16">
      <div className="w-full max-w-[900px] mx-auto px-10">
        
        {/* Title */}
        <div className="text-center mb-12">
          <span className="text-xs font-extrabold text-secondary uppercase tracking-widest leading-none">
            Corporate Heritage
          </span>
          <h1 className="text-3xl font-extrabold text-text-dark tracking-tight mt-1">
            Our Story & Industry Expertise
          </h1>
          <div className="w-12 h-1 bg-secondary mx-auto mt-4" />
        </div>

        {/* Narrative */}
        <div className="bg-white border border-outline-variant rounded-[16px] p-8 sm:p-10 shadow-sm space-y-6 text-sm text-text-muted leading-relaxed">
          <p>
            Founded in 1998, <strong>Maa Sharde Plumbing Supply</strong> has grown from a local physical trade showroom in Detroit to a nationwide B2C and Pro-contractor eCommerce distribution hub. We have spent over two decades serving homeowners and independent handymen with commercial-grade fixtures and plumbing systems.
          </p>

          <p>
            Our core mission is to <strong>bridge the gap between trade-grade technical specifications and standard consumer shopping</strong>. Homeowners often fear purchasing incorrect dimensions or incompatible connector lines. We eliminate this frustration through guide-driven searching, fitment compatibility bundles, and expert plumber support hotlines.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8 border-y border-outline-variant py-8">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-secondary text-2xl">warehouse</span>
              <div>
                <h4 className="font-bold text-text-dark text-xs uppercase tracking-wide">Physical Showrooms</h4>
                <p className="text-xs mt-1">
                  Visit our distribution centers in Michigan and Ohio. Experience working fixture displays.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-secondary text-2xl">verified</span>
              <div>
                <h4 className="font-bold text-text-dark text-xs uppercase tracking-wide">100% Authorized Stock</h4>
                <p className="text-xs mt-1">
                  We are direct distributors for Kohler, Delta, Moen, and SharkBite. Full warranties apply.
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-base font-bold text-text-dark mt-6 border-b border-outline-variant pb-2">
            Why Choose Plumbers Supply Pro?
          </h3>
          
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li><strong>Technical Facet Search</strong>: Filter inventory by diameter, pressure ratings, materials (PEX, copper, brass), and joint configurations (NPT vs Sweat).</li>
            <li><strong>Pro Contractor Accounts</strong>: Register with your Tax Exemption Certificate to instantly waive regional sales tax and unlock commercial credit lines.</li>
            <li><strong>Pre-packed Bundles</strong>: Buy faucets along with their corresponding rough-in valves, braided steel supply hoses, and plumbers putty inside a single checkbox package.</li>
          </ul>
        </div>

      </div>
    </div>
  )
}
export default About
