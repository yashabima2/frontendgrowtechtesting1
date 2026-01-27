import Image from "next/image";
import ProductCard from "../../components/ProductCard";

export default function ProductPage() {
  return (
    <main className="product-wrapper">
      <h1 className="product-title">Produk</h1>

      <div className="product-layout">
        {/* SIDEBAR */}
        <aside className="product-sidebar">
          <h4>Kategori</h4>
          <button className="active">Semua Kategori</button>
          <button>Cloud Phone</button>
          <button>Proxy</button>
        </aside>

        {/* CONTENT */}
        <section className="product-content">
          {/* TOOLBAR */}
          <div className="product-toolbar text-white">
            <span>Menampilkan semua produk</span>

            <input
              type="text"
              placeholder="Cari Produk"
            />

            <select>
              <option>Terbaru</option>
              <option>Termurah</option>
              <option>Terlaris</option>
            </select>
          </div>

          {/* GRID */}
          <div className="product-grid">
            {Array.from({ length: 9 }).map((_, i) => (
              <ProductCard key={i} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
