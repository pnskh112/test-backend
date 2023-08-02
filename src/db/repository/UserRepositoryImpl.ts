import { User, UserRepository } from "../../model/User";
import { Team, TeamRepository } from "../../model/Team";
import { User as TUser } from "../entity/User";
import { Team as TTeam } from "../entity/Team";
import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../data-source";

export class UserRepositoryImpl implements UserRepository {
  private readonly userRepo: Repository<TUser>;

  constructor(private readonly entityManger: EntityManager) {
    this.userRepo = entityManger.getRepository(TUser);
  }
  async find(id: string): Promise<User | null> {
    const res = await this.userRepo
      .findOne({
        where: { id },
        relations: {
          team: true,
        },
      })
      .catch((e) => null);

    return res != null
      ? new User(
          res.id,
          res.team,
          res.userName,
        )
      : null;
  }

  async findByUserNameWithCredential(userName: string): Promise<User | null> {
    const res = await this.userRepo
      .findOne({
        where: { userName },
        select: [
          "id",
          "userName",
          "passwordDigest",
        ],
        relations: {
          team: true,
        },
      })
      .catch((e) => null);

    return res != null
      ? new User(
          res.id,
          res.team,
          res.userName,
          res.passwordDigest
        )
      : null;
  }

  async create(
    userName: string,
    passwordDigest: string,
    teamId: string,
    team: Team,
  ): Promise<User> {
  let user;
  try{
    const ormUser = this.userRepo.create();
    ormUser.userName = userName;
    ormUser.passwordDigest = passwordDigest;
    ormUser.teamId = team;
    await this.userRepo.save(ormUser);
    user = await this.find(ormUser.id);
    if (user == null) throw Error();
  }
  catch(e){
    console.log(e)
  }
  if(user === undefined || user === null) throw Error("failed to create user" + userName)
  return user;
}
}
