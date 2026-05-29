import { redirect } from "next/navigation";
import { isAuthed } from "./auth";

// Call at the top of any protected admin server component.
export function requireAuth() {
  if (!isAuthed()) redirect("/admin/login");
}
