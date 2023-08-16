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

    @Column({ nullable: true })
    Fullname: string;

  
    @Column({ nullable: true })
    Email: string;
    @Column({nullable : true})
    Password : string;
    @Column({ nullable: true }) // Allow the refreshToken to be nullable since it might not be set initially
    @ 
  
    @BeforeInsert()
    async hashPassword(){
      this.Password =  await bcrypt.hash(this.Password, 8)
    }
    async validatePassword(Password : string): Promise<boolean> {
        return bcrypt.compare(Password, this.Password)
    }
  }