// src/hooks/useRecentlyViewed.js
import { useEffect, useState } from "react";

/**
 * Keeps a list of recently viewed product objects in localStorage.
 * Stored shape: [{ _id, name, images: [url], slug, price }, ...]
 */

const STORAGE_KEY = "recent_products_v1";
const MAX_ITEMS = 6;

export function useRecentlyViewed(currentProduct) {
  const [recent, setRecent] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("recent products parse error", e);
      return [];
    }
  });

  useEffect(() => {
    if (!currentProduct || !currentProduct._id) return;

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];

      // Prepare a lightweight product object to store
      const item = {
        _id: currentProduct._id,
        name: currentProduct.name,
        images: currentProduct.images || currentProduct.product_images || [],
        slug: currentProduct.slug || null,
        price: currentProduct?.variants?.[0]?.price || null,
      };

      // Remove existing occurrence
      const filtered = list.filter((p) => p._id !== item._id);
      // Add to front
      filtered.unshift(item);
      // Trim
      const trimmed = filtered.slice(0, MAX_ITEMS);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
      setRecent(trimmed);
    } catch (e) {
      console.error("useRecentlyViewed error", e);
    }
  }, [currentProduct]);

  // Provide a method to manually clear (optional)
  const clear = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRecent([]);
  };

  return { recent, clear };
}
