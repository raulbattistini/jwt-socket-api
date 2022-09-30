


import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid} from 'uuid';


@Entity("settings")
export class Setting {

   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   username: string;

   @Column()
   chat: boolean

   @UpdateDateColumn()
   updated_at: Date;

   @CreateDateColumn()
   created_at: Date;

   constructor(){
      if (!this.id){
         this.id = uuid();
      }
   }
}