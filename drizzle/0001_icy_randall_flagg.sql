CREATE TABLE "cart" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text,
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cart_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"cart_id" text NOT NULL,
	"product_variant_id" integer NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"added_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product_variants" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"interval" text NOT NULL,
	"price" integer NOT NULL,
	"stripe_price_id" text,
	"active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"game_id" integer NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"image_url" text,
	"video_url" text,
	"base_price" integer NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
DROP TABLE "anotacoes" CASCADE;--> statement-breakpoint
DROP TABLE "cartoes" CASCADE;--> statement-breakpoint
DROP TABLE "categorias" CASCADE;--> statement-breakpoint
DROP TABLE "contas" CASCADE;--> statement-breakpoint
DROP TABLE "faturas" CASCADE;--> statement-breakpoint
DROP TABLE "installment_anticipations" CASCADE;--> statement-breakpoint
DROP TABLE "lancamentos" CASCADE;--> statement-breakpoint
DROP TABLE "orcamentos" CASCADE;--> statement-breakpoint
DROP TABLE "pagador_shares" CASCADE;--> statement-breakpoint
DROP TABLE "pagadores" CASCADE;--> statement-breakpoint
DROP TABLE "saved_insights" CASCADE;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "stripeCustomerId" text;--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_cart_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."cart"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_variant_id_product_variants_id_fk" FOREIGN KEY ("product_variant_id") REFERENCES "public"."product_variants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_game_id_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE cascade ON UPDATE no action;