import { itemGet, itemPut, itemDelete } from "@/lib/crud";
export const GET = itemGet("packages");
export const PUT = itemPut("packages");
export const DELETE = itemDelete("packages");
