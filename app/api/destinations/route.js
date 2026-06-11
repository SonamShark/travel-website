import { listHandler, createHandler } from "@/lib/crud";
export const dynamic = "force-dynamic";
export const GET = listHandler("destinations");
export const POST = createHandler("destinations");
