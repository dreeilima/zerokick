import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { RiLoader4Line } from "@remixicon/react";
import { apiClient } from "../lib/api-client";
import { useAuthStore } from "../lib/store";
import { Logo } from "../components/logo";
import { AuthHeader } from "../components/auth/auth-header";
import { AuthErrorAlert } from "../components/auth/auth-error-alert";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldDescription,
} from "../components/ui/field";
import { cn } from "../lib/utils";
import AuthSidebar from "../components/auth/auth-sidebar";

export function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { user } = await apiClient.login(email, password);
      login(user);
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login Page Error:", err);
      setError(err.message || "Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-muted flex min-h-screen flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className={cn("flex flex-col gap-6")}>
          <Logo
            variant="split"
            className="mb-6 justify-center md:justify-start"
          />
          <Card className="overflow-hidden p-0">
            <CardContent className="grid gap-0 p-0 md:grid-cols-[1.05fr_0.95fr]">
              <form
                className="flex flex-col gap-6 p-6 md:p-8"
                onSubmit={handleLogin}
                noValidate
              >
                <FieldGroup className="gap-4">
                  <AuthHeader
                    title="Acessar Dashboard"
                    description="Entre para gerenciar seus macros"
                  />

                  <AuthErrorAlert error={error} />

                  <Field>
                    <FieldLabel htmlFor="email">E-mail</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={cn(
                        error &&
                          "border-destructive focus-visible:ring-destructive",
                      )}
                      disabled={isLoading}
                    />
                  </Field>

                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Senha</FieldLabel>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      required
                      placeholder="********"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={cn(
                        error &&
                          "border-destructive focus-visible:ring-destructive",
                      )}
                      disabled={isLoading}
                    />
                  </Field>

                  <Field>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <RiLoader4Line className="h-4 w-4 animate-spin" />
                      ) : (
                        "Entrar"
                      )}
                    </Button>
                  </Field>

                  <FieldSeparator className="my-2" />

                  <Field>
                    <Button variant="outline" className="w-full" disabled>
                      Google (Em breve)
                    </Button>
                  </Field>

                  <FieldDescription className="text-center">
                    Não tem uma conta?{" "}
                    <a
                      href="http://localhost:3000/signup"
                      target="_blank"
                      className="underline underline-offset-4 text-primary hover:text-primary/80"
                    >
                      Inscreva-se
                    </a>
                  </FieldDescription>
                </FieldGroup>
              </form>

              <AuthSidebar />
            </CardContent>
          </Card>

          <FieldDescription className="text-center">
            <a
              href="http://localhost:3000"
              target="_blank"
              className="underline underline-offset-4 text-muted-foreground hover:text-foreground"
            >
              Voltar para o site
            </a>
          </FieldDescription>
        </div>
      </div>
    </div>
  );
}
