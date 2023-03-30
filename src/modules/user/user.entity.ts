import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Expose, plainToClass } from 'class-transformer';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @Expose()
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Expose()
  @Column({ unique: true, nullable: false })
  @Field((type) => String)
  username: string;

  @Expose()
  @Column()
  @Field((type) => String)
  password: string;

  @Expose()
  @Field((type) => String)
  @Column({ default: null })
  resetPasswordToken: string;

  @Expose()
  @Field((type) => Int)
  @Column({ default: null })
  resetPasswordExpires: number;

  @Expose()
  @Field((type) => String)
  @Column({ default: null })
  avatar: string;

  @Expose()
  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @Expose()
  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  constructor(user: Partial<User>) {
      if (user) {
          Object.assign(this, plainToClass(User, user, { excludeExtraneousValues: true }));
          
    }
  }
}
