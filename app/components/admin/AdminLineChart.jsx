'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "1", value: 12 },
  { day: "2", value: 58 },
  { day: "3", value: 66 },
  { day: "4", value: 12 },
  { day: "5", value: 65 },
  { day: "6", value: 13 },
  { day: "7", value: 59 },
];

export default function AdminLineChart() {
  return (
    <div className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <defs>
            <linearGradient id="purpleGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#000000" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="day" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />

          <Tooltip
            contentStyle={{
              background: "#0f0f0f",
              border: "1px solid #7c3aed",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#c4b5fd" }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#ffffff"
            strokeWidth={2}
            dot={{ r: 6, fill: "#ffffff" }}
            activeDot={{ r: 8 }}
            fill="url(#purpleGlow)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
