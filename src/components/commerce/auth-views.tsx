'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowRight, Check, Leaf, Sparkle } from '@/components/icons'
import { Button } from '@/components/ui'
import { routes } from '@/config/routes'
import { useSessionStore } from '@/stores/session-store'

export function LoginView() {
  const router = useRouter()
  const login = useSessionStore((s) => s.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Please provide your email and password.')
      return
    }
    login(email)
    router.push(routes.account)
  }

  const handleQuickDemoLogin = () => {
    login('patron@mossen.studios', 'Astrid Lindgren')
    router.push(routes.account)
  }

  return (
    <div className="soft-panel rounded-md border border-river/30 bg-surface/90 p-8 sm:p-10">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2">
          <Leaf size={16} className="text-brand" />
          <span className="text-xs text-ink-soft tabular-nums">MOSSEN patron portal</span>
        </div>
        <h1 className="mt-2 font-display text-3xl font-normal text-ink">Sign In</h1>
        <p className="mt-2 font-text text-sm text-ink-soft">
          Access your slow-fashion garments, carbon tracking, and quiet preferences.
        </p>
      </div>

      {error ? (
        <div className="mt-4 rounded-md border border-danger/40 bg-danger/10 p-3 text-xs text-danger tabular-nums">
          {error}
        </div>
      ) : null}

      {/* 1-Click Demo Entry */}
      <div className="mt-6 rounded-md border border-river/40 bg-canvas/80 p-4 text-center">
        <p className="flex items-center justify-center gap-1.5 text-xs font-semibold text-ink tabular-nums">
          <Sparkle size={14} className="text-brand" />
          Rapid Evaluation Demo
        </p>
        <p className="mt-1 font-text text-xs text-ink-soft">
          Instant patron access as Astrid Lindgren (preloaded with sample orders and sanctuary
          addresses).
        </p>
        <Button type="button" size="sm" onClick={handleQuickDemoLogin} className="mt-3 w-full">
          Quick Demo Login
        </Button>
      </div>

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-river/30" />
        <span className="text-[10px] text-ink-faint tabular-nums">Or Credentials</span>
        <div className="h-px flex-1 bg-river/30" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="login-email" className="mb-1 block text-xs text-ink-soft tabular-nums">
            Email Address
          </label>
          <input
            id="login-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="patron@mossen.studios"
            className="w-full rounded-md border border-river/40 bg-canvas p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
          />
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label htmlFor="login-pwd" className="block text-xs text-ink-soft tabular-nums">
              Password
            </label>
            <Link
              href={routes.forgotPassword}
              className="text-[11px] text-brand tabular-nums hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <input
            id="login-pwd"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="w-full rounded-md border border-river/40 bg-canvas p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
          />
        </div>

        <Button type="submit" size="md" className="w-full">
          Sign In to Sanctuary
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </form>

      <div className="mt-6 border-t border-river/30 pt-4 text-center">
        <p className="text-xs text-ink-soft tabular-nums">
          New to MOSSEN?{' '}
          <Link href={routes.register} className="font-semibold text-ink hover:underline">
            Create an account &rarr;
          </Link>
        </p>
      </div>
    </div>
  )
}

export function RegisterView() {
  const router = useRouter()
  const register = useSessionStore((s) => s.register)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !password) {
      setError('Please provide all required parameters.')
      return
    }
    register(name, email)
    router.push(routes.account)
  }

  return (
    <div className="soft-panel rounded-md border border-river/30 bg-surface/90 p-8 sm:p-10">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2">
          <Leaf size={16} className="text-brand" />
          <span className="text-xs text-ink-soft tabular-nums">MOSSEN patron registry</span>
        </div>
        <h1 className="mt-2 font-display text-3xl font-normal text-ink">Join the Sanctuary</h1>
        <p className="mt-2 font-text text-sm text-ink-soft">
          Create an account to track quiet collections and receive botanical tailoring
          announcements.
        </p>
      </div>

      {error ? (
        <div className="mt-4 rounded-md border border-danger/40 bg-danger/10 p-3 text-xs text-danger tabular-nums">
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="reg-name" className="mb-1 block text-xs text-ink-soft tabular-nums">
            Full Name
          </label>
          <input
            id="reg-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Astrid Lindgren"
            className="w-full rounded-md border border-river/40 bg-canvas p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="reg-email" className="mb-1 block text-xs text-ink-soft tabular-nums">
            Email Address
          </label>
          <input
            id="reg-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="patron@mossen.studios"
            className="w-full rounded-md border border-river/40 bg-canvas p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="reg-pwd" className="mb-1 block text-xs text-ink-soft tabular-nums">
            Password
          </label>
          <input
            id="reg-pwd"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 8 characters"
            className="w-full rounded-md border border-river/40 bg-canvas p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
          />
        </div>

        <Button type="submit" size="md" className="w-full">
          Create Patron Profile
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </form>

      <div className="mt-6 border-t border-river/30 pt-4 text-center">
        <p className="text-xs text-ink-soft tabular-nums">
          Already have an account?{' '}
          <Link href={routes.login} className="font-semibold text-ink hover:underline">
            Sign In &rarr;
          </Link>
        </p>
      </div>
    </div>
  )
}

export function ForgotPasswordView() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <div className="soft-panel rounded-md border border-river/30 bg-surface/90 p-8 sm:p-10">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2">
          <Leaf size={16} className="text-brand" />
          <span className="text-xs text-ink-soft tabular-nums">Account recovery</span>
        </div>
        <h1 className="mt-2 font-display text-3xl font-normal text-ink">Reset Password</h1>
        <p className="mt-2 font-text text-sm text-ink-soft">
          Enter your registered patron email to receive password reset instructions.
        </p>
      </div>

      {submitted ? (
        <div className="mt-6 space-y-3 rounded-md border border-river/40 bg-canvas/80 p-6 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand text-on-brand">
            <Check size={24} />
          </div>
          <p className="font-display text-lg font-medium text-ink">Instructions Dispatched</p>
          <p className="font-text text-sm text-ink-soft">
            If an account exists for <strong className="text-ink">{email}</strong>, a reset link has
            been dispatched to your inbox.
          </p>
          <div className="pt-2">
            <Button asChild variant="secondary" size="sm">
              <Link href={routes.login}>Return to Sign In</Link>
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="reset-email" className="mb-1 block text-xs text-ink-soft tabular-nums">
              Patron Email Address
            </label>
            <input
              id="reset-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="patron@mossen.studios"
              className="w-full rounded-md border border-river/40 bg-canvas p-3 font-text text-sm text-ink placeholder:text-ink-faint focus:border-ink focus:outline-none"
            />
          </div>

          <Button type="submit" size="md" className="w-full">
            Send Reset Instructions
          </Button>

          <div className="border-t border-river/30 pt-4 text-center">
            <Link href={routes.login} className="text-xs text-ink-soft tabular-nums hover:text-ink">
              &larr; Return to Sign In
            </Link>
          </div>
        </form>
      )}
    </div>
  )
}
