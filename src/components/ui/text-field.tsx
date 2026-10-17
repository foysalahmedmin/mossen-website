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
      <label
        htmlFor={id}
        className="block font-mono text-xs font-semibold tracking-wider text-ink-soft uppercase"
      >
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
        <p id={hintId} className="font-mono text-xs text-ink-soft">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="font-mono text-xs font-medium text-danger">
          {error}
        </p>
      ) : null}
    </div>
  )
}
