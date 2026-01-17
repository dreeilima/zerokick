import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RiPlayCircleLine, RiFileTextLine, RiQuestionLine } from "@remixicon/react";
import Link from "next/link";

const TUTORIALS = [
  {
    id: 1,
    title: "Instalação do ZeroKick Loader",
    description: "Guia completo de instalação passo a passo do loader no Windows.",
    duration: "5 min",
    difficulty: "Iniciante",
    icon: RiPlayCircleLine,
  },
  {
    id: 2,
    title: "Configuração Inicial",
    description: "Como configurar suas preferências e vincular sua conta aos jogos.",
    duration: "8 min",
    difficulty: "Iniciante",
    icon: RiFileTextLine,
  },
  {
    id: 3,
    title: "Usando Macros no CS2",
    description: "Tutorial específico para configurar e usar macros no Counter-Strike 2.",
    duration: "12 min",
    difficulty: "Intermediário",
    icon: RiPlayCircleLine,
  },
  {
    id: 4,
    title: "Usando Macros no Valorant",
    description: "Configuração otimizada de macros para Valorant com detecção automática.",
    duration: "10 min",
    difficulty: "Intermediário",
    icon: RiPlayCircleLine,
  },
  {
    id: 5,
    title: "Solução de Problemas Comuns",
    description: "Respostas para os problemas mais frequentes e como resolvê-los.",
    duration: "15 min",
    difficulty: "Avançado",
    icon: RiQuestionLine,
  },
  {
    id: 6,
    title: "Otimização de Performance",
    description: "Dicas para maximizar a performance dos macros sem comprometer o jogo.",
    duration: "7 min",
    difficulty: "Avançado",
    icon: RiFileTextLine,
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Iniciante":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "Intermediário":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "Avançado":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function TutorialsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2">
        {TUTORIALS.map((tutorial) => {
          const Icon = tutorial.icon;
          return (
            <Card key={tutorial.id} className="hover:border-primary/50 transition-colors cursor-pointer group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                      <CardDescription>{tutorial.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getDifficultyColor(tutorial.difficulty)}>
                    {tutorial.difficulty}
                  </Badge>
                  <span className="text-xs text-muted-foreground">• {tutorial.duration}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Card de Suporte */}
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
        <CardHeader>
          <CardTitle>Precisa de mais ajuda?</CardTitle>
          <CardDescription>
            Nossa equipe de suporte está disponível 24/7 para ajudá-lo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="https://discord.gg/zerokick" target="_blank" className="flex-1">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-4 text-center">
                  <p className="font-medium">Discord</p>
                  <p className="text-sm text-muted-foreground">Comunidade ativa</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="mailto:support@zerokick.com" className="flex-1">
              <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                <CardContent className="p-4 text-center">
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">Suporte direto</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
