"use client";

import { FormEvent, useState } from "react";
import { CustomerInfo } from "@/lib/types";
import { formatCOP } from "@/lib/format";

const EMAIL_REGEX = /^\w+@\w+\.\w+$/;

export default function CheckoutForm({
  customer,
  onChange,
  onSubmit,
  onBack,
  total,
}: {
  customer: CustomerInfo;
  onChange: (customer: CustomerInfo) => void;
  onSubmit: () => void;
  onBack: () => void;
  total: number;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!customer.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    }
    if (!customer.email.trim()) {
      newErrors.email = "El correo es obligatorio.";
    } else if (!EMAIL_REGEX.test(customer.email.trim())) {
      newErrors.email = "El correo no tiene un formato válido.";
    }
    if (!customer.address.trim()) {
      newErrors.address = "La dirección es obligatoria.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSubmit();
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-lg border border-neutral-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold">Datos de envío</h2>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label className="mb-1 block text-sm font-medium">Nombre completo</label>
          <input
            type="text"
            value={customer.name}
            onChange={(e) => onChange({ ...customer, name: e.target.value })}
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Correo electrónico</label>
          <input
            type="text"
            value={customer.email}
            onChange={(e) => onChange({ ...customer, email: e.target.value })}
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Dirección de entrega</label>
          <input
            type="text"
            value={customer.address}
            onChange={(e) => onChange({ ...customer, address: e.target.value })}
            className="w-full rounded border border-neutral-300 px-3 py-2 text-sm"
          />
          {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
        </div>

        <div className="flex items-center justify-between border-t border-neutral-200 pt-4 text-sm font-semibold">
          <span>Total a pagar</span>
          <span>{formatCOP(total)}</span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 rounded border border-neutral-300 px-3 py-2 text-sm hover:bg-neutral-100"
          >
            Volver al carrito
          </button>
          <button
            type="submit"
            className="flex-1 rounded bg-neutral-900 px-3 py-2 text-sm font-medium text-white hover:bg-neutral-700"
          >
            Confirmar pedido
          </button>
        </div>
      </form>
    </div>
  );
}
