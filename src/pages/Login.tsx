import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const MAX_ATTEMPTS = 5;
  const BLOCK_DURATION = 15 * 60 * 1000; // 15 minutes

  const validateInput = (input: string) => {
    // Prevent SQL injection and XSS
    const dangerousPatterns = [
      "'",
      '"',
      ";",
      "--",
      "/*",
      "*/",
      "xp_",
      "<script>",
      "javascript:",
      "onerror=",
      "onload=",
      "onclick="
    ];
    return !dangerousPatterns.some(pattern => input.toLowerCase().includes(pattern));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isBlocked) {
      toast({
        variant: "destructive",
        title: "Acceso bloqueado",
        description: "Demasiados intentos fallidos. Intente más tarde.",
      });
      return;
    }

    if (!validateInput(email) || !validateInput(password)) {
      toast({
        variant: "destructive",
        title: "Entrada inválida",
        description: "Los datos ingresados contienen caracteres no permitidos",
      });
      return;
    }

    try {
      // Simulated login - replace with actual API call
      if (email === "demo@example.com" && password === "demo123") {
        // Clear sensitive data
        setPassword("");
        localStorage.setItem("isAuthenticated", "true");
        // Store only non-sensitive session data
        sessionStorage.setItem("lastLogin", new Date().toISOString());
        
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido al sistema",
        });
        navigate("/dashboard");
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        
        if (newAttempts >= MAX_ATTEMPTS) {
          setIsBlocked(true);
          setTimeout(() => {
            setIsBlocked(false);
            setAttempts(0);
          }, BLOCK_DURATION);
          
          toast({
            variant: "destructive",
            title: "Cuenta bloqueada",
            description: "Demasiados intentos fallidos. Intente en 15 minutos.",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error de autenticación",
            description: `Credenciales incorrectas. Intentos restantes: ${MAX_ATTEMPTS - newAttempts}`,
          });
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error al procesar la solicitud",
      });
    }
  };

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
              aria-label="correo"
              disabled={isBlocked}
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
              aria-label="contraseña"
              disabled={isBlocked}
              autoComplete="current-password"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isBlocked}>
            Iniciar sesión
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;