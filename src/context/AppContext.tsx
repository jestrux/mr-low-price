import { createContext, useContext, ReactNode, useState, useMemo, useEffect } from 'react'
import simuData from '../data/phones'
import viooData from '../data/vioo'

export interface Phone {
  type: string
  brand: string
  model: string
  price: number
}

export interface CartItem {
  phone: Phone
  quantity: number
}

interface AppContextType {
  phoneData: Phone[]
  allPhoneData: Phone[]
  formatPrice: (price: number) => string
  cart: CartItem[]
  addToCart: (phone: Phone) => void
  updateCartQuantity: (phone: Phone, quantity: number) => void
  removeFromCart: (phone: Phone) => void
  selectedType: string | null
  setSelectedType: (type: string | null) => void
  availableTypes: string[]
  toggleItemSelection: (phone: Phone) => void
  isItemSelected: (phone: Phone) => boolean
  clearCart: () => void
  recentSearches: Phone[]
  addToRecentSearches: (phone: Phone) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Combine data from both files and filter out items with null prices
const allPhoneData: Phone[] = [...simuData, ...viooData].filter(
  (item): item is Phone => item.price !== null && item.price !== undefined
)

export function AppProvider({ children }: { children: ReactNode }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ').format(price)
  }

  // Get unique types
  const availableTypes = useMemo(() => {
    const uniqueTypes = new Set<string>()
    allPhoneData.forEach((phone) => uniqueTypes.add(phone.type))
    return Array.from(uniqueTypes).sort()
  }, [])

  const [selectedType, setSelectedType] = useState<string | null>(null)

  // Initialize cart from session storage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = sessionStorage.getItem('cart')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return []
      }
    }
    return []
  })

  // Sync cart to session storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Initialize recent searches from localStorage
  const [recentSearches, setRecentSearches] = useState<Phone[]>(() => {
    const stored = localStorage.getItem('recentSearches')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        return []
      }
    }
    return []
  })

  // Sync recent searches to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches))
  }, [recentSearches])

  // Add phone to recent searches (max 10 items, no duplicates)
  const addToRecentSearches = (phone: Phone) => {
    setRecentSearches((prev) => {
      // Remove if already exists
      const filtered = prev.filter(
        (item) => !(item.brand === phone.brand && item.model === phone.model && item.type === phone.type)
      )
      // Add to beginning, limit to 10 items
      return [phone, ...filtered].slice(0, 10)
    })
  }

  // Filter data by selected type
  const phoneData = useMemo(() => {
    if (!selectedType) return allPhoneData
    return allPhoneData.filter((phone) => phone.type === selectedType)
  }, [selectedType])

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

  const clearCart = () => {
    setCart([])
  }

  const toggleItemSelection = (phone: Phone) => {
    const existingItem = cart.find(
      (item) => item.phone.brand === phone.brand && item.phone.model === phone.model
    )

    if (existingItem) {
      // Remove from cart if already selected
      removeFromCart(phone)
    } else {
      // Add to cart with quantity 1
      addToCart(phone)
    }
  }

  const isItemSelected = (phone: Phone) => {
    return cart.some(
      (item) => item.phone.brand === phone.brand && item.phone.model === phone.model
    )
  }

  return (
    <AppContext.Provider value={{
      phoneData,
      allPhoneData,
      formatPrice,
      cart,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      selectedType,
      setSelectedType,
      availableTypes,
      toggleItemSelection,
      isItemSelected,
      clearCart,
      recentSearches,
      addToRecentSearches
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
