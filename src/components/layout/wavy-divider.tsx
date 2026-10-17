import type { SVGProps } from 'react'
import { cn } from '@/lib/cn'

export function WavyDivider({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <div className="w-full overflow-hidden leading-none" aria-hidden="true">
      <svg
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn('h-4 w-full sm:h-6', className)}
        {...props}
      >
        <path
          d="M0,12 C150,22 300,2 450,12 C600,22 750,2 900,12 C1050,22 1200,2 1200,12"
          stroke="var(--color-river)"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
