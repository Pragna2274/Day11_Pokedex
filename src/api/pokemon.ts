import axios from "axios";
import type { PokemonListResponse, PokemonDetails } from "@/types/pokemon"

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
})

export const fetchPokemonPage = async ({ pageParam = 0 }): Promise<PokemonListResponse> => {
  const limit = 20
  const offset = pageParam * limit
  const { data } = await api.get(`/pokemon?limit=${limit}&offset=${offset}`)
  return data
}

export const fetchPokemonDetails = async (name: string): Promise<PokemonDetails> => {
  const { data } = await api.get(`/pokemon/${name}`)
  return data
}
