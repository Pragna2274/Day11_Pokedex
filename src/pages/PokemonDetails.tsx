import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchPokemonDetails } from "@/api/pokemon"
import type { PokemonDetails } from "@/types/pokemon"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function PokemonDetails() {
  const { name } = useParams<{ name: string }>()
  const navigate = useNavigate()

  const { data, status } = useQuery<PokemonDetails>({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemonDetails(name!),
    enabled: !!name,
  })

  if (status === "pending") {
    return (
      <div className="text-center mt-20 text-lg font-medium">
        Loading...
      </div>
    )
  }

  if (status === "error" || !data) {
    return (
      <div className="text-center mt-20 text-red-500">
        Error loading Pokémon
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-100 to-purple-200 py-20 px-4">

      {/* Back Button */}
      <div className="w-full max-w-md mb-4">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="bg-white"
        >
          ← Back
        </Button>
      </div>

      {/* Card */}
      <Card className="w-full max-w-md shadow-xl bg-white rounded-xl overflow-hidden">
        <CardContent className="flex flex-col items-center p-6">

          {/* Pokemon Image */}
          <img
            src={data.sprites.other["official-artwork"].front_default}
            alt={data.name}
            className="h-40 w-40 object-contain"
          />

          {/* Name & ID */}
          <h1 className="capitalize text-3xl font-bold mt-4">
            {data.name}
          </h1>
          <p className="text-sm text-gray-500">ID: #{data.id}</p>

          {/* Types */}
          <div className="flex gap-2 mt-4">
            {data.types.map((t) => (
              <Badge key={t.type.name} className="capitalize">
                {t.type.name}
              </Badge>
            ))}
          </div>

          {/* Basic Info */}
          <div className="mt-4 text-sm text-muted-foreground text-center">
            Height: {data.height} | Weight: {data.weight} | XP: {data.base_experience}
          </div>

          {/* Abilities */}
          <div className="mt-6 w-full">
            <h2 className="font-semibold mb-2">Abilities</h2>
            <div className="flex flex-wrap gap-2">
              {data.abilities.map((a) => (
                <Badge
                  key={a.ability.name}
                  variant="secondary"
                  className="capitalize"
                >
                  {a.ability.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Base Stats */}
          <div className="mt-6 w-full">
            <h2 className="font-semibold mb-3">Base Stats</h2>

            {data.stats.map((stat) => (
              <div key={stat.stat.name} className="mb-3">
                <div className="flex justify-between text-sm capitalize">
                  <span>{stat.stat.name.replace("-", " ")}</span>
                  <span>{stat.base_stat}</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(stat.base_stat, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

        </CardContent>
      </Card>
    </div>
  )
}
