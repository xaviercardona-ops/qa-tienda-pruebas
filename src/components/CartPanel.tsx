"use client";

import { CartItem } from "@/lib/types";
import { formatCOP } from "@/lib/format";

export default function CartPanel({
  cart,
  subtotal,
  iva,
  discountPct,
  discountAmount,
  discountCode,
  discountMessage,
  total,
  onQtyChange,
  onRemove,
  onDiscountCodeChange,
  onApplyDiscount,
  onCheckout,
}: {
  cart: CartItem[];
  subtotal: number;
  iva: number;
  discountPct: number;
  discountAmount: number;
  discountCode: string;
  discountMessage: string;
  total: number;
  onQtyChange: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onDiscountCodeChange: (value: string) => void;
  onApplyDiscount: () => void;
  onCheckout: () => void;
}) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <h2 className="mb-4 text-lg font-semibold">Carrito</h2>

      {cart.length === 0 ? (
        <p className="text-sm text-neutral-500">Tu carrito está vacío.</p>
      ) : (
        <ul className="mb-4 space-y-3">
          {cart.map((item) => (
            <li key={item.id} className="flex items-center justify-between gap-2 text-sm">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-neutral-500">{formatCOP(item.price)} c/u</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onQtyChange(item.id, -1)}
                  className="h-6 w-6 rounded border border-neutral-300 text-neutral-600"
                  aria-label={`Disminuir cantidad de ${item.name}`}
                >
                  −
                </button>
                <span className="w-6 text-center">{item.qty}</span>
                <button
                  onClick={() => onQtyChange(item.id, 1)}
                  className="h-6 w-6 rounded border border-neutral-300 text-neutral-600"
                  aria-label={`Aumentar cantidad de ${item.name}`}
                >
                  +
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  className="ml-2 text-neutral-400 hover:text-red-500"
                  aria-label={`Eliminar ${item.name}`}
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Código de descuento"
          value={discountCode}
          onChange={(e) => onDiscountCodeChange(e.target.value)}
          className="flex-1 rounded border border-neutral-300 px-2 py-1.5 text-sm"
        />
        <button
          onClick={onApplyDiscount}
          className="rounded border border-neutral-300 px-3 py-1.5 text-sm hover:bg-neutral-100"
        >
          Aplicar
        </button>
      </div>
      {discountMessage && (
        <p className="mb-4 text-xs text-neutral-500">{discountMessage}</p>
      )}

      <dl className="space-y-1 border-t border-neutral-200 pt-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-neutral-500">Subtotal</dt>
          <dd>{formatCOP(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-neutral-500">
            Descuento ({Math.round(discountPct * 100)}%)
          </dt>
          <dd>− {formatCOP(discountAmount)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-neutral-500">IVA (19%)</dt>
          <dd>{formatCOP(iva)}</dd>
        </div>
        <div className="flex justify-between border-t border-neutral-200 pt-2 text-base font-semibold">
          <dt>Total</dt>
          <dd>{formatCOP(total)}</dd>
        </div>
      </dl>

      <button
        onClick={onCheckout}
        disabled={cart.length === 0}
        className="mt-4 w-full rounded bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-300"
      >
        Ir a pagar
      </button>
    </div>
  );
}
