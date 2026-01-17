import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RiDownloadCloud2Line, RiWindowsFill } from "@remixicon/react";
import Link from "next/link";

export function DownloadSection() {
  return (
    <Card className="bg-gradient-to-br from-primary/10 via-background to-background border-primary/20 overflow-hidden relative h-full">
      <div className="absolute top-0 right-0 p-32 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <CardContent className="p-6 flex flex-col gap-4 relative z-10 h-full">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2 text-primary font-medium text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/75 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Versão v2.4.1 Disponível
          </div>
          
          <h2 className="text-2xl font-bold tracking-tight">
            Baixe o <span className="text-primary">ZeroKick Loader</span>
          </h2>
          
          <p className="text-muted-foreground">
            Acesso instantâneo a todos os macros. Detecção automática de armas e atualizações em tempo real.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button size="lg" className="w-full shadow-lg shadow-primary/20" asChild>
            <Link href="/dashboard/downloads">
              <RiDownloadCloud2Line className="mr-2 h-5 w-5" />
              Baixar para Windows
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="w-full" asChild>
            <Link href="/dashboard/tutorials">
              Como Instalar
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
