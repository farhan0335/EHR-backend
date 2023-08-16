import {
  BeforeInsert,Column,Entity,PrimaryGeneratedColumn, OneToMany} from 'typeorm';
  import {UserR}
  import * as bcrypt from 'bcryptjs';
@Entity('')
  export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    Fullname: string;

  
    @Column({ nullable: true })
    Email: string;

    @Column({nullable : true})
    Password : string;

    @Column({ nullable: true })
    Role : string; 
  
    @BeforeInsert()
    async hashPassword(){
      this.Password =  await bcrypt.hash(this.Password, 8)
    }
    async validatePassword(Password : string): Promise<boolean> {
        return bcrypt.compare(Password, this.Password)
    }
  }