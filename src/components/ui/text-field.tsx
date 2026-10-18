import { useId, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className, ...rest }: InputProps) {
  return (
    <input
      className={cn(
        'outline-field w-full bg-transparent px-4 py-3 font-text text-sm text-ink placeholder:text-ink-faint',
        'transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
        className,
      )}
      {...rest}
    />
  )
}

export interface TextFieldProps extends Omit<InputProps, 'id'> {
  label: string
  hint?: string
  error?: string
}

/** A labelled input. Hint and error text are announced with the field via aria-describedby. */
export function TextField({ label, hint, error, className, ...rest }: TextFieldProps) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div data-invalid={error ? '' : undefined} className="w-full space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold text-ink-soft tabular-nums">
        {label}
      </label>
      <Input
        id={id}
        className={cn(error && '!border-danger text-danger', className)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...rest}
      />
      {hint ? (
        <p id={hintId} className="text-xs text-ink-soft tabular-nums">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-xs font-medium text-danger tabular-nums">
          {error}
        </p>
      ) : null}
    </div>
  )
}
