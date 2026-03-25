import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function ShimmerContainer() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center w-full">
      {Array(8).fill(0).map((_, index) => (
        <ShimmerCard key={index} />
      ))}
    </div>
  );
}

export function ShimmerCard() {
  return (
    <Card className="w-full max-w-[300px] overflow-hidden border-border/50">
      <Skeleton className="aspect-[4/3] w-full" />
      <CardHeader className="p-4 pb-2 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center mt-2">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-8 w-1/3" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}