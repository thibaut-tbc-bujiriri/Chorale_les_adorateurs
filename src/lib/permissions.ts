import type { Role } from "@/types/role";

export const ROLE_RANK: Record<Role, number> = {
  choriste: 1,
  discipline_admin: 2,
  maitre_chant: 3,
  super_admin: 4,
};

export function hasMinimumRole(currentRole: Role, expectedRole: Role) {
  return ROLE_RANK[currentRole] >= ROLE_RANK[expectedRole];
}

export function canAccessAdminPanel(role: Role) {
  return role !== "choriste";
}

export function canManageSongs(role: Role) {
  return hasMinimumRole(role, "discipline_admin");
}

export function canManageCategories(role: Role) {
  return hasMinimumRole(role, "maitre_chant");
}

export function canManageUsers(role: Role) {
  return role === "super_admin";
}
