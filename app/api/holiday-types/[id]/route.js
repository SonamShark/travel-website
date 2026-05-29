import { itemGet, itemPut, itemDelete } from "@/lib/crud";
export const GET = itemGet("holidayTypes");
export const PUT = itemPut("holidayTypes");
export const DELETE = itemDelete("holidayTypes");
