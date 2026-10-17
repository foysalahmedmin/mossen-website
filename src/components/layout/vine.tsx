import type { SVGProps } from 'react'
import { cn } from '@/lib/cn'

export interface VineProps extends SVGProps<SVGSVGElement> {
  segments?: number
  progress?: number
  className?: string
}

export function Vine({ segments = 3, progress = 1, className, ...props }: VineProps) {
  return (
    <div
      className={cn('relative flex flex-col items-center select-none', className)}
      aria-hidden="true"
    >
      <svg
        width="24"
        height={segments * 48}
        viewBox={`0 0 24 ${segments * 48}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-brand/50"
        {...props}
      >
        {Array.from({ length: segments }).map((_, i) => {
          const y = i * 48
          const isLeft = i % 2 === 0
          return (
            <g
              key={i}
              className="transition-opacity duration-500"
              style={{ opacity: progress >= (i + 1) / segments ? 1 : 0.3 }}
            >
              {/* Stem segment */}
              <path
                d={`M12,${y} C${isLeft ? 8 : 16},${y + 24} ${isLeft ? 16 : 8},${y + 36} 12,${y + 48}`}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Organic leaf sprouting */}
              {isLeft ? (
                <path
                  d={`M10,${y + 20} C4,${y + 14} 2,${y + 24} 8,${y + 26} C9,${y + 26} 10,${y + 22} 10,${y + 20} Z`}
                  fill="currentColor"
                  opacity="0.75"
                />
              ) : (
                <path
                  d={`M14,${y + 20} C20,${y + 14} 22,${y + 24} 16,${y + 26} C15,${y + 26} 14,${y + 22} 14,${y + 20} Z`}
                  fill="currentColor"
                  opacity="0.75"
                />
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
