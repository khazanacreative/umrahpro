import { useSyncExternalStore } from "react";
import type { Role } from "./roles";

const KEY = "umrahpro-role";
let current: Role = "super_admin";
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function setRole(role: Role) {
  current = role;
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, role);
  emit();
}

export function initRole() {
  if (typeof window === "undefined") return;
  const stored = window.localStorage.getItem(KEY) as Role | null;
  if (stored && stored !== current) {
    current = stored;
    emit();
  }
}

export function useRole(): Role {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current,
    () => "super_admin" as Role,
  );
}
