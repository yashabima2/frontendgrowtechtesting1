"use client"

import { useState } from "react"
import { 
  DollarSign, 
  Users, 
  Package, 
  Boxes,
  Filter
} from "lucide-react"
import TransactionChart from "../../components/admin/cards/TransactionChart"
import TransactionCard from "../../components/admin/cards/TransactionCard"
import StatCard from "../../components/admin/cards/StatCard"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { Button } from "../../components/ui/button"

export default function DashboardPage() {
  const [transactionFilter, setTransactionFilter] = useState("hari")

  return (
    <div className="min-h-screen bg-background p-4 lg:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white lg:text-3xl">Dashboard Admin</h1>
        <p className="text-gray-400">Halo, Selamat datang Ravi</p>
      </div>

      {/* Statistik Transaksi */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-bold text-white">Statistik Transaksi</h2>
        <TransactionChart />
      </section>

      {/* Data Transaksi */}
      <section className="mb-8">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-white">Data Transaksi</h2>
          <div className="flex items-center gap-2">
            <Select value={transactionFilter} onValueChange={setTransactionFilter}>
              <SelectTrigger className="w-[100px] border-[#3d2b5e] bg-[#2d1b4e] text-white">
                <SelectValue placeholder="Hari" />
              </SelectTrigger>
              <SelectContent className="border-[#3d2b5e] bg-[#1a1a2e] text-white">
                <SelectItem value="hariini">Hari ini</SelectItem>
                <SelectItem value="7hari">7 hari</SelectItem>
                <SelectItem value="30hari">30 hari</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-[#3d2b5e] bg-[#2d1b4e] text-white hover:bg-[#3d2b5e]">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <TransactionCard count="x90" amount="Rp 300.000" status="berhasil" />
          <TransactionCard count="x25" amount="Rp 300.000" status="pending" />
          <TransactionCard count="x15" amount="Rp 300.000" status="proses" />
          <TransactionCard count="x5" amount="Rp 300.000" status="gagal" />
        </div>
      </section>

      {/* Profit */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-bold text-white">Profit</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard 
            title="Rp 300.000" 
            value="" 
            label="Profit Hari ini" 
            icon={DollarSign} 
          />
          <StatCard 
            title="Rp 300.000" 
            value="" 
            label="Profit Bulan Ini" 
            icon={DollarSign} 
          />
          <StatCard 
            title="Rp 300.000" 
            value="" 
            label="Profit Total" 
            icon={DollarSign} 
          />
        </div>
      </section>

      {/* Data User */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-bold text-white">Data User</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard 
            title="1205" 
            value="" 
            label="Total User" 
            icon={Users} 
          />
          <StatCard 
            title="Rp 150.000.000" 
            value="" 
            label="Total Transaksi" 
            icon={DollarSign} 
          />
          <StatCard 
            title="Rp 150.000.000" 
            value="" 
            label="Total Top Up" 
            icon={DollarSign} 
          />
        </div>
      </section>

      {/* Data Produk */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-bold text-white">Data Produk</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <StatCard 
            title="x90" 
            value="" 
            label="Total Produk Kategori" 
            icon={Boxes} 
          />
          <StatCard 
            title="x7" 
            value="" 
            label="Total Produk" 
            icon={Package} 
          />
        </div>
      </section>
    </div>
  )
}
