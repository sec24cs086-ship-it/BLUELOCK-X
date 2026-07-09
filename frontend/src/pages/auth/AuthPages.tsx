import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserCircle2,
} from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { useForm, type FieldValues, type Path, type UseFormRegister } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { z } from 'zod'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { useAuth } from '@/hooks/useAuth'
import { useLoading } from '@/hooks/useLoading'
import { useToast } from '@/hooks/useToast'
import {
  loginWithEmail,
  registerWithEmail,
  requestPasswordReset,
  resetPassword,
  updateUserProfile,
  verifyEmail,
} from '@/services/auth'
import type { User } from '@/types'

const loginSchema = z.object({
  email: z.string().trim().email('Please use a valid work email'),
  password: z.string().min(6, 'Use at least 6 characters'),
})

const registerSchema = z.object({
  name: z.string().trim().min(2, 'Please share your name'),
  email: z.string().trim().email('Please use a valid work email'),
  password: z.string().min(8, 'Use at least 8 characters'),
})

const forgotSchema = z.object({
  email: z.string().trim().email('Please use a valid work email'),
})

const resetSchema = z
  .object({
    password: z.string().min(8, 'Use at least 8 characters'),
    confirmPassword: z.string().min(8, 'Use at least 8 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

const profileSchema = z.object({
  company: z.string().trim().min(2, 'Please mention your company'),
  teamSize: z.string().min(1, 'Choose a team size'),
  focusArea: z.string().trim().min(2, 'Share your main focus'),
})

type LoginValues = z.infer<typeof loginSchema>
type RegisterValues = z.infer<typeof registerSchema>
type ForgotValues = z.infer<typeof forgotSchema>
type ResetValues = z.infer<typeof resetSchema>
type ProfileValues = z.infer<typeof profileSchema>

function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footer,
  progressValue,
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
  footer: React.ReactNode
  progressValue?: number
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 lg:flex-row lg:items-stretch lg:px-8 lg:py-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35 }}
        className="flex-1 rounded-[32px] border border-slate-800/80 bg-slate-950/70 p-8 shadow-[0_30px_80px_rgba(2,6,23,0.24)] backdrop-blur-2xl lg:p-10"
      >
        <Badge variant="success" className="mb-6">
          {eyebrow}
        </Badge>
        <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-400">{description}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            ['Instant workflows', 'Launch a secure demo account in seconds.'],
            ['AI insights', 'Preview your carbon reporting journey with guided steps.'],
            ['Mocked onboarding', 'Shape the experience before you connect a backend.'],
            ['Protected routes', 'Keep the flow ready for future authentication hooks.'],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                <ShieldCheck className="h-4 w-4 text-emerald-300" />
                {label}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-400">{value}</p>
            </div>
          ))}
        </div>

        {typeof progressValue === 'number' ? (
          <div className="mt-8 max-w-xl rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <span>Progress</span>
              <span className="font-semibold text-emerald-300">{progressValue}%</span>
            </div>
            <Progress value={progressValue} className="mt-3" />
          </div>
        ) : null}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="w-full max-w-[480px]"
      >
        <Card className="border-slate-800/80 bg-slate-950/90 p-1 shadow-[0_30px_90px_rgba(2,6,23,0.3)]">
          <CardHeader className="px-6 pb-2 pt-6">
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-300">
              <Sparkles className="h-4 w-4" />
              EcoLens AI demo
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="space-y-6">{children}</div>
            <div className="mt-6 border-t border-slate-800/80 pt-4 text-sm text-slate-400">{footer}</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

function AuthRedirect() {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    navigate(user?.onboardingCompleted ? '/app' : '/auth/welcome', { replace: true })
  }, [isAuthenticated, navigate, user?.onboardingCompleted])

  return null
}

function PasswordField<TFieldValues extends FieldValues>({
  label,
  register,
  error,
  name,
  placeholder,
}: {
  label: string
  register: UseFormRegister<TFieldValues>
  error?: string
  name: Path<TFieldValues>
  placeholder: string
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <label className="block space-y-2 text-sm font-medium text-slate-300">
      <span>{label}</span>
      <div className="relative">
        <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        <Input
          type={showPassword ? 'text' : 'password'}
          className="pl-10"
          placeholder={placeholder}
          {...register(name)}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-200"
          onClick={() => setShowPassword((value) => !value)}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </label>
  )
}

