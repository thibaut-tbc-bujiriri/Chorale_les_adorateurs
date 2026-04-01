import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/queryKeys";

import { usersService } from "../services/users.service";
import type { CreateUserPayload, UserPayload } from "../types/user.types";

export function useUsers() {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: queryKeys.users,
    queryFn: usersService.getAll,
    placeholderData: keepPreviousData,
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