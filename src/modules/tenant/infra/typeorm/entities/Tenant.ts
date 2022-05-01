import {
    Entity,
    PrimaryGeneratedColumn,
    Generated,
    Column,
    ObjectIdColumn,
    ObjectID,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('tenant')
class Tenant {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    landlord_id: string;

    @Column()
    apartment_description: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    password:string;

    @Column('boolean',{default: true})
    status: boolean;

    @Column('boolean',{default: false})
    deleted: boolean;

    @Column('integer',{default: 0})
    visitations: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Tenant;