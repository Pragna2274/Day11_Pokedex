import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import type { PokemonListItem } from "@/types/pokemon"
import { fetchPokemonDetails } from "@/api/pokemon"
import { useEffect, useState } from "react"

interface Props {
  pokemon: PokemonListItem
}

export default function PokemonCard({ pokemon }: Props) {
  const [imgUrl, setImgUrl] = useState<string>("");

  useEffect(() => {
    const loadPokemonImage = async () => {
      const data=await fetchPokemonDetails(pokemon.name);
      setImgUrl(data.sprites.other["official-artwork"].front_default);
    };
    loadPokemonImage();
  }, [pokemon.name]);

  return ( 
    <Link to={`/pokemon/${pokemon.name}`}>
      <Card className="hover:scale-105 transition-transform duration-300 shadow-lg cursor-pointer">
        <CardContent className="text-center p-4">
          <img
            src={imgUrl}
            alt={pokemon.name}
            className="h-24 mx-auto"
          />
          <h2 className="capitalize font-bold mt-2">{pokemon.name}</h2>
          <Badge className="mt-2">View Details</Badge>
        </CardContent>
      </Card>
    </Link>
  )
}
