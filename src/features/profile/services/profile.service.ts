import { usersService } from "@/features/users/services/users.service";

export const profileService = {
  getProfile: usersService.getById,
};
