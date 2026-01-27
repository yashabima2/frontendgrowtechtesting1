"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import { Filter } from "lucide-react"
import { useState } from "react"

const chartData = [
  { day: 1, value: 10 },
  { day: 2, value: 58 },
  { day: 3, value: 65 },
  { day: 4, value: 12 },
  { day: 5, value: 62 },
  { day: 6, value: 10 },
  { day: 7, value: 58 },
]

export default function TransactionChart() {
  const [period, setPeriod] = useState("7hari")

  return (
    <div className="rounded-xl border border-[#3d2b5e] bg-[#1a1a2e] p-4 lg:p-6">
      <div className="mb-4 flex items-center justify-end">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[130px] border-[#3d2b5e] bg-[#2d1b4e] text-white">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="7 hari" />
          </SelectTrigger>
          <SelectContent className="border-[#3d2b5e] bg-[#1a1a2e] text-white">
            <SelectItem value="hariini">Hari ini</SelectItem>
            <SelectItem value="7hari">7 Hari</SelectItem>
            <SelectItem value="30hari">30 Hari</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3d2b5e" vertical={false} />
            <XAxis 
              dataKey="day" 
              stroke="#a1a1aa" 
              axisLine={false}
              tickLine={false}
              fontSize={12}
            />
            <YAxis 
              stroke="#a1a1aa" 
              axisLine={false}
              tickLine={false}
              fontSize={12}
              tickFormatter={(value) => `${value}`}
              domain={[0, 80]}
              ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80]}
              label={{ value: 'Juta', angle: -90, position: 'insideLeft', fill: '#a1a1aa', fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1a2e",
                border: "1px solid #3d2b5e",
                borderRadius: "8px",
                color: "#ffffff",
              }}
              formatter={(value) => [`Rp ${value} Juta`, "Transaksi"]}
              labelFormatter={(label) => `Tanggal ${label}`}
            />
            <Line 
              type="linear" 
              dataKey="value" 
              stroke="#ffffff" 
              strokeWidth={2}
              dot={{ fill: "#7c3aed", stroke: "#ffffff", strokeWidth: 2, r: 5 }}
              activeDot={{ fill: "#7c3aed", stroke: "#ffffff", strokeWidth: 2, r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Slider indicator */}
      <div className="mt-4 flex justify-center">
        <div className="flex h-2 w-full max-w-md items-center rounded-full bg-[#2d1b4e]">
          <div className="h-2 w-1/2 rounded-full bg-white/50"></div>
        </div>
      </div>
      <p className="mt-2 text-right text-xs text-gray-400">Tanggal</p>
    </div>
  )
}
