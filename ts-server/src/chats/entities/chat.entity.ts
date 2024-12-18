import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Node } from 'src/relay';
import { Message } from 'src/messages/entities/message.entity';

@Entity()
@ObjectType({ implements: Node })
export class Chat implements Node {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => ID)
  id: string;

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.chats, { cascade: true })
  participants: User[];

  @Column()
  @Field()
  name: String;

  @OneToMany(() => Message, (message) => message.chat, { cascade: true })
  messages: Message[];

  @Field()
  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Message, { nullable: true })
  @OneToOne(() => Message, { nullable: true, eager: true })
  @JoinColumn()
  lastMessage: Message;

}
