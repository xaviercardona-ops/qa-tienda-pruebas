"use client";

import { useEffect, useState } from "react";
import { PRODUCTS, DISCOUNT_CODES, IVA_RATE } from "@/lib/products";
import { CartItem, CustomerInfo, OrderSummary } from "@/lib/types";
import ProductCatalog from "@/components/ProductCatalog";
import CartPanel from "@/components/CartPanel";
import CheckoutForm from "@/components/CheckoutForm";
import OrderConfirmation from "@/components/OrderConfirmation";

type View = "shop" | "checkout" | "confirmation";

const CART_STORAGE_KEY = "qa-tienda-cart";

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [view, setView] = useState<View>("shop");
  const [discountCode, setDiscountCode] = useState("");
  const [discountPct, setDiscountPct] = useState(0);
  const [discountMessage, setDiscountMessage] = useState("");
  const [customer, setCustomer] = useState<CustomerInfo>({
    name: "",
    email: "",
    address: "",
  });
  const [orderSeq, setOrderSeq] = useState(1);
  const [lastOrder, setLastOrder] = useState<OrderSummary | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from localStorage on mount, required to avoid SSR/client mismatch
        setCart(JSON.parse(stored));
      } catch {
        setCart([]);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart, hydrated]);

  function addToCart(productId: string, qty: number) {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    if (qty > product.stock) {
      alert(`Solo hay ${product.stock} unidades disponibles de ${product.name}.`);
      return;
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.id === productId);
      if (existing) {
        return prev.map((i) =>
          i.id === productId ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty }];
    });
  }

  function updateQty(productId: string, delta: number) {
    setCart((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, qty: i.qty + delta } : i))
    );
  }

  function removeFromCart(productId: string) {
    setCart((prev) => prev.filter((i) => i.id !== productId));
  }

  function applyDiscountCode() {
    const pct = DISCOUNT_CODES[discountCode.trim()];
    if (pct) {
      setDiscountPct(pct);
      setDiscountMessage(`Código aplicado: ${Math.round(pct * 100)}% de descuento.`);
    } else {
      setDiscountPct(0);
      setDiscountMessage("Código de descuento no válido.");
    }
  }

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const iva = subtotal * IVA_RATE;
  const discountAmount = subtotal * discountPct;
  const total = subtotal - discountAmount + iva;

  function goToCheckout() {
    if (cart.length === 0) return;
    setView("checkout");
  }

  function confirmOrder() {
    const orderNumber = 1000 + orderSeq;
    const summary: OrderSummary = {
      orderNumber,
      items: cart,
      subtotal,
      discountPct,
      discountAmount,
      iva,
      total,
      customer,
    };
    setLastOrder(summary);
    setOrderSeq((n) => n + 1);
    setCart([]);
    setDiscountCode("");
    setDiscountPct(0);
    setDiscountMessage("");
    setView("confirmation");
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-semibold">🏫 QA Tienda Escolar</h1>
          {view === "shop" && (
            <div className="text-sm text-neutral-600">
              🛒 {cart.reduce((n, i) => n + i.qty, 0)} artículo(s)
            </div>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {view === "shop" && (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ProductCatalog products={PRODUCTS} onAdd={addToCart} />
            </div>
            <div>
              <CartPanel
                cart={cart}
                subtotal={subtotal}
                iva={iva}
                discountPct={discountPct}
                discountAmount={discountAmount}
                discountCode={discountCode}
                discountMessage={discountMessage}
                total={total}
                onQtyChange={updateQty}
                onRemove={removeFromCart}
                onDiscountCodeChange={setDiscountCode}
                onApplyDiscount={applyDiscountCode}
                onCheckout={goToCheckout}
              />
            </div>
          </div>
        )}

        {view === "checkout" && (
          <CheckoutForm
            customer={customer}
            onChange={setCustomer}
            onSubmit={confirmOrder}
            onBack={() => setView("shop")}
            total={total}
          />
        )}

        {view === "confirmation" && lastOrder && (
          <OrderConfirmation order={lastOrder} onBackToShop={() => setView("shop")} />
        )}
      </main>
    </div>
  );
}
