import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Masuk — UmrahPro" },
      { name: "description", content: "Masuk ke panel manajemen travel umroh UmrahPro." },
      { property: "og:title", content: "Masuk — UmrahPro" },
      { property: "og:description", content: "Masuk ke panel manajemen travel umroh UmrahPro." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="pattern-islamic flex min-h-screen items-center justify-center px-4 py-10">
      <Card className="card-elevated w-full max-w-md">
        <CardHeader className="items-center text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
            <Moon className="size-6" />
          </div>
          <CardTitle className="mt-3 font-display text-2xl">Masuk ke UmrahPro</CardTitle>
          <CardDescription>Sistem manajemen travel umroh</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.includes("@") || password.length < 6) {
                setError("Email harus valid dan kata sandi minimal 6 karakter.");
                return;
              }
              setError(null);
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="nama@travel.co.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Kata Sandi</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full">
              Masuk
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              Autentikasi nyata diaktifkan pada fase berikutnya.{" "}
              <Link to="/" className="font-medium text-primary underline-offset-4 hover:underline">
                Lihat demo dashboard
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
