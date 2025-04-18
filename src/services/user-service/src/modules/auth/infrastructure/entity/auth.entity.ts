import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IAuth } from "../../domain/interfaces/IAuth";
import { User } from "../../../user/infrastructure/entity/user.entity";
import { IUser } from "../../../user/domain/interfaces/IUser";

@Entity("auth")
export class Auth implements IAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToOne(() => User, (user) => user.auth)
  user: IUser;
}
