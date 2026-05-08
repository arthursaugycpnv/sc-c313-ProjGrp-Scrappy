import { createHash, randomBytes } from "crypto";

export type StoredUser = {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
  createdAt: string;
};

// MVP only: in-memory store resets on server restart.
const usersByEmail = new Map<string, StoredUser>();

function hashPassword(password: string, salt: string) {
  return createHash("sha256").update(`${salt}:${password}`).digest("hex");
}

export function validatePasswordRules(password: string) {
  if (password.length < 4) return "Mot de passe trop court (min 4).";
  return null;
}

export function registerUser(email: string, password: string) {
  const normalized = email.trim().toLowerCase();
  if (!normalized.includes("@"))
    return { ok: false as const, message: "Email invalide." };
  const pwError = validatePasswordRules(password);
  if (pwError) return { ok: false as const, message: pwError };

  if (usersByEmail.has(normalized)) {
    return { ok: false as const, message: "Compte déjà existant." };
  }

  const salt = randomBytes(16).toString("hex");
  const passwordHash = hashPassword(password, salt);

  const user: StoredUser = {
    id: randomBytes(12).toString("hex"),
    email: normalized,
    salt,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  usersByEmail.set(normalized, user);
  return { ok: true as const, user };
}

export function loginUser(email: string, password: string) {
  const normalized = email.trim().toLowerCase();
  const user = usersByEmail.get(normalized);
  if (!user) return { ok: false as const, message: "Identifiants invalides." };

  const passwordHash = hashPassword(password, user.salt);
  if (passwordHash !== user.passwordHash) {
    return { ok: false as const, message: "Identifiants invalides." };
  }

  return { ok: true as const, user };
}
