import { PricingTable } from "@/components/billing/pricing-table";

export default function BillingPage() {
  return (
    <div className="container py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Planos e Preços</h1>
        <p className="text-muted-foreground mt-2">
          Escolha o plano ideal para suas necessidades financeiras.
        </p>
      </div>
      <PricingTable />
    </div>
  );
}
