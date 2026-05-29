import { itemGet, itemPut, itemDelete } from "@/lib/crud";
export const GET = itemGet("blogs");
export const PUT = itemPut("blogs");
export const DELETE = itemDelete("blogs");
