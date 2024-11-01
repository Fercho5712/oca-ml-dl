import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, using hardcoded credentials
    if (email === "demo@example.com" && password === "demo123") {
      localStorage.setItem("isAuthenticated", "true");
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al sistema",
      });
      navigate("/");
    } else {
      toast({
        variant: "destructive",
        title: "Error de autenticación",
        description: "Credenciales incorrectas",
      });
    }
  };

  // Handle keyboard events safely
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key && e.key.toLowerCase() === "enter") {
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLInputElement) {
        e.preventDefault();
        handleLogin(new Event("submit") as React.FormEvent);
      }
    }
  };

  // Add and remove event listener safely
  React.useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [email, password]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary">Supply Chain ML</h1>
          <p className="text-gray-500 mt-2">Inicia sesión para continuar</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Correo electrónico
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Contraseña
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Iniciar sesión
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;