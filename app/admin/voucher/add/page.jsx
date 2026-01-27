export default function AddVoucher() {
return (
<div className="p-8 max-w-3xl">
<h1 className="text-2xl font-bold mb-6">Tambah Voucher</h1>


<div className="border border-purple-700 rounded-xl p-6 grid grid-cols-2 gap-4">
<input className="input col-span-2" placeholder="Kode Voucher" />
<input className="input" placeholder="Nominal Diskon" />
<input className="input" placeholder="Min Transaksi" />
<input className="input" placeholder="Maks Penggunaan Total" />
<input className="input" placeholder="Maks Per User" />
<input className="input" placeholder="Tanggal Mulai" />
<input className="input" placeholder="Tanggal Selesai" />


<label className="col-span-2 flex items-center gap-2">
<input type="checkbox" /> Tidak bisa digunakan jika sudah ada referral
</label>


<button className="btn-primary col-span-2">Tambah</button>
</div>
</div>
)
}