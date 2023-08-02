import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { IdWithTimestampEntity } from "./IdWithTimestampEntity";
import { Team } from "./Team";

@Entity('users')
export class User extends IdWithTimestampEntity {
  @Column({ name: "user_name", unique: true })
  userName!: string;

  @Column({ name: "password_digest", select: false })
  passwordDigest!: string;

  @ManyToOne(
    () => Team,
    (team) => team.users
  )
  @JoinColumn({ name: "team_id" })
  team!: Team;
}