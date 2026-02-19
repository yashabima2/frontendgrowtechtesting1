"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductCard({ subcategory }) {
  const router = useRouter();

  // ✅ Guard wajib (penting untuk Next build)
  if (!subcategory) return null;

  const handleViewProducts = () => {
    if (!subcategory?.id) return;
    router.push(`/products?subcategory=${subcategory.id}`);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <Image
          src={subcategory?.image_url || "/placeholder.png"}
          alt={subcategory?.name || "Subcategory"}
          width={300}
          height={200}
          className="rounded-xl"
        />
      </div>

      <div className="product-info">
        <h3>{subcategory?.name}</h3>
        <p>{subcategory?.provider}</p>

        <button onClick={handleViewProducts}>
          Lihat Produk
        </button>
      </div>
    </div>
  );
}
