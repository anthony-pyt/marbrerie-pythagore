"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Alert from "@/components/Alert"; // Ton nouveau composant d'alerte
import { login } from "@/api/services/authServices";
import { Icon } from "@iconify/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [viewPassword, setWiewPassword] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login({ email, password });
      router.push("/admin");
    } catch (err) {
      setError("Email ou mot de passe incorrect !");
    } finally {
      setLoading(false);
    }
  };

  const handleViewPasswoard = () => {
    setWiewPassword(!viewPassword)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary font-light">
      {/* Fond Immersif avec Overlay Pythagore */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/echantillons.JPEG"
          alt="Pythagore Archive"
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-secondary/80 backdrop-blur" />
      </div>

      <div className="relative z-10 w-full max-w-md bg-secondary/50 border border-white/10 p-12 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col items-center mb-12">
          <div className="h-[1px] w-12 bg-or mb-6" />
          <h2 className="text-2xl font-light text-white uppercase tracking-[0.3em]">
            Connexion
          </h2>
          <p className="text-[10px] text-or uppercase tracking-widest mt-2">
            Espace Administration
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-6">
            <div className="relative group">
              <Icon
                icon="solar:letter-linear"
                className="absolute left-0 top-3 text-gray-500 group-focus-within:text-or transition-colors"
                size={18}
              />
              <input
                type="email"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 pl-8 py-3 text-white placeholder:text-gray-600 focus:border-or outline-none transition-all text-xs uppercase tracking-widest"
                required
              />
            </div>

            <div className="relative group">
              <Icon
                icon="solar:lock-password-linear"
                className="absolute left-0 top-3 text-gray-500 group-focus-within:text-or transition-colors"
                size={18}
              />
              <input
                type={viewPassword ? "text" : "password"}
                placeholder="MOT DE PASSE"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-b border-white/20 pl-8 py-3 text-white placeholder:text-gray-600 focus:border-or outline-none transition-all text-xs tracking-widest"
                required
              />
              <Icon
                icon={
                  viewPassword ? "solar:eye-closed-linear" : "solar:eye-linear"
                }
                className="absolute right-0 top-3 text-gray-500 group-focus-within:text-or transition-colors"
                size={18}
                onClick={handleViewPasswoard}
              />
            </div>
          </div>

          <div className="flex flex-col items-center pt-6">
            <Button
              text={loading ? "VÉRIFICATION..." : "ACCÉDER À L'INTERFACE"}
              type="submit"
              loading={loading}
              color="or"
              className="w-full"
            />
          </div>
        </form>
      </div>
      <div className="my-4 w-full flex justify-center">
        {/* Alerte flottante */}
        <Alert
          isVisible={!!error}
          message={error}
          type="error"
          onClose={() => setError("")}
        />
      </div>

      {/* Ligne décorative signature */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-t from-or to-transparent opacity-50" />
    </div>
  );
}
