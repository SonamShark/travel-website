import { listHandler, createHandler } from "@/lib/crud";
export const dynamic = "force-dynamic";
export const GET = listHandler("holiday_types");
export const POST = createHandler("holiday_types");
