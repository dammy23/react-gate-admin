import {
    Entity,
    PrimaryGeneratedColumn,
    ObjectIdColumn,
    ObjectID,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
} from 'typeorm';
 

@Entity('users')
@Unique(["email"])
class User {
    
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column('integer')
    type: number;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    guard_id: string;

    @Column()
    house_number: string;

    @Column()
    street_name: string;

    @Column('integer')
    tenants: number;

    @Column()
    password: string;

    @Column()
    push_token: string;

    @Column()
    image: string;

    @Column('integer', {default: 0})
    visitations: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;