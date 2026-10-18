export default function StorefrontLoading() {
  return (
    <div
      role="status"
      aria-label="Loading garments"
      className="mx-auto max-w-7xl animate-pulse px-6 py-12 sm:px-8"
    >
      {/* Top Banner Skeleton */}
      <div className="pebble mb-12 h-64 w-full bg-surface/70" />

      {/* Grid Skeletons */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="pebble space-y-4 border border-border-strong/20 bg-surface/40 p-4"
          >
            <div className="pebble aspect-[3/4] w-full bg-surface/80" />
            <div className="h-4 w-2/3 rounded-md bg-surface/80" />
            <div className="h-3 w-1/3 rounded-md bg-surface/60" />
          </div>
        ))}
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
