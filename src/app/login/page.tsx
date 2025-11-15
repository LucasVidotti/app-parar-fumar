"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/custom/logo";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se já está autenticado
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push("/");
      } else {
        setLoading(false);
      }
    });

    // Listener para mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center">
        <div className="animate-pulse">
          <Logo size={80} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-2xl border-emerald-100">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size={80} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent mb-2">
            VamosJuntos!
          </h1>
          <p className="text-gray-600">
            Sua jornada para uma vida sem fumar começa aqui
          </p>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#10b981",
                  brandAccent: "#059669",
                },
              },
            },
          }}
          localization={{
            variables: {
              sign_in: {
                email_label: "Email",
                password_label: "Senha",
                button_label: "Entrar",
                loading_button_label: "Entrando...",
                social_provider_text: "Entrar com {{provider}}",
                link_text: "Já tem uma conta? Entre",
              },
              sign_up: {
                email_label: "Email",
                password_label: "Senha",
                button_label: "Criar conta",
                loading_button_label: "Criando conta...",
                social_provider_text: "Cadastrar com {{provider}}",
                link_text: "Não tem uma conta? Cadastre-se",
              },
              forgotten_password: {
                link_text: "Esqueceu sua senha?",
                button_label: "Enviar instruções",
                loading_button_label: "Enviando...",
              },
            },
          }}
          providers={[]}
        />

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Ao criar uma conta, você concorda com nossos{" "}
            <span className="text-emerald-600 hover:underline cursor-pointer">
              Termos de Uso
            </span>{" "}
            e{" "}
            <span className="text-emerald-600 hover:underline cursor-pointer">
              Política de Privacidade
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
}
