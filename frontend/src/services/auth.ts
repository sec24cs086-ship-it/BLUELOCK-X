import type { User } from '@/types'

const usersStorageKey = 'ecolens-demo-users'
const sessionStorageKey = 'ecolens-auth-user'
const tokenStorageKey = 'accessToken'

interface StoredUser extends User {
  password: string
}

function delay(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

function readUsers(): StoredUser[] {
  if (typeof window === 'undefined') {
    return []
  }

  const raw = window.localStorage.getItem(usersStorageKey)
  if (!raw) {
    return []
  }

  try {
    return JSON.parse(raw) as StoredUser[]
  } catch {
    return []
  }
}

function writeUsers(users: StoredUser[]) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(usersStorageKey, JSON.stringify(users))
}

function createUserRecord(email: string, name: string, password: string): StoredUser {
  return {
    id: `user-${Math.random().toString(36).slice(2, 10)}`,
    email: email.trim().toLowerCase(),
    name: name.trim(),
    role: 'user',
    company: 'EcoLens demo',
    teamSize: '1-10',
    focusArea: 'Climate reporting',
    userType: 'operator',
    onboardingCompleted: false,
    profileComplete: false,
    emailVerified: false,
    password,
  }
}

function sanitizeUser(user: StoredUser): User {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => key !== 'password'),
  ) as User
}

function persistSession(user: User) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(sessionStorageKey, JSON.stringify(user))
  window.localStorage.setItem(tokenStorageKey, `${user.id}-demo-token`)
}

function clearSession() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(sessionStorageKey)
  window.localStorage.removeItem(tokenStorageKey)
}

export async function loginWithEmail(email: string, password: string): Promise<User> {
  await delay(650)

  const users = readUsers()
  const storedUser = users.find((user) => user.email === email.trim().toLowerCase() && user.password === password)

  if (!storedUser) {
    throw new Error('We could not find an account with those credentials. Try demo@ecolens.ai / demo1234.')
  }

  const user = sanitizeUser(storedUser)
  persistSession(user)
  return user
}

export async function registerWithEmail(email: string, name: string, password: string): Promise<User> {
  await delay(800)

  const users = readUsers()
  const existingUser = users.find((user) => user.email === email.trim().toLowerCase())

  if (existingUser) {
    throw new Error('An account already exists for that email address.')
  }

  const user = createUserRecord(email, name, password)
  writeUsers([...users, user])
  const safeUser = sanitizeUser(user)
  persistSession(safeUser)
  return safeUser
}

export async function requestPasswordReset(email: string): Promise<void> {
  await delay(600)

  const users = readUsers()
  const existingUser = users.find((user) => user.email === email.trim().toLowerCase())

  if (!existingUser) {
    throw new Error('We could not find an account for that email. Try demo@ecolens.ai.')
  }

  window.localStorage.setItem('ecolens-reset-token', 'demo-reset-token')
}

export async function resetPassword(token: string, password: string): Promise<void> {
  await delay(700)

  if (!token || token !== 'demo-reset-token') {
    throw new Error('That reset link is no longer valid.')
  }

  const users = readUsers()
  const currentUser = users[0]
  if (!currentUser) {
    throw new Error('No account is available for password reset.')
  }

  const updatedUsers = users.map((user) => (user.email === currentUser.email ? { ...user, password } : user))
  writeUsers(updatedUsers)
  window.localStorage.removeItem('ecolens-reset-token')
}

export async function verifyEmail(token?: string): Promise<User> {
  await delay(500)

  if (token && token !== 'demo-verification-token') {
    throw new Error('That verification token is no longer valid.')
  }

  const storedUserRaw = window.localStorage.getItem(sessionStorageKey)
  if (!storedUserRaw) {
    throw new Error('You do not have an active session to verify.')
  }

  const storedUser = JSON.parse(storedUserRaw) as User
  const users = readUsers()
  const updatedUsers = users.map((user) => (user.email === storedUser.email ? { ...user, emailVerified: true } : user))
  writeUsers(updatedUsers)

  const refreshedUser = { ...storedUser, emailVerified: true }
  persistSession(refreshedUser)
  return refreshedUser
}

export function getStoredSession(): User | null {
  if (typeof window === 'undefined') {
    return null
  }

  const raw = window.localStorage.getItem(sessionStorageKey)
  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export function clearStoredSession() {
  clearSession()
}

export async function updateUserProfile(user: User, updates: Partial<User>): Promise<User> {
  await delay(450)

  const mergedUser = { ...user, ...updates }
  persistSession(mergedUser)

  const users = readUsers()
  const updatedUsers = users.map((entry) => (entry.email === user.email ? { ...entry, ...updates } : entry))
  writeUsers(updatedUsers)

  return mergedUser
}
