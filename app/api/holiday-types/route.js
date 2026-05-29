import { listHandler, createHandler } from "@/lib/crud";
export const GET = listHandler("holidayTypes");
export const POST = createHandler("holidayTypes");
