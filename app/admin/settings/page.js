import { requireAuth } from "@/lib/adminGuard";
import AdminShell from "@/components/AdminShell";
import SettingsManager from "./Manager";

export const dynamic = "force-dynamic";

export default function Page() {
  requireAuth();
  return (
    <AdminShell title="Site Settings">
      <SettingsManager />
    </AdminShell>
  );
}
