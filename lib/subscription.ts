import { db, schema } from "@/lib/db";
import { eq } from "drizzle-orm";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async (userId: string) => {
  const userSubscription = await db.query.subscription.findFirst({
    where: eq(schema.subscription.userId, userId),
  });

  if (!userSubscription) {
    return false;
  }

  const isValid =
    userSubscription.status === "active" &&
    userSubscription.currentPeriodEnd.getTime() + DAY_IN_MS > Date.now();

  return !!isValid;
};

// Limites do plano Gratuito
export const MAX_FREE_ACCOUNTS = 2;
export const MAX_FREE_TRANSACTIONS_PER_MONTH = 50;

export const canCreateAccount = async (userId: string) => {
  const isPro = await checkSubscription(userId);
  if (isPro) return true;

  const accountsCount = await db.$count(
    schema.contas,
    eq(schema.contas.userId, userId)
  );

  return accountsCount < MAX_FREE_ACCOUNTS;
};
