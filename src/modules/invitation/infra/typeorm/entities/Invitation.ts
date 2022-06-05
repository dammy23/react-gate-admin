
import {
    Entity,
    PrimaryGeneratedColumn,
    ObjectIdColumn,
    ObjectID,
    Column,
    CreateDateColumn, 
    OneToMany,
    UpdateDateColumn,
} from 'typeorm';
import { Creator } from './creator';
import Visitation from '@modules/visitation/infra/typeorm/entities/Visitation';

@Entity('invitation')
export default class Invitation {
    @ObjectIdColumn()
    id: ObjectID;

    @Column(type => Creator)
    creator: Creator;

    @Column()
    creator_id: string;

    @Column()
    visitor_name: string;

    @Column()
    note: string;


    @Column()
    visitor_phone: string;

    @Column()
    visitor_code: string;

    @Column()
    visitor_image: string;

    @Column()
    visitor_email: string;

    @Column('boolean', {default: false})
    check_visitor: boolean;

    @Column('boolean', {default: false})
    multiple_entry_exit: boolean;

    @Column({ type: 'timestamptz' })
    expiry_date: Date;

    @Column('integer', {default: 0})
    no_of_people: number;

    @Column('boolean', {default: true})
    isActive: boolean;

    @Column('integer')
    traffic_count: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    //@OneToMany(() => Visitation, (visits) => visits.invite)
    //visits: Visitation[]

}