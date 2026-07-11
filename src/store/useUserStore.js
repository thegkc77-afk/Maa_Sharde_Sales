import { create } from 'zustand'

export const useUserStore = create((set, get) => ({
  userSession: {
    name: 'Guest',
    isProContractor: false,
    taxExemptId: '',
    isLoggedIn: false,
  },
  wishlistItems: [],

  loginUser: (name, isProContractor = false, taxExemptId = '') => set({
    userSession: {
      name,
      isProContractor,
      taxExemptId: isProContractor ? (taxExemptId || 'TX-PRO-7789') : '',
      isLoggedIn: true,
    }
  }),

  logoutUser: () => set({
    userSession: {
      name: 'Guest',
      isProContractor: false,
      taxExemptId: '',
      isLoggedIn: false,
    }
  }),

  toggleWishlistItem: (productId) => set((state) => {
    const isPresent = state.wishlistItems.includes(productId)
    const updated = isPresent
      ? state.wishlistItems.filter((id) => id !== productId)
      : [...state.wishlistItems, productId]
    return { wishlistItems: updated }
  }),

  isWishlisted: (productId) => {
    return get().wishlistItems.includes(productId)
  }
}))
