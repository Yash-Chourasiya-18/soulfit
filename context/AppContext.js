"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  // Persistence state
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [savedAddresses, setSavedAddresses] = useState([]);

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

      const cards = JSON.parse(localStorage.getItem("sf_cards"));
      if (cards) setSavedCards(cards);

      const addresses = JSON.parse(localStorage.getItem("sf_addresses"));
      if (addresses) setSavedAddresses(addresses);
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

  useEffect(() => {
    localStorage.setItem("sf_cards", JSON.stringify(savedCards));
  }, [savedCards]);

  useEffect(() => {
    localStorage.setItem("sf_addresses", JSON.stringify(savedAddresses));
  }, [savedAddresses]);

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
  const login = (email, name, phone) => {
    setCurrentUser({ name, email, phone, id: Date.now() });
    setIsAuthModalOpen(false);
  };
  const updateProfile = (updatedUser) => {
    setCurrentUser(prev => ({ ...prev, ...updatedUser }));
  };
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("sf_user");
  };

  // Order Actions
  const addOrder = (order) => {
    setOrderHistory(prev => [order, ...prev]);
  };

  // Card Actions
  const addCard = (card) => {
    setSavedCards(prev => [...prev, { ...card, id: Date.now() }]);
  };
  const removeCard = (id) => {
    setSavedCards(prev => prev.filter(c => c.id !== id));
  };

  // Address Actions
  const addAddress = (address) => {
    setSavedAddresses(prev => [...prev, { ...address, id: Date.now() }]);
  };
  const removeAddress = (id) => {
    setSavedAddresses(prev => prev.filter(a => a.id !== id));
  };

  return (
    <AppContext.Provider value={{
      currentUser, cartItems, wishlistItems, orderHistory, deliveryFee,
      isSidebarOpen, isWishlistSidebarOpen, isCartSidebarOpen, isChatSidebarOpen, isAuthModalOpen, isCheckoutModalOpen,
      closeAllOverlays, openSidebar, openWishlist, openCart, openChat, openAuth, openCheckout, closeCheckout,
      addToCart, removeFromCart, clearCart,
      toggleWishlist, removeFromWishlist, isInWishlist,
      login, logout, updateProfile,
      addOrder, addCard, removeCard, savedCards,
      addAddress, removeAddress, savedAddresses,
      setIsSidebarOpen, setIsWishlistSidebarOpen, setIsCartSidebarOpen, setIsChatSidebarOpen, setIsAuthModalOpen
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
