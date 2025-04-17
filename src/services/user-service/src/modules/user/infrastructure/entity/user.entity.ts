import { IAuth } from "../../../auth/domain/interfaces/IAuth";
import { Auth } from "../../../auth/infrastructure/entity/auth.entity";
import { IUser } from "../../domain/interfaces/IUser";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("user")
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  phone: number;

  @OneToOne(() => Auth, { cascade: true })
  @JoinColumn()
  auth: IAuth;
}
