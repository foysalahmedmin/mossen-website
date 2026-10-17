'use client'

import type { Icon, IconProps } from '@phosphor-icons/react'
import {
  ArrowLeft as PhosphorArrowLeft,
  ArrowRight as PhosphorArrowRight,
  CaretDown as PhosphorCaretDown,
  CaretUp as PhosphorCaretUp,
  Check as PhosphorCheck,
  Eye as PhosphorEye,
  Faders as PhosphorFaders,
  Heart as PhosphorHeart,
  MagnifyingGlass as PhosphorMagnifyingGlass,
  Minus as PhosphorMinus,
  Plus as PhosphorPlus,
  ShoppingBag as PhosphorShoppingBag,
  Sparkle as PhosphorSparkle,
  Star as PhosphorStar,
  Trash as PhosphorTrash,
  User as PhosphorUser,
  X as PhosphorX,
} from '@phosphor-icons/react'

function createIcon(BaseIcon: Icon) {
  return function MossenIcon({ weight = 'regular', size = 22, ...props }: IconProps) {
    return <BaseIcon weight={weight} size={size} {...props} />
  }
}

export const ArrowLeft = createIcon(PhosphorArrowLeft)
export const ArrowRight = createIcon(PhosphorArrowRight)
export const CaretDown = createIcon(PhosphorCaretDown)
export const CaretUp = createIcon(PhosphorCaretUp)
export const Check = createIcon(PhosphorCheck)
export const Eye = createIcon(PhosphorEye)
export const Faders = createIcon(PhosphorFaders)
export const Heart = createIcon(PhosphorHeart)
export const MagnifyingGlass = createIcon(PhosphorMagnifyingGlass)
export const Minus = createIcon(PhosphorMinus)
export const Plus = createIcon(PhosphorPlus)
export const ShoppingBag = createIcon(PhosphorShoppingBag)
export const Sparkle = createIcon(PhosphorSparkle)
export const Star = createIcon(PhosphorStar)
export const Trash = createIcon(PhosphorTrash)
export const User = createIcon(PhosphorUser)
export const X = createIcon(PhosphorX)

// Organic leaf SVG icon for MOSSEN
export function Leaf({
  size = 22,
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}

// Aliases
export const ArrowRightIcon = ArrowRight
export const ArrowLeftIcon = ArrowLeft
export const BagIcon = ShoppingBag
export const CheckIcon = Check
export const CloseIcon = X
export const HeartIcon = Heart
export const MinusIcon = Minus
export const PlusIcon = Plus
export const SearchIcon = MagnifyingGlass
export const SlidersIcon = Faders
export const SparkleIcon = Sparkle
export const SpinnerIcon = Sparkle
export const StarIcon = Star
export const LeafIcon = Leaf
