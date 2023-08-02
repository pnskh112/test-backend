import { AppDataSource } from "../db/data-source";
import { UserRepositoryImpl } from "../db/repository/UserRepositoryImpl";
import { User as User } from "../model/User";

export const getUserById = async (userId: string): Promise<User | null> => {
  return await AppDataSource.transaction(async (manager) => {
    const repo = new UserRepositoryImpl(manager);
    return await repo.find(userId);
  });
};
