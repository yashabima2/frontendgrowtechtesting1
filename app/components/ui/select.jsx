'use client'

import * as React from "react"
import { cn } from "../../lib/utils"

export function Select({ value, onValueChange, children }) {
  return (
    <SelectContext.Provider value={{ value, onValueChange }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  )
}

const SelectContext = React.createContext(null)

export function SelectTrigger({ className, children }) {
  const ctx = React.useContext(SelectContext)

  return (
    <button
      type="button"
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-md border border-white/20 bg-transparent px-3 py-2 text-sm text-white hover:bg-white/10",
        className
      )}
    >
      {children}
    </button>
  )
}

export function SelectValue({ placeholder }) {
  const ctx = React.useContext(SelectContext)

  return (
    <span className="text-sm text-white">
      {ctx?.value || placeholder}
    </span>
  )
}

export function SelectContent({ className, children }) {
  return (
    <div
      className={cn(
        "absolute z-50 mt-1 w-full rounded-md border border-white/20 bg-[#1a0a2e] shadow-lg",
        className
      )}
    >
      {children}
    </div>
  )
}

export function SelectItem({ value, children }) {
  const ctx = React.useContext(SelectContext)

  return (
    <div
      onClick={() => ctx?.onValueChange?.(value)}
      className="cursor-pointer px-3 py-2 text-sm text-white hover:bg-white/10"
    >
      {children}
    </div>
  )
}
