import { Team } from "./Team";

/**
 * @function create !hash後のpasswordDigestを渡すこと!
 */
export interface UserRepository {
  find(id: string): Promise<User | null>;
  findByUserNameWithCredential(userName: string): Promise<User | null>;
  create(
    userName: string,
    passwordDigest: string,
    team: Team,
  ): Promise<User>;
}

export class User {
  constructor(
    readonly id: string,
    readonly team: Team,
    readonly userName: string,
    readonly passwordDigest?: string
  ) {
    //
  }
}
