import { Heart } from "lucide-react";

import { Button } from "@/components/common/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";

interface FavoriteButtonProps {
  songId: string;
}

export function FavoriteButton({ songId }: FavoriteButtonProps) {
  const { user } = useAuth();
  const { favoritesQuery, toggleFavorite } = useFavorites(user?.id);

  if (!user) return null;

  const isFavorite = favoritesQuery.data?.some((favorite) => favorite.songId === songId);

  return (
    <Button
      variant={isFavorite ? "secondary" : "ghost"}
      onClick={() => toggleFavorite.mutate(songId)}
      isLoading={toggleFavorite.isPending}
    >
      <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
      {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
    </Button>
  );
}
