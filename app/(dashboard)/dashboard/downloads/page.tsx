import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RiDownloadCloud2Line, RiWindowsFill, RiCheckLine, RiAlertLine } from "@remixicon/react";
import Link from "next/link";

export default function DownloadsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Card Principal de Download */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl">ZeroKick Loader</CardTitle>
              <CardDescription>Versão 2.4.1 • Atualizado em 15 de Janeiro, 2026</CardDescription>
            </div>
            <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
              Estável
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h3 className="font-semibold">O que há de novo:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <RiCheckLine className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>Suporte aprimorado para CS2 (detecção automática de armas)</span>
              </li>
              <li className="flex items-start gap-2">
                <RiCheckLine className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>Correções de bugs no Valorant e Apex Legends</span>
              </li>
              <li className="flex items-start gap-2">
                <RiCheckLine className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>Interface redesenhada com modo escuro nativo</span>
              </li>
              <li className="flex items-start gap-2">
                <RiCheckLine className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <span>Melhorias de performance e estabilidade</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="flex-1 shadow-lg shadow-primary/20">
              <RiDownloadCloud2Line className="mr-2 h-5 w-5" />
              Baixar para Windows (64-bit)
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/dashboard/tutorials">
                Ver Tutorial de Instalação
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Requisitos do Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RiWindowsFill className="h-5 w-5" />
            Requisitos do Sistema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Mínimo</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Windows 10 (64-bit)</li>
                <li>• 4GB RAM</li>
                <li>• 500MB espaço livre</li>
                <li>• .NET Framework 4.8</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Recomendado</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Windows 11 (64-bit)</li>
                <li>• 8GB RAM</li>
                <li>• 1GB espaço livre</li>
                <li>• .NET Framework 4.8+</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aviso de Segurança */}
      <Card className="border-yellow-500/20 bg-yellow-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-600 dark:text-yellow-500">
            <RiAlertLine className="h-5 w-5" />
            Importante
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            • Sempre baixe o loader apenas através do dashboard oficial do ZeroKick.
          </p>
          <p>
            • Desative temporariamente seu antivírus durante a instalação (falsos positivos são comuns).
          </p>
          <p>
            • Nunca compartilhe seu arquivo de configuração ou credenciais com terceiros.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
