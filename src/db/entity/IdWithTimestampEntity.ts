import { Column, Index, PrimaryGeneratedColumn } from "typeorm";

export abstract class IdWithTimestampEntity {
  @Index({ unique: true })
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "created_at", type: "timestamp", default: () => "now()" })
  createdAt!: Date;

  @Column({ name: "updated_at", type: "timestamp", default: () => "now()" })
  updatedAt!: Date;
}
