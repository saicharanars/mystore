DO $$ BEGIN
 CREATE TYPE "public"."role" AS ENUM('seller', 'customer');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "location" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"address" varchar(256),
	"city" varchar(64),
	"state" varchar(64),
	"pincode" integer,
	"created_at" timestamp,
	"updated_at" timestamp,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(64),
	"email" varchar(64),
	"password" varchar(64),
	"role" "role",
	"created_at" timestamp,
	"updated_at" timestamp
);
