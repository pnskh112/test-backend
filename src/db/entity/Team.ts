import { Entity, Column, OneToMany } from "typeorm";
import { IdWithTimestampEntity } from "./IdWithTimestampEntity";
import { User } from "./User";

@Entity('teams')
export class Team extends IdWithTimestampEntity {
  @Column({ name: "code", unique: true })
  code!: string;

  // 紐付けの設定例
  @OneToMany(
    () => User,
    (user) => user.team
  )
  users!: User[];

  // @OneToOne(
  //   () => string-destination-table-name,
  //   (string-destination-table-name) => string-destination-table-name.user
  // )
  // string-destination-table-names!: string-destination-table-name;
}
