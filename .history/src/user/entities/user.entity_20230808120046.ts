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
    