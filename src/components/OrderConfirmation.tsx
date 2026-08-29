"use client";

import { OrderSummary } from "@/lib/types";
import { formatCOP } from "@/lib/format";

export default function OrderConfirmation({
  order,
  onBackToShop,
}: {
  order: OrderSummary;
  onBackToShop: () => void;
}) {
  return (
    <div className="mx-auto max-w-md rounded-lg border border-neutral-200 bg-white p-6 text-center">
      <div className="mb-2 text-4xl">✅</div>
      <h2 className="mb-1 text-lg font-semibold">¡Pedido confirmado!</h2>
      <p className="mb-4 text-sm text-neutral-500">
        Número de pedido: <span className="font-mono font-semibold">#{order.orderNumber}</span>
      </p>

      <ul className="mb-4 space-y-1 text-left text-sm">
        {order.items.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>
              {item.name} × {item.qty}
            </span>
            <span>{formatCOP(item.price * item.qty)}</span>
          </li>
        ))}
      </ul>

      <dl className="mb-4 space-y-1 border-t border-neutral-200 pt-3 text-left text-sm">
        <div className="flex justify-between">
          <dt className="text-neutral-500">Subtotal</dt>
          <dd>{formatCOP(order.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-neutral-500">Descuento</dt>
          <dd>− {formatCOP(order.discountAmount)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-neutral-500">IVA</dt>
          <dd>{formatCOP(order.iva)}</dd>
        </div>
        <div className="flex justify-between text-base font-semibold">
          <dt>Total pagado</dt>
          <dd>{formatCOP(order.total)}</dd>
        </div>
      </dl>

      <p className="mb-4 text-xs text-neutral-500">
        Enviaremos tu pedido a {order.customer.address || "—"}.
      </p>

      <button
        onClick={onBackToShop}
        className="w-full rounded bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-700"
      >
        Volver a la tienda
      </button>
    </div>
  );
}
