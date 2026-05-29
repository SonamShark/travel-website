import { requireAuth } from "@/lib/adminGuard";
import AdminShell from "@/components/AdminShell";
import HolidayTypesManager from "./Manager";

export const dynamic = "force-dynamic";

export default function Page() {
  requireAuth();
  return (
    <AdminShell title="Holiday Types">
      <HolidayTypesManager />
    </AdminShell>
  );
}
