import { itemGet, itemPut, itemDelete } from "@/lib/crud";
export const dynamic = "force-dynamic";
export const GET = itemGet("destinations");
export const PUT = itemPut("destinations");
export const DELETE = itemDelete("destinations");
