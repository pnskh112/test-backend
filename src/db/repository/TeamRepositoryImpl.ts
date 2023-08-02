import { Team, TeamRepository } from "../../model/Team";
import { Team as TTeam } from "../entity/Team";
import { EntityManager, Repository } from "typeorm";

export class TeamRepositoryImpl implements TeamRepository {
  private readonly userRepo: Repository<TTeam>;

  constructor(private readonly entityManger: EntityManager) {
    this.userRepo = entityManger.getRepository(TTeam);
  }

   async findByCode(code: string): Promise<Team | null> {
    const res = await this.userRepo
      .findOne({
        where: { code },
        relations: {},
      })
      .catch((e) => null);
      return res != null
      ? new Team(
          res.id,
          res.code,
        )
      : null;
  }

}
