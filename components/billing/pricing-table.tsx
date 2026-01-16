"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { createCheckoutSession } from "@/app/actions/stripe";

export function PricingTable() {
  const handleUpgrade = async () => {
    await createCheckoutSession();
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Free</CardTitle>
          <CardDescription>Para começar a organizar suas finanças</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="text-3xl font-bold">R$ 0</div>
          <div className="text-muted-foreground text-sm">/mês</div>
          <ul className="mt-8 space-y-3">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>Até 2 contas bancárias</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>50 transações por mês</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>Dashboard básico</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="outline" disabled>
            Plano Atual
          </Button>
        </CardFooter>
      </Card>

      <Card className="flex flex-col border-primary shadow-lg">
        <CardHeader>
          <CardTitle>Pro</CardTitle>
          <CardDescription>Para controle total e sem limites</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="text-3xl font-bold">R$ 29,90</div>
          <div className="text-muted-foreground text-sm">/mês</div>
          <ul className="mt-8 space-y-3">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>Contas ilimitadas</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>Transações ilimitadas</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>Dashboard avançado com AI</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>Suporte prioritário</span>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleUpgrade}>
            Assinar Agora
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
