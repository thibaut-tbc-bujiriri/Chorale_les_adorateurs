export type Role = "super_admin" | "maitre_chant" | "discipline_admin" | "choriste";

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Président",
  maitre_chant: "Maître de chant",
  discipline_admin: "Directeur de discipline",
  choriste: "Choriste",
};
