import { useParams, useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchPokemonDetails } from "@/api/pokemon"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function PokemonDetails() {
  const { name } = useParams<{ name: string }>()
  const navigate = useNavigate()

  const { data, status } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemonDetails(name!),
    enabled: !!name,
  })

  if (status === "pending")
    return <div className="text-center mt-20">Loading...</div>

  if (status === "error")
    return <div className="text-center mt-20">Error loading Pokémon</div>

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-indigo-100 to-purple-200 py-20 px-4">
      
      <div className="w-full max-w-md mb-4">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="bg-white"
        >
          ← Back
        </Button>
      
      </div>

      <Card className="w-full max-w-md shadow-xl bg-white rounded-xl overflow-hidden">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <img
            src={data!.sprites.other["official-artwork"].front_default}
            alt={data!.name}
            className="h-40 w-40 object-contain"
          />

          <h1 className="capitalize text-3xl font-bold mt-4">
            {data!.name}
          </h1>

          <div className="flex gap-2 mt-4">
            {data!.types.map(t => (
              <Badge key={t.type.name} className="capitalize">
                {t.type.name}
              </Badge>
            ))}
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Height: {data!.height} | Weight: {data!.weight} | XP: {data!.base_experience}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
