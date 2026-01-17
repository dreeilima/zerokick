import { checkAdmin } from "@/lib/auth/server";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { RiAddLine, RiEditLine, RiDeleteBinLine } from "@remixicon/react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  await checkAdmin();

  const products = await db.query.products.findMany({
    orderBy: (products, { desc }) => [desc(products.createdAt)],
    with: {
      game: true,
    },
  });

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Produtos</h1>
          <p className="text-muted-foreground">Gerencie os produtos da loja.</p>
        </div>
        <Link href="/dashboard/admin/products/new">
          <Button className="bg-cyan-500 text-black hover:bg-cyan-400 font-bold">
            <RiAddLine className="mr-2 h-5 w-5" /> Novo Produto
          </Button>
        </Link>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Jogo</TableHead>
              <TableHead>Preço Base</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center h-24 text-muted-foreground"
                >
                  Nenhum produto cadastrado.
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.game.name}</TableCell>
                  <TableCell>
                    {(product.basePrice / 100).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </TableCell>
                  <TableCell>
                    {product.active ? (
                      <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 shadow-none border-0">
                        Ativo
                      </Badge>
                    ) : (
                      <Badge
                        variant="destructive"
                        className="shadow-none border-0"
                      >
                        Inativo
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link href={`/dashboard/admin/products/${product.id}/edit`}>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <RiEditLine className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-400"
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
    </div>
  );
}
