/**
 * @function create !hash後のpasswordDigestを渡すこと!
 */
export interface TeamRepository {
  findByCode(code: string): Promise<Team | null>;
}

export class Team {
  constructor(
    readonly id: string,
    readonly code: string,
  ) {
    //
  }
}
