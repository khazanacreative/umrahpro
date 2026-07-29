import type { Role } from "../types";

export interface PlatformConfig {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: string;
  roles: Role[];
  color: string;
}

export const PLATFORMS: Record<string, PlatformConfig> = {
  internal: {
    id: "internal",
    name: "Manajemen Internal",
    description: "Platform untuk manajemen bisnis dan operasional",
    path: "/admin",
    icon: "Building2",
    color: "bg-primary",
    roles: ["super_admin", "direktur", "operasional", "keuangan"],
  },
  marketing: {
    id: "marketing",
    name: "Agen & Marketing",
    description: "Platform untuk hubungan dengan jamaah dan CRM",
    path: "/",
    icon: "Users",
    color: "bg-gold",
    roles: ["marketing", "manajer_marketing", "agen"],
  },
  jamaah: {
    id: "jamaah",
    name: "Jamaah & Tim Lapangan",
    description: "Platform untuk pegangan per orang di lapangan",
    path: "/jamaah",
    icon: "UserCheck",
    color: "bg-success",
    roles: ["tour_leader", "guide", "jamaah"],
  },
};

export function getPlatformForRole(role: Role): PlatformConfig | null {
  for (const platform of Object.values(PLATFORMS)) {
    if (platform.roles.includes(role)) {
      return platform;
    }
  }
  return null;
}

export function getAvailablePlatforms(role: Role): PlatformConfig[] {
  const userPlatform = getPlatformForRole(role);
  if (!userPlatform) return [];
  
  // All users can see all platforms, but their own is marked as active
  return Object.values(PLATFORMS);
}