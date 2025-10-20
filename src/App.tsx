import { useState, useMemo } from 'react'

const phoneData = [
  { brand: "OPPO & VIVO", model: "A59", price: 15000 },
  { brand: "OPPO & VIVO", model: "A15", price: 17000 },
  { brand: "OPPO & VIVO", model: "A54", price: 17500 },
  { brand: "OPPO & VIVO", model: "A5/A35", price: 17000 },
  { brand: "OPPO & VIVO", model: "Realme 7i", price: 18000 },
  { brand: "OPPO & VIVO", model: "Z7x", price: 18000 },
  { brand: "OPPO & VIVO", model: "C55", price: 19000 },
  { brand: "OPPO & VIVO", model: "K11", price: 19000 },
  { brand: "OPPO & VIVO", model: "Y67", price: 17000 },
  { brand: "OPPO & VIVO", model: "A11x", price: 17000 },
  { brand: "OPPO & VIVO", model: "Y20", price: 17000 },
  { brand: "OPPO & VIVO", model: "Y22", price: 17000 },
  { brand: "OPPO & VIVO", model: "A52", price: 17000 },
  { brand: "OPPO & VIVO", model: "A12", price: 17000 },
  { brand: "OPPO & VIVO", model: "A1k", price: 17000 },
  { brand: "OPPO & VIVO", model: "A16", price: 15000 },
  { brand: "OPPO & VIVO", model: "A57", price: 17000 },
  { brand: "OPPO & VIVO", model: "Y82", price: 17000 },
  { brand: "OPPO & VIVO", model: "Y85", price: 17000 },
  { brand: "OPPO & VIVO", model: "F11 Pro", price: 17000 },
  { brand: "OPPO & VIVO", model: "A7", price: 17000 },
  { brand: "OPPO & VIVO", model: "A3", price: 16000 },
  { brand: "OPPO & VIVO", model: "Y5s", price: 16000 },
  { brand: "OPPO & VIVO", model: "A83", price: 16000 },
  { brand: "OPPO & VIVO", model: "A9/F11", price: 18000 },
  { brand: "OPPO & VIVO", model: "S1", price: 18000 },
  { brand: "OPPO & VIVO", model: "C11", price: 18000 },
  { brand: "NOKIA", model: "C2", price: 19000 },
  { brand: "NOKIA", model: "C1P", price: 17000 },
  { brand: "NOKIA", model: "3.4", price: 17000 },
  { brand: "NOKIA", model: "4.2", price: 17000 },
  { brand: "NOKIA", model: "3.2", price: 17000 },
  { brand: "NOKIA", model: "C21", price: 17500 },
  { brand: "NOKIA", model: "2.4", price: 17500 },
  { brand: "NOKIA", model: "2.2", price: 17500 },
  { brand: "NOKIA", model: "2.4P", price: 17000 },
  { brand: "NOKIA", model: "G10", price: 17000 },
  { brand: "NOKIA", model: "G1.2ND", price: 17000 },
  { brand: "NOKIA", model: "2.3", price: 17000 },
  { brand: "VIOO VIDOGO", model: "17 Big", price: 2800 },
  { brand: "VIOO VIDOGO", model: "37 Big", price: 2850 },
  { brand: "VIOO VIDOGO", model: "37 Small", price: 2450 },
  { brand: "VIOO VIDOGO", model: "24 Small", price: 2450 },
  { brand: "VIOO VIDOGO", model: "16 Pin", price: 1750 },
  { brand: "VIOO VIDOGO", model: "20 Pin", price: 1750 },
  { brand: "VIOO VIDOGO", model: "16 Pin / 302", price: 2450 },
  { brand: "VIOO VIDOGO", model: "12 Pin", price: 2000 },
  { brand: "VIOO VIDOGO", model: "MIC", price: 70 },
  { brand: "VIOO VIDOGO", model: "System Charge", price: 70 },
  { brand: "SAMSUNG (OLED)", model: "Note 10+", price: 150000 },
  { brand: "SAMSUNG (OLED)", model: "Note 20 Ultra", price: 170000 },
  { brand: "SAMSUNG (OLED)", model: "S20 Ultra", price: 165000 },
  { brand: "SAMSUNG (OLED)", model: "S20+", price: 150000 },
  { brand: "SAMSUNG (OLED)", model: "S21 Ultra", price: 170000 },
  { brand: "SAMSUNG (OLED)", model: "S22 Ultra", price: 175000 },
  { brand: "SAMSUNG (OLED)", model: "S22+", price: 160000 },
  { brand: "SAMSUNG (OLED)", model: "S21+", price: 150000 },
  { brand: "SAMSUNG (OLED)", model: "A20", price: 60000 },
  { brand: "SAMSUNG (OLED)", model: "A32", price: 67000 },
  { brand: "SAMSUNG (OLED)", model: "A30", price: 60000 },
  { brand: "SAMSUNG (OLED)", model: "A15", price: 67000 },
  { brand: "SAMSUNG (OLED)", model: "A31", price: 60000 },
  { brand: "REDMI", model: "Redmi 10", price: 17000 },
  { brand: "REDMI", model: "7A", price: 15000 },
  { brand: "REDMI", model: "8A", price: 15000 },
  { brand: "REDMI", model: "9A", price: 17000 },
  { brand: "REDMI", model: "Note 7", price: 17000 },
  { brand: "REDMI", model: "Note 8", price: 17000 },
  { brand: "REDMI", model: "Note 9", price: 17000 },
  { brand: "REDMI", model: "Note 10 5G", price: 18000 },
  { brand: "REDMI", model: "Note 11 4G", price: 18500 },
  { brand: "REDMI", model: "Note 8 Pro", price: 18000 },
  { brand: "REDMI", model: "A1+", price: 18500 },
  { brand: "REDMI", model: "13C", price: 17000 },
  { brand: "iPhone", model: "iPhone 6G", price: 15000 },
  { brand: "iPhone", model: "iPhone 6P", price: 17000 },
  { brand: "iPhone", model: "iPhone 7G", price: 15000 },
  { brand: "iPhone", model: "iPhone 7P", price: 17000 },
  { brand: "iPhone", model: "iPhone 8G", price: 15000 },
  { brand: "iPhone", model: "iPhone 8P", price: 17000 },
  { brand: "iPhone", model: "iPhone X", price: 22000 },
  { brand: "iPhone", model: "iPhone XS", price: 23000 },
  { brand: "iPhone", model: "iPhone XR", price: 23000 },
  { brand: "iPhone", model: "iPhone X GRX", price: 43000 },
  { brand: "iPhone", model: "iPhone 11", price: 25000 },
  { brand: "iPhone", model: "iPhone 11 Pro", price: 36000 },
  { brand: "iPhone", model: "iPhone 11 Pro Max", price: 39000 },
  { brand: "iPhone", model: "iPhone 12", price: 60000 },
  { brand: "iPhone", model: "iPhone 12 Pro", price: 65000 },
  { brand: "iPhone", model: "iPhone 12 Pro Max", price: 65000 },
  { brand: "iPhone", model: "iPhone 13", price: 56000 },
  { brand: "iPhone", model: "iPhone 13 Pro Max", price: 120000 },
  { brand: "iPhone", model: "iPhone 14", price: 56000 },
  { brand: "iPhone", model: "iPhone 14 Pro", price: 170000 },
  { brand: "iPhone", model: "iPhone 14 Pro Max", price: 180000 },
]

