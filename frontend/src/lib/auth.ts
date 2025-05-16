const TOKEN_KEY = "token";

export function setToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function getToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

export function removeToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_KEY);
  }
}

interface LoginData {
  email: string;
  password: string;
}

interface SignupData extends LoginData {
  name: string;
}

export async function login({ email, password }: LoginData) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }
  const json = await res.json();
  setToken(json.accessToken);
  return json;
}

export async function signup({ name, email, password }: SignupData) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    }
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Signup failed");
  }
  const json = await res.json();
  setToken(json.accessToken);
  return json;
}
