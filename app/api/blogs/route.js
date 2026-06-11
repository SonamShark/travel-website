import { listHandler, createHandler } from "@/lib/crud";
export const dynamic = "force-dynamic";
export const GET = listHandler("blogs");
export const POST = createHandler("blogs");
