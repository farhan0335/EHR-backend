import {
  BeforeInsert,Column,Entity,PrimaryGeneratedColumn, OneToMany} from 'typeorm';
  import * as bcrypt from 'bcryptjs';
@Entity('')
  export class User{
    // networkacc: any;
    // static findOne(arg0: { where: { id: any; }; }) {
    //   throw new Error('Method not implemented.');
    // }
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    fullname: string;

  
    @Column({ unique: true })
    email: string;
    @Column()
    Pass
  }