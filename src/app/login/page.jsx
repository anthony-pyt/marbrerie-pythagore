"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { login } from "@/api/services/authServices";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await login({ email, password });
      console.log("Login successful, redirecting to /admin", res);

      router.push("/admin");
    } catch (err) {
      setError("Email ou mot de passe incorrect !");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        <img
          src="/images/echantillons.JPEG"
          alt=""
          className="w-screen h-screen object-cover"
        />
      </div>
      <div className="bg-white px-8 py-16 rounded-2xl w-full max-w-md z-10">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Connexion
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4 bg-red-100 p-2 rounded-lg">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="relative">
              {/* <FiMail className="absolute left-3 top-3 text-gray-500" size={20} /> */}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>

            <div className="relative">
              {/* <FiLock className="absolute left-3 top-3 text-gray-500" size={20} /> */}
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <Button
              text={loading ? "Connexion..." : "Se connecter"}
              type="submit"
              loading={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
