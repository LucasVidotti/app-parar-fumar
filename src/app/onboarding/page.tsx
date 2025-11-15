"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/custom/logo";
import { Calendar, DollarSign, Cigarette, ArrowRight } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    quit_date: new Date().toISOString().split("T")[0],
    cigarettes_per_day: 20,
    price_per_pack: 12,
    cigarettes_per_pack: 20,
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { error } = await supabase.from("users").insert({
        id: user.id,
        email: user.email!,
        name: formData.name,
        quit_date: formData.quit_date,
        cigarettes_per_day: formData.cigarettes_per_day,
        price_per_pack: formData.price_per_pack,
        cigarettes_per_pack: formData.cigarettes_per_pack,
        visibility: "public",
        location: null,
        about: null,
      });

      if (error) throw error;

      router.push("/");
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      alert("Erro ao salvar seus dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 shadow-2xl border-emerald-100">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size={80} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent mb-2">
            Bem-vindo ao VamosJuntos!
          </h1>
          <p className="text-gray-600">
            Vamos configurar sua jornada em {step}/3 passos
          </p>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-gray-700 font-semibold mb-2 block">
                Como você gostaria de ser chamado?
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Seu nome"
                className="text-lg"
              />
            </div>

            <div>
              <Label htmlFor="quit_date" className="text-gray-700 font-semibold mb-2 block flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                Quando você parou de fumar?
              </Label>
              <Input
                id="quit_date"
                type="date"
                value={formData.quit_date}
                onChange={(e) => setFormData({ ...formData, quit_date: e.target.value })}
                max={new Date().toISOString().split("T")[0]}
                className="text-lg"
              />
              <p className="text-sm text-gray-500 mt-2">
                Se você está começando hoje, deixe a data de hoje mesmo
              </p>
            </div>

            <Button
              onClick={() => setStep(2)}
              disabled={!formData.name || !formData.quit_date}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-lg py-6"
            >
              Continuar
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <Label htmlFor="cigarettes_per_day" className="text-gray-700 font-semibold mb-2 block flex items-center gap-2">
                <Cigarette className="w-5 h-5 text-red-600" />
                Quantos cigarros você fumava por dia?
              </Label>
              <Input
                id="cigarettes_per_day"
                type="number"
                min="1"
                value={formData.cigarettes_per_day}
                onChange={(e) =>
                  setFormData({ ...formData, cigarettes_per_day: parseInt(e.target.value) || 0 })
                }
                className="text-lg"
              />
            </div>

            <div>
              <Label htmlFor="cigarettes_per_pack" className="text-gray-700 font-semibold mb-2 block">
                Quantos cigarros vêm em um maço?
              </Label>
              <Input
                id="cigarettes_per_pack"
                type="number"
                min="1"
                value={formData.cigarettes_per_pack}
                onChange={(e) =>
                  setFormData({ ...formData, cigarettes_per_pack: parseInt(e.target.value) || 0 })
                }
                className="text-lg"
              />
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="flex-1 text-lg py-6"
              >
                Voltar
              </Button>
              <Button
                onClick={() => setStep(3)}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-lg py-6"
              >
                Continuar
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <Label htmlFor="price_per_pack" className="text-gray-700 font-semibold mb-2 block flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                Quanto custava um maço?
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
                  R$
                </span>
                <Input
                  id="price_per_pack"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price_per_pack}
                  onChange={(e) =>
                    setFormData({ ...formData, price_per_pack: parseFloat(e.target.value) || 0 })
                  }
                  className="text-lg pl-12"
                />
              </div>
            </div>

            <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
              <h3 className="font-bold text-lg mb-3 text-emerald-900">Resumo</h3>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Nome:</strong> {formData.name}
                </p>
                <p>
                  <strong>Data de parada:</strong>{" "}
                  {new Date(formData.quit_date).toLocaleDateString("pt-BR")}
                </p>
                <p>
                  <strong>Cigarros por dia:</strong> {formData.cigarettes_per_day}
                </p>
                <p>
                  <strong>Preço do maço:</strong> R$ {formData.price_per_pack.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="flex-1 text-lg py-6"
              >
                Voltar
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-lg py-6"
              >
                {loading ? "Salvando..." : "Começar Jornada"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        <div className="flex justify-center gap-2 mt-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-3 h-3 rounded-full transition-colors ${
                s === step ? "bg-emerald-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
