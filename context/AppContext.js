"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  // Persistence state
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);

  // UI state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isWishlistSidebarOpen, setIsWishlistSidebarOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem("sf_user"));
      if (user) setCurrentUser(user);
      
      const cart = JSON.parse(localStorage.getItem("sf_cart"));
      if (cart) setCartItems(cart);
      
      const wishlist = JSON.parse(localStorage.getItem("sf_wishlist"));
      if (wishlist) setWishlistItems(wishlist);
      
      const orders = JSON.parse(localStorage.getItem("sf_orders"));
      if (orders) setOrderHistory(orders);
    } catch (e) {
      console.error("Error loading state from localStorage", e);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (currentUser !== null) localStorage.setItem("sf_user", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("sf_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("sf_wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem("sf_orders", JSON.stringify(orderHistory));
  }, [orderHistory]);

  const deliveryFee = 50;

  // UI Actions
  const closeAllOverlays = () => {
    setIsSidebarOpen(false);
    setIsWishlistSidebarOpen(false);
    setIsCartSidebarOpen(false);
    setIsChatSidebarOpen(false);
    setIsAuthModalOpen(false);
  };

  const openSidebar = () => { closeAllOverlays(); setIsSidebarOpen(true); };
  const openWishlist = () => { closeAllOverlays(); setIsWishlistSidebarOpen(true); };
  const openCart = () => { closeAllOverlays(); setIsCartSidebarOpen(true); };
  const openChat = () => { closeAllOverlays(); setIsChatSidebarOpen(true); };
  const openAuth = () => { closeAllOverlays(); setIsAuthModalOpen(true); };
  const openCheckout = () => { closeAllOverlays(); setIsCheckoutModalOpen(true); };

  const closeCheckout = () => setIsCheckoutModalOpen(false);

  // Cart Actions
  const addToCart = (product, size) => {
    setCartItems(prev => [...prev, { ...product, cartId: Date.now(), selectedSize: size || "" }]);
    // We could show a toast here
  };
  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };
  const clearCart = () => setCartItems([]);

  // Wishlist Actions
  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.filter(item => item.id !== product.id);
      return [...prev, product];
    });
  };
  const removeFromWishlist = (id) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };
  const isInWishlist = (id) => wishlistItems.some(item => item.id === id);

  // Auth Actions
  const login = (email, name) => {
    setCurrentUser({ name, email, id: Date.now() });
    setIsAuthModalOpen(false);
  };
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("sf_user");
  };

  // Order Actions
  const addOrder = (order) => {
    setOrderHistory(prev => [order, ...prev]);
  };

  return (
    <AppContext.Provider value={{
      currentUser, cartItems, wishlistItems, orderHistory, deliveryFee,
      isSidebarOpen, isWishlistSidebarOpen, isCartSidebarOpen, isChatSidebarOpen, isAuthModalOpen, isCheckoutModalOpen,
      closeAllOverlays, openSidebar, openWishlist, openCart, openChat, openAuth, openCheckout, closeCheckout,
      addToCart, removeFromCart, clearCart,
      toggleWishlist, removeFromWishlist, isInWishlist,
      login, logout,
      addOrder,
      setIsSidebarOpen, setIsWishlistSidebarOpen, setIsCartSidebarOpen, setIsChatSidebarOpen, setIsAuthModalOpen
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
