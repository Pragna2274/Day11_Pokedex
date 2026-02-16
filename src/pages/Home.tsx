import { useInfiniteQuery, type QueryFunctionContext } from "@tanstack/react-query"
import { fetchPokemonPage } from "@/api/pokemon"
import PokemonCard from "@/components/PokemonCard"
import PokemonSkeleton from "@/components/PokemonSkeleton"
import SearchBar from "@/components/SearchBar"
import { useEffect, useRef, useState } from "react"
import type { PokemonListResponse, PokemonListItem } from "@/types/pokemon"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<PokemonListResponse, Error>({
    queryKey: ["pokemons"],
    queryFn: ({ pageParam = 0 }: QueryFunctionContext) => fetchPokemonPage({ pageParam: pageParam as number }),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.results.length < 20) return undefined
      return allPages.length
    },
    initialPageParam: 0,
  })

  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!loadMoreRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage()
      },
      { threshold: 1 }
    )

    observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage])

 
  const pokemons: PokemonListItem[] = data?.pages.flatMap(page => page.results) ?? []

  const filteredPokemons = pokemons.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-6">Pokémon Explorer ⚡</h1>

      <SearchBar onSearch={setSearchTerm} />

      {status === "pending" && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <PokemonSkeleton key={i} />
          ))}
        </div>
      )}

      
      {status === "error" && (
        <div className="text-center mt-20">Error loading Pokémon</div>
      )}

      {status === "success" && (
        <>
          {filteredPokemons.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredPokemons.map(pokemon => (
                <PokemonCard key={pokemon.name} pokemon={pokemon} />
              ))}
            </div>
          ) : (
            <p className="text-center mt-10 text-gray-500">No Pokémon found.</p>
          )}
        </>
      )}

      {isFetchingNextPage && (
        <p className="text-center mt-6">Loading more...</p>
      )}

      <div ref={loadMoreRef} className="h-10" />
    </div>
  )
}
