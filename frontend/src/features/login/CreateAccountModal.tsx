"use client";

import { useMemo, useState } from "react";
import { Modal } from "./Modal";
import { createAccount } from "./api";
import { PASSWORD_HINT, isValidEmail, isValidPassword } from "./validation";

interface CreateAccountModalProps {
  onClose: () => void;
  onAccountCreated: (email: string) => void;
}

export function CreateAccountModal({ onClose, onAccountCreated }: CreateAccountModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;
  const isFormValid = useMemo(
    () => isValidEmail(email) && isValidPassword(password) && passwordsMatch,
    [email, password, passwordsMatch],
  );

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const response = await createAccount({ email, password });
      if (!response.ok) {
        setErrorMessage("Não foi possível criar as credenciais. Tente novamente.");
        return;
      }
      onAccountCreated(email);
    } catch {
      setErrorMessage("Falha de conexão com o servidor.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal title="Criar credenciais de acesso" onClose={onClose}>
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            E-mail
          </label>
          <input
            id="signup-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            placeholder="voce@exemplo.com"
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Senha
          </label>
          <input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            placeholder="********"
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{PASSWORD_HINT}</p>
        </div>

        <div>
          <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirmar senha
          </label>
          <input
            id="signup-confirm-password"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            placeholder="********"
          />
          {confirmPassword.length > 0 && !passwordsMatch && (
            <p className="mt-1 text-xs text-red-600">As senhas não coincidem.</p>
          )}
        </div>

        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors enabled:hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-gray-700 dark:disabled:text-gray-400"
        >
          {isSubmitting ? "Criando..." : "Criar credenciais"}
        </button>
      </form>
    </Modal>
  );
}
