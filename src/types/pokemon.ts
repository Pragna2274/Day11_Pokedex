export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  results: PokemonListItem[]
}

export interface PokemonType {
  type: { name: string }
}

export interface PokemonDetails {
  name: string
  height: number
  weight: number
  base_experience: number
  types: PokemonType[]
  sprites: {
    other: {
      "official-artwork": { front_default: string }
    }
  }
}
