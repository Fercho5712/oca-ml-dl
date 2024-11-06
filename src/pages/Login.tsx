import React, { useState } from "react";
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
    if (email === "demo@example.com" && password === "demo123") {
      localStorage.setItem("isAuthenticated", "true");
      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido al sistema",
      });
      navigate("/dashboard");
    } else {
      toast({
        variant: "destructive",
        title: "Error de autenticación",
        description: "Credenciales incorrectas",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const form = (e.target as HTMLElement).closest('form');
      if (form) {
        e.preventDefault();
        handleLogin(e);
      }
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
              onKeyPress={handleKeyPress}
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
              onKeyPress={handleKeyPress}
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