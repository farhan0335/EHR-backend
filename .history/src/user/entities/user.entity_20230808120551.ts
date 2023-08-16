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
    Fullname: string;

  
    @Column({ unique: true })
    Email: string;
    @Column()
    Password : string;
    async validatePassword(Password : string): Promise<boolean> {
        return bcrypt.compare(p)
    }
  }