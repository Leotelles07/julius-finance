"use client";

import { useMemo, useState } from "react";
import { CreateAccountModal } from "./CreateAccountModal";
import { login } from "./api";
import { PASSWORD_HINT, isValidEmail, isValidPassword } from "./validation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const emailIsValid = isValidEmail(email);
  const passwordIsValid = isValidPassword(password);
  const isFormValid = useMemo(() => emailIsValid && passwordIsValid, [emailIsValid, passwordIsValid]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const response = await login({ email, password });
      if (!response.ok) {
        setErrorMessage("E-mail ou senha inválidos.");
        return;
      }
      setSuccessMessage("Login realizado com sucesso.");
    } catch {
      setErrorMessage("Falha de conexão com o servidor.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <h1 className="mb-6 text-xl font-semibold text-gray-900 dark:text-gray-50">Entrar no Julius</h1>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            E-mail
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-invalid={email.length > 0 && !emailIsValid}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            placeholder="voce@exemplo.com"
          />
          {email.length > 0 && !emailIsValid && (
            <p className="mt-1 text-xs text-red-600">Informe um e-mail válido.</p>
          )}
        </div>

        <div>
          <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Senha
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-invalid={password.length > 0 && !passwordIsValid}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            placeholder="********"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{PASSWORD_HINT}</p>
        </div>

        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
        {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
        >
          {isSubmitting ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setIsCreateAccountOpen(true)}
        className="mt-4 w-full text-center text-sm text-blue-600 hover:underline"
      >
        Não tem credenciais? Criar agora
      </button>

      {isCreateAccountOpen && (
        <CreateAccountModal
          onClose={() => setIsCreateAccountOpen(false)}
          onAccountCreated={(createdEmail) => {
            setEmail(createdEmail);
            setPassword("");
            setIsCreateAccountOpen(false);
            setSuccessMessage("Credenciais criadas. Faça login para continuar.");
          }}
        />
      )}
    </div>
  );
}
