"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  RiSearchLine,
  RiFilter3Line,
  RiGamepadLine,
  RiFireLine,
} from "@remixicon/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Define Product type based on usage or import from schema type
type Product = {
  id: number;
  gameId: number;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  basePrice: number;
  active: boolean;
  // We might need to join game name?
  // For now we'll assume product has game info joined if needed, or we map it.
  // The previous mock had 'game' string.
  // The DB product has `gameId`.
  // We should pass "gameName" from server or join it.
  game?: { name: string };
};

const GAMES = [
  "Todos",
  "Counter-Strike 2",
  "Valorant",
  "Apex Legends",
  "Rainbow Six Siege",
];

export function ShopList({ products }: { products: any[] }) {
  const [selectedGame, setSelectedGame] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    // Determine game name from relation or map manually if missing
    // Ideally the server passes it.
    const gameName = product.game?.name || "Unknown";

    const matchesGame = selectedGame === "Todos" || gameName === selectedGame;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gameName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGame && matchesSearch;
  });

  return (
    <div className="w-full h-full p-4 md:p-6 space-y-6">
      {/* Filters & Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center rounded-xl border border-border bg-card/50 p-4 shadow-sm">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          <RiFilter3Line className="h-5 w-5 text-muted-foreground mr-2" />

          {GAMES.map((game) => (
            <Button
              key={game}
              // Explicitly use 'default' only when selected, else 'ghost'
              variant={selectedGame === game ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedGame(game)}
              className={cn(
                "rounded-full text-xs font-bold uppercase tracking-wider transition-all",
                selectedGame === game
                  ? // FORCE BLACK TEXT AND CYAN BACKGROUND
                    "bg-cyan-500 text-black hover:bg-cyan-400 shadow-md border-0"
                  : // UNSELECTED HOVER: Ensure text is dark/visible
                    "text-muted-foreground hover:bg-muted hover:text-foreground font-normal",
              )}
            >
              {game}
            </Button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            className="pl-9 bg-background focus-visible:ring-cyan-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in-95 duration-500 rounded-xl border border-dashed border-border bg-card/30">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
            <RiGamepadLine className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Nenhum produto encontrado
          </h3>
          <p className="text-muted-foreground text-sm">
            Tente ajustar seus filtros de busca.
          </p>
          <Button
            variant="link"
            onClick={() => {
              setSelectedGame("Todos");
              setSearchQuery("");
            }}
            className="text-cyan-500 mt-2"
          >
            Limpar Filtros
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({ product, index }: { product: any; index: number }) {
  const gameName = product.game?.name || "Game";

  return (
    <Card
      className="group flex flex-col justify-between relative bg-card h-full border-border overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Image Area */}
      <div className="h-48 overflow-hidden relative bg-muted">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        ) : null}

        {/* Fallback pattern if image fails/missing */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {/* Featured logic or generic popular check */}
          {product.id % 2 === 0 && (
            <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20 backdrop-blur-md uppercase text-[10px] font-bold tracking-widest px-2 py-0.5">
              <RiFireLine className="h-3 w-3 mr-1" />
              Popular
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-5 flex flex-col flex-1 relative z-10">
        <div className="mb-4">
          <span className="text-cyan-500 text-xs font-bold uppercase tracking-widest mb-1 block">
            {gameName}
          </span>
          <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-cyan-500 transition-colors">
            {product.name}
          </h3>
        </div>

        <p className="text-sm text-muted-foreground mb-6 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground font-semibold">
              A partir de
            </span>
            <span className="text-xl font-bold text-foreground">
              {(product.basePrice / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>

          <Link href={`/dashboard/shop/${product.slug}`}>
            <Button
              size="sm"
              className="font-bold bg-secondary text-secondary-foreground hover:bg-cyan-500 hover:text-black transition-colors shadow-sm"
            >
              COMPRAR
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
