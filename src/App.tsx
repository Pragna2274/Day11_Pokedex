import { Routes, Route } from "react-router-dom"
import Home from "@/pages/Home"
import PokemonDetails from "@/pages/PokemonDetails"

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </div>
  )
}
