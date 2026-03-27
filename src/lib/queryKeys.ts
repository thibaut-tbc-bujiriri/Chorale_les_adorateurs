export const queryKeys = {
  songs: ["songs"] as const,
  song: (id: string) => ["songs", id] as const,
  categories: ["categories"] as const,
  users: ["users"] as const,
  user: (id: string) => ["users", id] as const,
  favorites: (userId?: string) => ["favorites", userId ?? "anonymous"] as const,
  profile: (userId?: string) => ["profile", userId ?? "anonymous"] as const,
};
