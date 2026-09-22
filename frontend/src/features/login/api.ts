const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface Credentials {
  email: string;
  password: string;
}

async function postJson(path: string, body: Credentials): Promise<Response> {
  return fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// TODO: o backend ainda não expõe /auth/login e /auth/register (ver backend/app/modules).
export function login(credentials: Credentials): Promise<Response> {
  return postJson("/auth/login", credentials);
}

export function createAccount(credentials: Credentials): Promise<Response> {
  return postJson("/auth/register", credentials);
}
