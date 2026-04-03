import { Heart } from "lucide-react";

import { Button } from "@/components/common/Button";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useFavorites } from "@/features/favorites/hooks/useFavorites";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  songId: string;
  className?: string;
}

export function FavoriteButton({ songId, className }: FavoriteButtonProps) {
  const { user, loading } = useAuth();
  const { favoritesQuery, toggleFavorite } = useFavorites(user?.id, { enabled: Boolean(user) && !loading });

  if (!user) return null;

  const isFavorite = favoritesQuery.data?.some((favorite) => favorite.songId === songId) ?? false;
  const isBusy = loading || toggleFavorite.isPending;

  return (
    <Button
      variant={isFavorite ? "danger" : "secondary"}
      className={cn("justify-center whitespace-nowrap", className)}
      onClick={() => toggleFavorite.mutate(songId)}
      isLoading={isBusy}
      disabled={isBusy}
    >
      <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
      {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
    </Button>
  );
}