function App() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>('vioo')

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ').format(price)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Group phones by brand to add section headers
  const phonesByBrand = useMemo(() => {
    const groups: { [key: string]: typeof phoneData } = {}
    phoneData.forEach((phone) => {
      if (!groups[phone.brand]) {
        groups[phone.brand] = []
      }
      groups[phone.brand].push(phone)
    })
    return groups
  }, [])

  const brandOrder = Object.keys(phonesByBrand)

  const scrollToBrand = (brand: string) => {
    const element = document.getElementById(`brand-${brand}`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-canvas">
      {/* Mobile header */}
      <header className="md:hidden bg-background px-4 pt-4">
        <h1 className="text-2xl font-semibold text-foreground">Massawe Mr. Low Price</h1>
      </header>

      {/* Desktop sticky header */}
      <header className="hidden md:block sticky top-0 z-20 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-foreground">Massawe Mr. Low Price</h1>

          {/* Desktop filters */}
          <div className="flex gap-6">
            <button
              onClick={() => setSelectedFilter('vioo')}
              className={`text-lg font-medium whitespace-nowrap transition-colors ${
                selectedFilter === 'vioo'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Vioo vya Simu
            </button>
            <button
              onClick={() => setSelectedFilter('system-charge')}
              className={`text-lg font-medium whitespace-nowrap transition-colors ${
                selectedFilter === 'system-charge'
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              System Charge
            </button>
          </div>
        </div>
      </header>

      {/* Mobile filters */}
      <div className="md:hidden sticky top-0 bg-background border-b border-border px-4 py-4 z-20 flex gap-6 overflow-x-auto">
        <button
          onClick={() => setSelectedFilter('vioo')}
          className={`text-lg font-medium whitespace-nowrap transition-colors ${
            selectedFilter === 'vioo'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Vioo vya Simu
        </button>
        <button
          onClick={() => setSelectedFilter('system-charge')}
          className={`text-lg font-medium whitespace-nowrap transition-colors ${
            selectedFilter === 'system-charge'
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          System Charge
        </button>
      </div>

      {/* Quick navigation cards */}
      <div className="max-w-4xl mx-auto bg-card">
        <div className="px-4 py-3 bg-muted border-b border-border">
          <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
            Chagua Aina
          </h2>
        </div>
        <div className="px-4 py-4 bg-canvas">
          <div className="grid grid-cols-2 gap-3">
            {brandOrder.map((brand) => (
              <button
                key={brand}
                onClick={() => scrollToBrand(brand)}
                className="px-6 py-5 bg-card border border-border rounded-2xl text-left hover:bg-muted/30 transition-colors"
              >
                <span className="text-base font-semibold text-card-foreground capitalize">{brand.toLowerCase()}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-card pb-24 md:pb-32">
        {brandOrder.map((brand) => (
          <div key={brand}>
            <div className="sticky top-[57px] md:top-[85px] px-4 py-3 bg-muted border-b border-border z-10">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                {brand}
              </h2>
            </div>
            {phonesByBrand[brand].map((phone, index) => (
              <div
                key={index}
                id={index === 0 ? `brand-${brand}` : undefined}
                className="flex items-center justify-between px-4 py-4 border-b border-border transition-colors hover:bg-muted/50"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-card-foreground">{phone.model}</h3>
                </div>
                <div className="text-right ml-4 flex-shrink-0">
                  <div className="text-lg font-semibold text-card-foreground">
                    {/* <span className="text-[11px] text-muted-foreground font-normal mr-1">TSH</span> */}
                    {formatPrice(phone.price)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 md:bottom-6 p-3 md:p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:opacity-90 transition-opacity z-50"
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="md:w-6 md:h-6"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </div>
  )
}

export default App