function FormField<TFieldValues extends FieldValues>({
  label,
  type = 'text',
  placeholder,
  register,
  error,
  name,
}: {
  label: string
  type?: string
  placeholder: string
  register: UseFormRegister<TFieldValues>
  error?: string
  name: Path<TFieldValues>
}) {
  return (
    <label className="block space-y-2 text-sm font-medium text-slate-300">
      <span>{label}</span>
      <div className="relative">
        {type === 'email' ? (
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        ) : type === 'text' ? (
          <UserCircle2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        ) : null}
        <Input type={type} className={type === 'email' || type === 'text' ? 'pl-10' : ''} placeholder={placeholder} {...register(name)} />
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
    </label>
  )
}

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { addToast } = useToast()
  const { isLoading, setLoading } = useLoading()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = async (values: LoginValues) => {
    setLoading(true)

    try {
      const authenticatedUser = await loginWithEmail(values.email, values.password)
      login(authenticatedUser)
      addToast({ title: 'Welcome back', message: 'Your mock workspace is ready.', variant: 'success' })
      navigate(authenticatedUser.onboardingCompleted ? '/app' : '/auth/welcome', { replace: true })
    } catch (error) {
      addToast({ title: 'Unable to sign in', message: error instanceof Error ? error.message : 'Please try again.', variant: 'danger' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AuthRedirect />
      <AuthShell
        eyebrow="Secure access"
        title="Sign in to your EcoLens workspace"
        description="A polished, mocked authentication experience that feels premium while staying ready for production integration."
        footer={
          <div className="flex items-center justify-between gap-2 text-sm text-slate-400">
            <span>Need a quick start?</span>
            <Link to="/auth/register" className="font-semibold text-emerald-300 transition hover:text-emerald-200">
              Create an account
            </Link>
          </div>
        }
        progressValue={20}
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <BadgeCheck className="h-4 w-4 text-emerald-300" />
            Demo credentials: demo@ecolens.ai / demo1234
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <FormField label="Email" type="email" placeholder="you@company.com" register={register} error={errors.email?.message} name="email" />
            <PasswordField label="Password" register={register} error={errors.password?.message} name="password" placeholder="Enter your password" />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in…' : 'Sign in'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-400">
          <Link to="/auth/forgot-password" className="transition hover:text-slate-200">
            Forgot password?
          </Link>
          <Link to="/auth/verify-email" className="transition hover:text-slate-200">
            Verify email
          </Link>
        </div>
      </AuthShell>
    </>
  )
}

export function RegisterPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { addToast } = useToast()
  const { isLoading, setLoading } = useLoading()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({ resolver: zodResolver(registerSchema) })

  const onSubmit = async (values: RegisterValues) => {
    setLoading(true)

    try {
      const authenticatedUser = await registerWithEmail(values.email, values.name, values.password)
      login(authenticatedUser)
      addToast({ title: 'Account created', message: 'You are ready to set up your onboarding flow.', variant: 'success' })
      navigate('/auth/welcome', { replace: true })
    } catch (error) {
      addToast({ title: 'Could not create account', message: error instanceof Error ? error.message : 'Please try another email.', variant: 'danger' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AuthRedirect />
      <AuthShell
        eyebrow="Start fresh"
        title="Create a polished demo account"
        description="A complete mock experience for account creation, onboarding, and premium handoff screens."
        footer={
          <div className="flex items-center justify-between gap-2 text-sm text-slate-400">
            <span>Already have an account?</span>
            <Link to="/auth" className="font-semibold text-emerald-300 transition hover:text-emerald-200">
              Sign in
            </Link>
          </div>
        }
        progressValue={25}
      >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Full name" type="text" placeholder="Ava Chen" register={register} error={errors.name?.message} name="name" />
          <FormField label="Work email" type="email" placeholder="ava@company.com" register={register} error={errors.email?.message} name="email" />
          <PasswordField label="Password" register={register} error={errors.password?.message} name="password" placeholder="Create a strong password" />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating account…' : 'Create account'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </AuthShell>
    </>
  )
}

export function ForgotPasswordPage() {
  const { addToast } = useToast()
  const { isLoading, setLoading } = useLoading()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotValues>({ resolver: zodResolver(forgotSchema) })

  const onSubmit = async (values: ForgotValues) => {
    setLoading(true)

    try {
      await requestPasswordReset(values.email)
      addToast({ title: 'Reset link prepared', message: 'Check the demo flow to continue.', variant: 'success' })
    } catch (error) {
      addToast({ title: 'Reset request failed', message: error instanceof Error ? error.message : 'Please try again.', variant: 'danger' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AuthRedirect />
      <AuthShell
        eyebrow="Reset access"
        title="Recover your account quickly"
        description="A mock request flow with a polished confirmation state for future password reset screens."
        footer={
          <div className="flex items-center justify-between gap-2 text-sm text-slate-400">
            <span>Remembered it?</span>
            <Link to="/auth" className="font-semibold text-emerald-300 transition hover:text-emerald-200">
              Back to sign in
            </Link>
          </div>
        }
        progressValue={40}
      >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Email" type="email" placeholder="you@company.com" register={register} error={errors.email?.message} name="email" />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Preparing reset…' : 'Send reset instructions'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </AuthShell>
    </>
  )
}

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const { isLoading, setLoading } = useLoading()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? 'demo-reset-token'
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetValues>({ resolver: zodResolver(resetSchema) })

  const onSubmit = async (values: ResetValues) => {
    setLoading(true)

    try {
      await resetPassword(token, values.password)
      addToast({ title: 'Password updated', message: 'You can now sign in with your new password.', variant: 'success' })
      navigate('/auth', { replace: true })
    } catch (error) {
      addToast({ title: 'Password reset failed', message: error instanceof Error ? error.message : 'Please try again.', variant: 'danger' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AuthRedirect />
      <AuthShell
        eyebrow="New password"
        title="Set a fresh password"
        description="A secure reset experience with validation and a clear success handoff."
        footer={
          <div className="flex items-center justify-between gap-2 text-sm text-slate-400">
            <span>Need the old one?</span>
            <Link to="/auth" className="font-semibold text-emerald-300 transition hover:text-emerald-200">
              Back to sign in
            </Link>
          </div>
        }
        progressValue={60}
      >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <PasswordField label="New password" register={register} error={errors.password?.message} name="password" placeholder="Enter a new password" />
          <PasswordField label="Confirm password" register={register} error={errors.confirmPassword?.message} name="confirmPassword" placeholder="Repeat the new password" />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Updating password…' : 'Update password'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </AuthShell>
    </>
  )
}

export function VerifyEmailPage() {
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()
  const { addToast } = useToast()
  const { isLoading, setLoading } = useLoading()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? 'demo-verification-token'

  const onVerify = async () => {
    if (!user) {
      navigate('/auth', { replace: true })
      return
    }

    setLoading(true)

    try {
      const refreshedUser = await verifyEmail(token)
      updateUser({ emailVerified: refreshedUser.emailVerified })
      addToast({ title: 'Email verified', message: 'Your account is ready for onboarding.', variant: 'success' })
      navigate('/auth/welcome', { replace: true })
    } catch (error) {
      addToast({ title: 'Verification failed', message: error instanceof Error ? error.message : 'Please try again.', variant: 'danger' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AuthRedirect />
      <AuthShell
        eyebrow="Verify account"
        title="Confirm your email with a single tap"
        description="The release-ready experience includes a clear verification state and a premium success moment."
        footer={
          <div className="flex items-center justify-between gap-2 text-sm text-slate-400">
            <span>Need to go back?</span>
            <Link to="/auth" className="font-semibold text-emerald-300 transition hover:text-emerald-200">
              Sign in instead
            </Link>
          </div>
        }
        progressValue={80}
      >
        <div className="space-y-4 rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5">
          <div className="flex items-center gap-3 text-emerald-300">
            <Mail className="h-5 w-5" />
            <div>
              <p className="font-semibold text-slate-100">We sent a mock verification email</p>
              <p className="text-sm text-slate-400">Use the demo token to preview the verified state.</p>
            </div>
          </div>
          <Button onClick={onVerify} className="w-full" disabled={isLoading}>
            {isLoading ? 'Verifying…' : 'Verify email'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <p className="text-sm text-slate-400">Token: {token}</p>
        </div>
      </AuthShell>
    </>
  )
}

export function WelcomePage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  if (!user) {
    return null
  }

  return (
    <>
      <AuthRedirect />
      <AuthShell
        eyebrow="Welcome aboard"
        title={`Welcome, ${user.name.split(' ')[0] || 'there'} — let’s tailor your workspace`}
        description="The onboarding experience feels high-touch, while still remaining fully mockable and easy to swap for your real auth layer."
        footer={
          <div className="flex items-center justify-between gap-2 text-sm text-slate-400">
            <span>Ready to continue?</span>
            <Link to="/app" className="font-semibold text-emerald-300 transition hover:text-emerald-200">
              Skip for now
            </Link>
          </div>
        }
        progressValue={85}
      >
        <div className="space-y-4 rounded-3xl border border-slate-800/80 bg-slate-900/70 p-5">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-300" />
            <div>
              <p className="font-semibold text-slate-100">Your account is ready</p>
              <p className="text-sm text-slate-400">Add a few details to personalize the experience and continue to the premium dashboard preview.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => navigate('/auth/profile')}>Continue setup</Button>
            <Button variant="outline" onClick={() => navigate('/app')}>
              Explore app preview
            </Button>
          </div>
        </div>
      </AuthShell>
    </>
  )
}

export function ProfileSetupPage() {
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()
  const { addToast } = useToast()
  const { isLoading, setLoading } = useLoading()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileValues>({ resolver: zodResolver(profileSchema) })

  if (!user) {
    return null
  }

  const onSubmit = async (values: ProfileValues) => {
    setLoading(true)

    try {
      const updatedUser = await updateUserProfile(user, {
        company: values.company,
        teamSize: values.teamSize,
        focusArea: values.focusArea,
        profileComplete: true,
      })
      updateUser({ company: updatedUser.company, teamSize: updatedUser.teamSize, focusArea: updatedUser.focusArea, profileComplete: true })
      addToast({ title: 'Profile updated', message: 'Next, choose the role that best fits your workflow.', variant: 'success' })
      navigate('/auth/user-type', { replace: true })
    } catch (error) {
      addToast({ title: 'Profile update failed', message: error instanceof Error ? error.message : 'Please try again.', variant: 'danger' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AuthRedirect />
      <AuthShell
        eyebrow="Personalize"
        title="Tell us a bit about your team"
        description="The mock profile step is intentionally rich and interactive so it feels like a real onboarding experience."
        footer={
          <div className="flex items-center justify-between gap-2 text-sm text-slate-400">
            <span>Prefer to skip?</span>
            <Link to="/auth/user-type" className="font-semibold text-emerald-300 transition hover:text-emerald-200">
              Continue anyway
            </Link>
          </div>
        }
        progressValue={90}
      >
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Company" type="text" placeholder="Northwind Labs" register={register} error={errors.company?.message} name="company" />
          <label className="block space-y-2 text-sm font-medium text-slate-300">
            <span>Team size</span>
            <select className="flex h-11 w-full rounded-2xl border border-slate-800 bg-slate-950/80 px-4 py-2 text-sm text-slate-100 shadow-sm transition-colors duration-200 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950" {...register('teamSize')}>
              <option value="">Select a size</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="200+">200+</option>
            </select>
            {errors.teamSize?.message ? <p className="text-sm text-red-400">{errors.teamSize.message}</p> : null}
          </label>
          <FormField label="Focus area" type="text" placeholder="Sustainability reporting" register={register} error={errors.focusArea?.message} name="focusArea" />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Saving profile…' : 'Save and continue'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </AuthShell>
    </>
  )
}

export function UserTypePage() {
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()
  const { addToast } = useToast()
  const { isLoading, setLoading } = useLoading()

  const options = [
    { value: 'operator', label: 'Operations lead', description: 'Track receipts, action items, and approvals.' },
    { value: 'finance', label: 'Finance lead', description: 'Review savings narratives and policy impact.' },
    { value: 'strategy', label: 'ESG strategist', description: 'Craft reports and executive-ready recommendations.' },
  ] as const

  if (!user) {
    return null
  }

  const onSelect = async (selectedType: User['userType']) => {
    setLoading(true)

    try {
      const updatedUser = await updateUserProfile(user, { userType: selectedType, onboardingCompleted: true })
      updateUser({ userType: updatedUser.userType, onboardingCompleted: true })
      addToast({ title: 'Onboarding complete', message: 'Your premium workspace preview is ready.', variant: 'success' })
      navigate('/app', { replace: true })
    } catch (error) {
      addToast({ title: 'Could not finish onboarding', message: error instanceof Error ? error.message : 'Please try again.', variant: 'danger' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <AuthRedirect />
      <AuthShell
        eyebrow="Choose your role"
        title="Pick the lens you want to work from"
        description="The final step completes the experience and opens the app preview with a polished success state."
        footer={
          <div className="flex items-center justify-between gap-2 text-sm text-slate-400">
            <span>Need a quick route?</span>
            <Link to="/app" className="font-semibold text-emerald-300 transition hover:text-emerald-200">
              Open app preview
            </Link>
          </div>
        }
        progressValue={100}
      >
        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value as User['userType'])}
              className="w-full rounded-2xl border border-slate-800/80 bg-slate-900/70 p-4 text-left transition hover:border-emerald-400/40 hover:bg-slate-900"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-100">{option.label}</p>
                  <p className="mt-1 text-sm text-slate-400">{option.description}</p>
                </div>
                <Badge variant="secondary">Select</Badge>
              </div>
            </button>
          ))}
          <Button type="button" variant="outline" className="w-full" disabled={isLoading} onClick={() => onSelect('operator')}>
            {isLoading ? 'Finishing setup…' : 'Complete onboarding'}
          </Button>
        </div>
      </AuthShell>
    </>
  )
}
