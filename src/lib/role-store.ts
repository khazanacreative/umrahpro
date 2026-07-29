import { useSyncExternalStore } from "react";
import type { Role } from "./roles";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Listener = () => any;

export interface SessionUser {
  role: Role;
  name: string;
  email: string;
  initials: string;
  jabatan: string;
  avatar: string;
}

const KEY = "umrahpro-role";

const USERS: Record<Role, SessionUser> = {
  super_admin: {
    role: "super_admin",
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@umrahpro.id",
    initials: "AF",
    jabatan: "Super Admin",
    avatar: "https://ui-avatars.com/api/?name=Ahmad+Fauzi&background=2d6a4f&color=fff&bold=true",
  },
  direktur: {
    role: "direktur",
    name: "H. Abdurrahman Malik",
    email: "abdurrahman@umrahpro.id",
    initials: "AM",
    jabatan: "Direktur",
    avatar: "https://ui-avatars.com/api/?name=Abdurrahman+Malik&background=b8860b&color=fff&bold=true",
  },
  operasional: {
    role: "operasional",
    name: "Rina Safitri",
    email: "rina.safitri@umrahpro.id",
    initials: "RS",
    jabatan: "Staf Operasional",
    avatar: "https://ui-avatars.com/api/?name=Rina+Safitri&background=1e6f5c&color=fff&bold=true",
  },
  keuangan: {
    role: "keuangan",
    name: "Dewi Sartika",
    email: "dewi.sartika@umrahpro.id",
    initials: "DS",
    jabatan: "Keuangan",
    avatar: "https://ui-avatars.com/api/?name=Dewi+Sartika&background=0d6e6e&color=fff&bold=true",
  },
  marketing: {
    role: "marketing",
    name: "Fajar Nugroho",
    email: "fajar.nugroho@umrahpro.id",
    initials: "FN",
    jabatan: "Marketing",
    avatar: "https://ui-avatars.com/api/?name=Fajar+Nugroho&background=2d6a4f&color=fff&bold=true",
  },
  manajer_marketing: {
    role: "manajer_marketing",
    name: "Andi Wijaya",
    email: "andi.wijaya@umrahpro.id",
    initials: "AW",
    jabatan: "Manajer Marketing",
    avatar: "https://ui-avatars.com/api/?name=Andi+Wijaya&background=059669&color=fff&bold=true",
  },
  agen: {
    role: "agen",
    name: "Budi Santoso",
    email: "budi.santoso@agen.umrahpro.id",
    initials: "BS",
    jabatan: "Mitra Agen",
    avatar: "https://ui-avatars.com/api/?name=Budi+Santoso&background=3b82f6&color=fff&bold=true",
  },
  tour_leader: {
    role: "tour_leader",
    name: "H. Yusuf Ali",
    email: "yusuf.ali@umrahpro.id",
    initials: "YA",
    jabatan: "Tour Leader (Muthawif)",
    avatar: "https://ui-avatars.com/api/?name=Yusuf+Ali&background=7c3aed&color=fff&bold=true",
  },
  guide: {
    role: "guide",
    name: "Ustadz Ahmad Faiz",
    email: "ahmad.faiz@umrahpro.id",
    initials: "AF",
    jabatan: "Pembimbing Ibadah",
    avatar: "https://ui-avatars.com/api/?name=Ahmad+Faiz&background=0e7490&color=fff&bold=true",
  },
  jamaah: {
    role: "jamaah",
    name: "Muhammad Rizki",
    email: "m.rizki@email.com",
    initials: "MR",
    jabatan: "Jamaah",
    avatar: "https://ui-avatars.com/api/?name=Muhammad+Rizki&background=16a34a&color=fff&bold=true",
  },
};

let current: Role = "super_admin";
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function getCurrentUser(): SessionUser {
  return USERS[current];
}

export function setRole(role: Role) {
  current = role;
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, role);
  emit();
}

export function initRole() {
  if (typeof window === "undefined") return;
  
  // Check URL parameter first (e.g., ?role=super_admin)
  const urlParams = new URLSearchParams(window.location.search);
  const urlRole = urlParams.get("role") as Role | null;
  
  if (urlRole && Object.keys(USERS).includes(urlRole)) {
    current = urlRole;
    window.localStorage.setItem(KEY, urlRole);
    emit();
    return;
  }
  
  // Fallback to localStorage
  const stored = window.localStorage.getItem(KEY) as Role | null;
  if (stored && stored !== current) {
    current = stored;
    emit();
  }
}

export function useRole(): Role {
  return useSyncExternalStore(
    (cb: Listener) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => current,
    () => "super_admin" as Role,
  );
}

export function useUser(): SessionUser {
  const role = useRole();
  return USERS[role];
}

export { USERS };
