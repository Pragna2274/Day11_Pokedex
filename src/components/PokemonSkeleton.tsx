import { Card, CardContent } from "@/components/ui/card"

export default function PokemonSkeleton() {
  return (
    <Card className="animate-pulse h-48 shadow-lg bg-white rounded-lg">
      <CardContent className="flex flex-col items-center justify-center p-4 h-full">
        <div className="h-24 w-24 bg-gray-300 rounded-full mb-4"></div>
        <div className="h-5 w-20 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 w-12 bg-gray-200 rounded"></div>
      </CardContent>
    </Card>
  )
}
