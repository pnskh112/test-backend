import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("sessions")
export class Session {
  @PrimaryColumn()
  sid!: string;

  @Column({ type: "json" })
  sess!: string;

  @Column({ type: "timestamp" })
  expire!: Date;
}
