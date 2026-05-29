import { requireAuth } from "@/lib/adminGuard";
import AdminShell from "@/components/AdminShell";
import DestinationsManager from "./Manager";

export const dynamic = "force-dynamic";

export default function Page() {
  requireAuth();
  return (
    <AdminShell title="Destinations">
      <DestinationsManager />
    </AdminShell>
  );
}
