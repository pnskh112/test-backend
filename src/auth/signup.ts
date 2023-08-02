import { AppDataSource } from "../db/data-source";
import { UserRepositoryImpl } from "../db/repository/UserRepositoryImpl";
import { TeamRepositoryImpl } from "../db/repository/TeamRepositoryImpl";
import { User as User } from "../model/User";
import { hashString } from "../utils/crypto";

export const signup = async (params: SignupParams): Promise<User> => {
  let createdUser
  try {
    if (params.password == null || params.password.length < 8)
      throw Error("password length should be grater than 8");

    const passwordDigest = await hashString(params.password);

    // teamCodeを元にteam情報を取得
    const teamRepository = new TeamRepositoryImpl(AppDataSource.manager);
    const team = await teamRepository.findByCode(params.teamCode);
    if (team === null) throw Error("team not found");

    createdUser =  await AppDataSource.transaction(async (manager) => {
      const userRepository = new UserRepositoryImpl(manager);
      const createdUser = await userRepository.create(
        params.userName,
        passwordDigest,
        team,
      );
      return createdUser;
    });
  }
  catch (e) {
    console.log(e)
  }
  if(createdUser === undefined) throw Error("failed to create user" + params.userName)
  return createdUser
};

export type SignupParams = {
  userName: string;
  password: string;
  teamCode: string;
};
