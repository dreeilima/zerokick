"use server";

import { checkAdmin } from "@/lib/auth/server";
import { db } from "@/lib/db";
import { products, productVariants, games } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

// Zod Schemas
const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  slug: z.string().min(1, "Slug é obrigatório"),
  description: z.string().optional(),
  imageUrl: z
    .string()
    .url("URL de imagem inválida")
    .optional()
    .or(z.literal("")),
  videoUrl: z
    .string()
    .url("URL de vídeo inválida")
    .optional()
    .or(z.literal("")),
  basePrice: z.coerce.number().min(0, "Preço deve ser maior ou igual a 0"),
  gameId: z.coerce.number().min(1, "Selecione um jogo"),
  active: z.coerce.boolean().default(true),
});

export async function createProduct(prevState: any, formData: FormData) {
  await checkAdmin();

  const validatedFields = productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl"),
    videoUrl: formData.get("videoUrl"),
    basePrice: formData.get("basePrice"),
    gameId: formData.get("gameId"),
    active: formData.get("active") === "on",
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erro na validação dos campos.",
    };
  }

  const { data } = validatedFields;

  try {
    await db.insert(products).values({
      name: data.name,
      slug: data.slug,
      description: data.description || null,
      imageUrl: data.imageUrl || null,
      videoUrl: data.videoUrl || null,
      basePrice: Math.round(data.basePrice * 100), // Convert to cents
      gameId: data.gameId,
      active: data.active,
    });
  } catch (error) {
    console.error("Create product error:", error);
    return { message: "Erro ao criar produto. Verifique se o slug já existe." };
  }

  revalidatePath("/dashboard/admin/products");
  redirect("/dashboard/admin/products");
}

// Wrapper for deleteProduct to be compatible with form action or direct call
export async function deleteProduct(id: number) {
  await checkAdmin();
  try {
    await db.delete(products).where(eq(products.id, id));
    revalidatePath("/dashboard/admin/products");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Erro ao deletar produto." };
  }
}

export async function updateProduct(
  id: number,
  prevState: any,
  formData: FormData,
) {
  await checkAdmin();

  const validatedFields = productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl"),
    videoUrl: formData.get("videoUrl"),
    basePrice: formData.get("basePrice"),
    gameId: formData.get("gameId"),
    active: formData.get("active") === "on",
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Erro na validação dos campos.",
    };
  }

  const { data } = validatedFields;

  try {
    await db
      .update(products)
      .set({
        name: data.name,
        slug: data.slug,
        description: data.description || null,
        imageUrl: data.imageUrl || null,
        videoUrl: data.videoUrl || null,
        basePrice: Math.round(data.basePrice * 100),
        gameId: data.gameId,
        active: data.active,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id));
  } catch (error) {
    console.error("Update product error:", error);
    return { message: "Erro ao atualizar produto." };
  }

  revalidatePath("/dashboard/admin/products");
  revalidatePath(`/dashboard/admin/products/${id}/edit`);
  // We don't redirect here to allow user to continue editing variants
  return { message: "Produto atualizado com sucesso!", success: true };
}

// Variants
const variantSchema = z.object({
  productId: z.coerce.number(),
  name: z.string().min(1, "Nome é obrigatório"),
  type: z.enum(["logitech", "razer", "universal"]),
  interval: z.enum(["week", "month", "lifetime"]),
  price: z.coerce.number().min(0),
  active: z.coerce.boolean().default(true),
});

export async function createVariant(prevState: any, formData: FormData) {
  await checkAdmin();

  const validatedFields = variantSchema.safeParse({
    productId: formData.get("productId"),
    name: formData.get("name"),
    type: formData.get("type"),
    interval: formData.get("interval"),
    price: formData.get("price"),
    active: true, // default
  });

  if (!validatedFields.success) {
    return {
      message:
        "Dados inválidos: " +
        JSON.stringify(validatedFields.error.flatten().fieldErrors),
    };
  }

  const { data } = validatedFields;

  try {
    await db.insert(productVariants).values({
      productId: data.productId,
      name: data.name,
      type: data.type,
      interval: data.interval,
      price: Math.round(data.price * 100),
      active: data.active,
    });
    revalidatePath(`/dashboard/admin/products/${data.productId}/edit`);
    return { success: true, message: "Variante adicionada!" };
  } catch (error) {
    return { message: "Erro ao criar variante." };
  }
}

export async function deleteVariant(id: number) {
  await checkAdmin();
  try {
    await db.delete(productVariants).where(eq(productVariants.id, id));
    // We revalidate broadly or specific path if possible.
    // Since this is a server action called from client, we rely on NEXT_REDIRECT or just revalidate path.
    revalidatePath("/dashboard/admin/products/[id]/edit", "page");
    return { success: true };
  } catch (error) {
    return { success: false, message: "Erro ao deletar variante." };
  }
}
