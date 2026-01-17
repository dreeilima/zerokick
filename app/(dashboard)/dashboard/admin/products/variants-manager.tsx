"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiAddLine, RiDeleteBinLine } from "@remixicon/react";
import { createVariant, deleteVariant } from "@/app/actions/product-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Helper for useFormState
import { useFormState } from "react-dom";

type Variant = {
  id: number;
  name: string;
  type: string;
  interval: string;
  price: number;
  active: boolean;
};

const initialState = {
  message: "",
};

export function VariantsManager({
  productId,
  variants,
}: {
  productId: number;
  variants: Variant[];
}) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja remover esta variante?")) return;

    setIsDeleting(id);
    const res = await deleteVariant(id);
    setIsDeleting(null);

    if (res.success) {
      toast.success("Variante removida.");
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Planos & Variantes</h2>

      {/* List */}
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Intervalo</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variants.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  Nenhum plano cadastrado. Adicione um abaixo.
                </TableCell>
              </TableRow>
            ) : (
              variants.map((variant) => (
                <TableRow key={variant.id}>
                  <TableCell className="font-medium">{variant.name}</TableCell>
                  <TableCell className="uppercase text-xs font-bold">
                    {variant.type}
                  </TableCell>
                  <TableCell className="capitalize">
                    {variant.interval}
                  </TableCell>
                  <TableCell>
                    {(variant.price / 100).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(variant.id)}
                      disabled={isDeleting === variant.id}
                      className="text-red-500 hover:text-red-400"
                    >
                      <RiDeleteBinLine className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add New Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Adicionar Novo Plano</CardTitle>
        </CardHeader>
        <CardContent>
          <AddVariantForm productId={productId} />
        </CardContent>
      </Card>
    </div>
  );
}

function AddVariantForm({ productId }: { productId: number }) {
  // @ts-ignore
  const [state, formAction] = useFormState(createVariant, initialState);

  // We can use refs to clear form or key to reset, but simple specific component wrapping useFormState is cleaner.
  // For simplicity, showing controlled inputs isn't strictly needed with server actions unless we want to clear them.
  // I'll just rely on standard behavior or basic state if needed.

  return (
    <form
      action={formAction}
      className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end"
    >
      <input type="hidden" name="productId" value={productId} />

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="name">Nome (Ex: Mensal)</Label>
        <Input name="name" placeholder="Nome do plano" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Driver</Label>
        <Select name="type" defaultValue="universal">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="universal">Universal</SelectItem>
            <SelectItem value="logitech">Logitech</SelectItem>
            <SelectItem value="razer">Razer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="interval">Duração</Label>
        <Select name="interval" defaultValue="month">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Semanal</SelectItem>
            <SelectItem value="month">Mensal</SelectItem>
            <SelectItem value="lifetime">Vitalício</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Preço (R$)</Label>
        <Input
          name="price"
          type="number"
          step="0.01"
          placeholder="0.00"
          required
        />
      </div>

      <div className="md:col-span-1 pt-2">
        <Button
          type="submit"
          className="w-full bg-cyan-500 text-black hover:bg-cyan-400 font-bold"
        >
          <RiAddLine className="mr-2 h-4 w-4" /> Adicionar
        </Button>
      </div>
      {state?.message && (
        <p className="text-xs text-red-500 md:col-span-5">{state.message}</p>
      )}
    </form>
  );
}
