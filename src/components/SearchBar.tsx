import { Input } from "@/components/ui/input"
import { useState, type ChangeEvent } from "react"

interface SearchBarProps {
  onSearch: (value: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("")//makes the input a controlled component.

 // This event comes from an HTML input element.
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)//updates local state
    onSearch(e.target.value)//sends value to parent
  }

  return (
    <div className="mb-6 flex justify-center">
      <Input
        placeholder="Search Pokémon..."
        value={value}
        onChange={handleChange}
        className="w-full max-w-md bg-white border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
      />
    </div>
  )
}
