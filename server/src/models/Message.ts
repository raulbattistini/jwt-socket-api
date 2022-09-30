

import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {v4 as uuid} from 'uuid';

import { User } from './User';

@Entity("messages")
export class Message {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column({
      type: 'char',
      length: 36
   })
   admin_id: string

   @Column({
      type: "text"
   })
   text: string

   @JoinColumn({name: "user_id"})
   @ManyToOne(()=> User)
   user: User

   @Column()
   user_id: string

   @CreateDateColumn()
   createdAt: Date;

   constructor(){
      if(!this.id){
         this.id == uuid();
      }
   }
}