import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RiTimeLine, RiVipCrownLine } from "@remixicon/react";
import Link from "next/link";

export function SubscriptionCard() {
  // Mock data - será substituído por dados reais do usuário/stripe
  const subscription = {
    plan: "Free Plan",
    status: "inactive", // active | inactive
    daysLeft: 0,
  };

  const isActive = subscription.status === "active";

  return (
    <Card className="flex flex-col h-full border-l-4 border-l-primary/50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Sua Assinatura
          </CardTitle>
          <RiVipCrownLine className={`h-5 w-5 ${isActive ? "text-yellow-500" : "text-muted-foreground"}`} />
        </div>
        <div className="flex items-center gap-2 mt-2">
          <h3 className="text-2xl font-bold">{subscription.plan}</h3>
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "Ativo" : "Inativo"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
          <RiTimeLine className="h-4 w-4" />
          {isActive ? (
            <span>Expira em <span className="text-foreground font-medium">{subscription.daysLeft} dias</span></span>
          ) : (
            <span>Nenhuma assinatura ativa</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Button asChild className="w-full" variant={isActive ? "outline" : "default"}>
          <Link href="/dashboard/billing">
            {isActive ? "Gerenciar Assinatura" : "Fazer Upgrade Agora"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
