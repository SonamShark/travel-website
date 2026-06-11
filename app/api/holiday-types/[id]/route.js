import { itemGet, itemPut, itemDelete } from "@/lib/crud";
export const dynamic = "force-dynamic";
export const GET = itemGet("holiday_types");
export const PUT = itemPut("holiday_types");
export const DELETE = itemDelete("holiday_types");
