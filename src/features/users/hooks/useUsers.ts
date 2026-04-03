import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { usersService } from "../services/users.service";
import type { CreateUserPayload, UserPayload } from "../types/user.types";

const USERS_CACHE_KEY = "chorale_cache_users_v2";

function readUsersCache() {
  try {
    const raw = localStorage.getItem(USERS_CACHE_KEY);
    if (!raw) return undefined;

    const parsed = JSON.parse(raw) as Awaited<ReturnType<typeof usersService.getAll>>;
    if (!Array.isArray(parsed) || parsed.length === 0) return undefined;
    return parsed;
  } catch {
    return undefined;
  }
}

function writeUsersCache(data: Awaited<ReturnType<typeof usersService.getAll>>) {
  try {
    localStorage.setItem(USERS_CACHE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage errors.
  }
}

export function useUsers() {
  const queryClient = useQueryClient();
  const cachedUsers = readUsersCache();

  const usersQuery = useQuery({
    queryKey: queryKeys.users,
    queryFn: async () => {
      const data = await usersService.getAll();
      writeUsersCache(data);
      return data;
    },
    placeholderData: keepPreviousData,
    initialData: cachedUsers,
    initialDataUpdatedAt: cachedUsers ? Date.now() : undefined,
    refetchOnMount: "always",
    refetchOnReconnect: true,
  });

  const createUser = useMutation({
    mutationFn: (payload: CreateUserPayload) => usersService.create(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.users }),
  });

  const updateUser = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UserPayload }) => usersService.update(id, payload),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users });
      queryClient.invalidateQueries({ queryKey: queryKeys.user(id) });
    },
  });

  const deleteUser = useMutation({
    mutationFn: (id: string) => usersService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.users }),
  });

  return { usersQuery, createUser, updateUser, deleteUser };
}

export function useUser(userId: string) {
  return useQuery({
    queryKey: queryKeys.user(userId),
    queryFn: () => usersService.getById(userId),
    enabled: Boolean(userId),
  });
}
