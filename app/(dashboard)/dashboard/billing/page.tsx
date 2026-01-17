import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RiVipCrownLine, RiCheckLine, RiArrowRightLine } from "@remixicon/react";
import Link from "next/link";

export default function BillingPage() {
  // Mock data - será substituído por dados reais do Stripe/LemonSqueezy
  const currentPlan = {
    name: "Free Plan",
    status: "active",
    price: "R$ 0,00",
    billingCycle: "mensal",
    nextBilling: null,
  };

  const availablePlans = [
    {
      id: "basic",
      name: "Basic",
      price: "R$ 49,90",
      priceUSD: "$14.99",
      interval: "mês",
      features: [
        "Acesso a 2 jogos",
        "Macros básicos",
        "Suporte por email",
        "Atualizações mensais",
      ],
      popular: false,
    },
    {
      id: "pro",
      name: "Pro",
      price: "R$ 129,90",
      priceUSD: "$39.99",
      interval: "mês",
      features: [
        "Acesso a TODOS os jogos",
        "Macros avançados",
        "Suporte prioritário 24/7",
        "Atualizações semanais",
        "Configurações personalizadas",
        "Acesso antecipado a novos jogos",
      ],
      popular: true,
    },
    {
      id: "lifetime",
      name: "Lifetime",
      price: "R$ 429,90",
      priceUSD: "$129.99",
      interval: "único",
      features: [
        "Acesso VITALÍCIO a todos os jogos",
        "Todos os recursos Pro",
        "Suporte VIP prioritário",
        "Atualizações garantidas para sempre",
        "Sem mensalidades",
        "Melhor custo-benefício",
      ],
      popular: false,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Plano Atual */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <RiVipCrownLine className="h-5 w-5 text-muted-foreground" />
                Plano Atual
              </CardTitle>
              <CardDescription>Informações sobre sua assinatura ativa</CardDescription>
            </div>
            <Badge variant={currentPlan.status === "active" ? "default" : "secondary"}>
              {currentPlan.status === "active" ? "Ativo" : "Inativo"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">{currentPlan.name}</span>
            <span className="text-muted-foreground">• {currentPlan.price}/{currentPlan.billingCycle}</span>
          </div>
          
          {currentPlan.nextBilling ? (
            <p className="text-sm text-muted-foreground">
              Próxima cobrança em: <span className="font-medium text-foreground">{currentPlan.nextBilling}</span>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Você está no plano gratuito. Faça upgrade para desbloquear todos os recursos.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Planos Disponíveis */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Planos Disponíveis</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {availablePlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${plan.popular ? "border-primary shadow-lg shadow-primary/10" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Mais Popular
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.interval}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{plan.priceUSD} USD</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <RiCheckLine className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                >
                  Selecionar Plano
                  <RiArrowRightLine className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Informações Adicionais */}
      <Card>
        <CardHeader>
          <CardTitle>Informações de Pagamento</CardTitle>
          <CardDescription>
            Métodos de pagamento aceitos e políticas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>• Aceitamos Pix, Cartão de Crédito e PayPal</p>
          <p>• Pagamentos processados de forma segura via Stripe</p>
          <p>• Cancele a qualquer momento, sem taxas de cancelamento</p>
          <p>• Garantia de reembolso de 7 dias em todos os planos</p>
        </CardContent>
      </Card>
    </div>
  );
}
