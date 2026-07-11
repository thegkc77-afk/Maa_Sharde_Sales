import { create } from 'zustand'

export const useCartStore = create((set) => ({
  cartItems: [],
  isCartOpen: false,

  addToCart: (product, quantity = 1) => set((state) => {
    const existingIndex = state.cartItems.findIndex((item) => item.id === product.id)
    if (existingIndex > -1) {
      const updatedItems = [...state.cartItems]
      updatedItems[existingIndex].quantity += quantity
      return { cartItems: updatedItems }
    }
    return { cartItems: [...state.cartItems, { ...product, quantity }] }
  }),

  removeFromCart: (productId) => set((state) => ({
    cartItems: state.cartItems.filter((item) => item.id !== productId)
  })),

  updateQuantity: (productId, quantity) => set((state) => ({
    cartItems: state.cartItems.map((item) => 
      item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    )
  })),

  clearCart: () => set({ cartItems: [] }),

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
}))
