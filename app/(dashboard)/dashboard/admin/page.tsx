import { checkAdmin } from "@/lib/auth/server";
import { db } from "@/lib/db";
import {
  RiFundsBoxLine,
  RiGroupLine,
  RiGamepadLine,
  RiShoppingCartLine,
} from "@remixicon/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await checkAdmin();

  // Fetch basic stats
  const userCount = await db.$count(db.query.user, (u) => undefined);
  const productsCount = await db.$count(db.query.products, (p) => undefined);
  const licenseCount = await db.$count(db.query.licenses, (l) => undefined);

  // Mock revenue for now as transactions table might be empty
  const revenue = 0;

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Painel Administrativo
        </h1>
        <p className="text-muted-foreground">
          Visão geral do sistema e gerenciamento.
        </p>
      </div>

      <Separator />

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <RiFundsBoxLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {revenue.toLocaleString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground">+0% esse mês (Mock)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Usuários</CardTitle>
            <RiGroupLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
            <p className="text-xs text-muted-foreground">
              Registrados na plataforma
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Licenças Ativas
            </CardTitle>
            <RiGamepadLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{licenseCount}</div>
            <p className="text-xs text-muted-foreground">Em uso atualmente</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos</CardTitle>
            <RiShoppingCartLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productsCount}</div>
            <p className="text-xs text-muted-foreground">Disponíveis na loja</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Main Content Area - e.g. Recent Sales or User List */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
              Nenhuma atividade recente registrada.
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions / Status */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Status do Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Database</span>
                <span className="text-green-500 font-bold">Conectado</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Stripe Webhooks</span>
                <span className="text-yellow-500 font-bold">Pendente</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Versão Loader</span>
                <span className="text-muted-foreground">v2.0.0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
