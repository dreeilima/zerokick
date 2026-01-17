"use client";

import { useActionState } from "react";
// ^ Note: Next.js 15 uses useActionState, Next.js 14 uses useFormState from react-dom
import { useFormStatus } from "react-dom";
import { createProduct, updateProduct } from "@/app/actions/product-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiSaveLine, RiArrowLeftLine } from "@remixicon/react";
import Link from "next/link";
// Helper for useFormState (React 18/Next 14)
import { useFormState } from "react-dom";

// Types
type Game = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  videoUrl: string | null;
  basePrice: number;
  gameId: number;
  active: boolean;
};

const initialState = {
  message: "",
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full md:w-auto bg-cyan-500 text-black hover:bg-cyan-400 font-bold"
    >
      {pending ? (
        <>Salvando...</>
      ) : (
        <>
          <RiSaveLine className="mr-2 h-5 w-5" /> Salvar Produto
        </>
      )}
    </Button>
  );
}

export function ProductForm({
  games,
  product,
}: {
  games: Game[];
  product?: Product;
}) {
  // Bind ID if editing
  const action = product ? updateProduct.bind(null, product.id) : createProduct;

  // @ts-ignore
  const [state, formAction] = useFormState(action, initialState);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/admin/products">
          <Button variant="ghost" size="icon">
            <RiArrowLeftLine className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">
            {product ? "Editar Produto" : "Novo Produto"}
          </h1>
          <p className="text-muted-foreground">
            {product
              ? "Atualize os dados do produto."
              : "Preencha os dados do macro."}
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <form action={formAction} className="space-y-6">
            {state?.message && (state as any).success && (
              <div className="p-3 rounded-md bg-green-500/10 text-green-500 text-sm font-medium">
                {state.message}
              </div>
            )}

            {state?.message && !(state as any).success && (
              <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium">
                {state.message}
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="active"
                className="flex items-center justify-between"
              >
                <span>Produto Ativo</span>
                <Switch
                  name="active"
                  defaultChecked={product?.active ?? true}
                  id="active"
                />
              </Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Produto</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={product?.name}
                  placeholder="Ex: CS2 - Legit Macro"
                  required
                />
                {(state as any)?.errors?.name && (
                  <p className="text-xs text-destructive">
                    {(state as any).errors.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  name="slug"
                  defaultValue={product?.slug}
                  placeholder="cs2-legit-macro"
                  required
                />
                {(state as any)?.errors?.slug && (
                  <p className="text-xs text-destructive">
                    {(state as any).errors.slug}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gameId">Jogo</Label>
              <Select
                name="gameId"
                defaultValue={product?.gameId.toString()}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o Jogo" />
                </SelectTrigger>
                <SelectContent>
                  {games.map((game) => (
                    <SelectItem key={game.id} value={game.id.toString()}>
                      {game.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {(state as any)?.errors?.gameId && (
                <p className="text-xs text-destructive">
                  {(state as any).errors.gameId}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="basePrice">Preço Base (R$)</Label>
              <Input
                id="basePrice"
                name="basePrice"
                type="number"
                step="0.01"
                min="0"
                defaultValue={product ? product.basePrice / 100 : ""}
                placeholder="0.00"
                required
              />
              <p className="text-[10px] text-muted-foreground">
                Preço visual apenas.
              </p>
              {(state as any)?.errors?.basePrice && (
                <p className="text-xs text-destructive">
                  {(state as any).errors.basePrice}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={product?.description || ""}
                placeholder="Detalhes do produto..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL da Imagem</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                defaultValue={product?.imageUrl || ""}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoUrl">URL do Vídeo</Label>
              <Input
                id="videoUrl"
                name="videoUrl"
                defaultValue={product?.videoUrl || ""}
                placeholder="https://..."
              />
            </div>

            <div className="flex justify-end pt-4">
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>

      {!product && (
        <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-sm">
          <span className="font-bold">Nota:</span> Você poderá adicionar planos
          (variantes) após salvar o produto.
        </div>
      )}
    </div>
  );
}
