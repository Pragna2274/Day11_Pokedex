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

export type PokemonDetails = {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string
      }
    }
  }
  types: Array<{
    type: { name: string }
  }>
  abilities: Array<{
    ability: { name: string }
  }>
  stats: Array<{
    base_stat: number
    stat: { name: string }
  }>
}

