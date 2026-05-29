import { listHandler, createHandler } from "@/lib/crud";
export const GET = listHandler("packages");
export const POST = createHandler("packages");
