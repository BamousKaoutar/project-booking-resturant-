import { useState, FormEvent, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const validEmail = "admin@gmail.com"
    const validPassword = "admin123"

    if (email === validEmail && password === validPassword) {
      setError("")
      navigate("/admin")
    } else {
      setError("Email ou mot de passe incorrect")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#c34a0a]">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg"
      >
        <h2 className="text-2xl font-bold text-[#c34a0a] mb-6 text-center">
          Connexion
        </h2>

        {error && (
          <div className="mb-4 p-3 text-center bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c34a0a]"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 font-medium">
            Mot de passe
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c34a0a]"
          />
        </div>

        <Button type="submit" className="w-full bg-[#c34a0a] hover:bg-[#a93b08]">
          Se connecter
        </Button>
      </form>
    </div>
  )
}
