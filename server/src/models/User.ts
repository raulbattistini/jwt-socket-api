import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm';


@Entity("users")
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        length: "50"
    })
    username: string

    @Column({
        type: 'varchar',
        length: '50',
        select: false
    })
    password: string

    @CreateDateColumn()
    createdAt: Date
}