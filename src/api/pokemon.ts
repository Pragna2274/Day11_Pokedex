//This code is creating a small API layer to fetch Pokémon data from the public PokéAPI.
import axios from "axios";
import type { PokemonListResponse, PokemonDetails } from "@/types/pokemon"

//Creating an Axios Instance
const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
})

//fetches a paginated list of Pokémon.
export const fetchPokemonPage = async ({ pageParam = 0 }): Promise<PokemonListResponse> => {
  const limit = 20
  const offset = pageParam * limit
  const { data } = await api.get(`/pokemon?limit=${limit}&offset=${offset}`)
  return data
}

//Fetches detailed info about one specific Pokémon.
export const fetchPokemonDetails = async (name: string): Promise<PokemonDetails> => {
  const { data } = await api.get(`/pokemon/${name}`)
  return data
}