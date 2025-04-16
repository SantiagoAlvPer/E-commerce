import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IAuth } from "../../../auth/domain/interfaces/IAuth";
import { User } from "../../../user-service/infrastructure/entity/user.entity";
import { IUser } from "../../../user-service/domain/interfaces/IUser";

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
