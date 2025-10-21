import { createContext, useContext, ReactNode, useState, useMemo, useEffect } from 'react'

export interface Phone {
  brand: string
  model: string
  price: number
}

export interface PriceCheckerProduct {
  selectedBrand: string
  selectedModel: string
  brands: string[]
  models: Phone[]
  selectedPhone: Phone | null
}

export interface CartItem {
  phone: Phone
  quantity: number
}

interface AppContextType {
  phoneData: Phone[]
  formatPrice: (price: number) => string
  priceChecker: PriceCheckerProduct
  setSelectedBrand: (brand: string) => void
  setSelectedModel: (model: string) => void
  cart: CartItem[]
  addToCart: (phone: Phone) => void
  updateCartQuantity: (phone: Phone, quantity: number) => void
  removeFromCart: (phone: Phone) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const phoneData: Phone[] = [
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

export function AppProvider({ children }: { children: ReactNode }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ').format(price)
  }

  // Get unique brands
  const brands = useMemo(() => {
    const uniqueBrands = new Set<string>()
    phoneData.forEach((phone) => uniqueBrands.add(phone.brand))
    return Array.from(uniqueBrands).sort()
  }, [])

  const [selectedBrand, setSelectedBrand] = useState<string>(brands[0] || '')
  const [selectedModel, setSelectedModel] = useState<string>('')
  const [cart, setCart] = useState<CartItem[]>([])

  // Get models for selected brand
  const models = useMemo(() => {
    if (!selectedBrand) return []
    return phoneData.filter((phone) => phone.brand === selectedBrand)
  }, [selectedBrand])

  // Set first model when brand changes
  useEffect(() => {
    if (models.length > 0) {
      setSelectedModel(models[0].model)
    }
  }, [models])

  // Find selected phone
  const selectedPhone = useMemo(() => {
    if (!selectedBrand || !selectedModel) return null
    return phoneData.find(
      (phone) => phone.brand === selectedBrand && phone.model === selectedModel
    ) || null
  }, [selectedBrand, selectedModel])

  const priceChecker: PriceCheckerProduct = {
    selectedBrand,
    selectedModel,
    brands,
    models,
    selectedPhone
  }

  // Cart functions
  const addToCart = (phone: Phone) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.phone.brand === phone.brand && item.phone.model === phone.model
      )
      if (existingItem) {
        return prevCart.map((item) =>
          item.phone.brand === phone.brand && item.phone.model === phone.model
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { phone, quantity: 1 }]
    })
  }

  const updateCartQuantity = (phone: Phone, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter(
          (item) => !(item.phone.brand === phone.brand && item.phone.model === phone.model)
        )
      }
      return prevCart.map((item) =>
        item.phone.brand === phone.brand && item.phone.model === phone.model
          ? { ...item, quantity }
          : item
      )
    })
  }

  const removeFromCart = (phone: Phone) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.phone.brand === phone.brand && item.phone.model === phone.model)
      )
    )
  }

  return (
    <AppContext.Provider value={{
      phoneData,
      formatPrice,
      priceChecker,
      setSelectedBrand,
      setSelectedModel,
      cart,
      addToCart,
      updateCartQuantity,
      removeFromCart
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
