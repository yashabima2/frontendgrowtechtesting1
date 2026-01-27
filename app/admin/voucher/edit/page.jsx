export default function EditVoucher() {
return (
<div className="p-8 max-w-3xl">
<h1 className="text-2xl font-bold mb-6">Edit Voucher</h1>


<div className="border border-purple-700 rounded-xl p-6 grid grid-cols-2 gap-4">
<input className="input col-span-2" defaultValue="PROMO5K" />
<input className="input" defaultValue="5000" />
<input className="input" defaultValue="100000" />
<input className="input" defaultValue="100" />
<input className="input" defaultValue="1" />
<input className="input" defaultValue="2025-01-01" />
<input className="input" defaultValue="2025-12-31" />


<label className="col-span-2 flex items-center gap-2">
<input type="checkbox" defaultChecked /> Tidak bisa digunakan jika sudah ada referral
</label>


<button className="btn-primary col-span-2">Simpan Perubahan</button>
</div>
</div>
)
}