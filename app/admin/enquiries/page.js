import { requireAuth } from "@/lib/adminGuard";
import AdminShell from "@/components/AdminShell";
import EnquiriesManager from "./Manager";

export const dynamic = "force-dynamic";

export default function Page() {
  requireAuth();
  return (
    <AdminShell title="Enquiries">
      <EnquiriesManager />
    </AdminShell>
  );
}
