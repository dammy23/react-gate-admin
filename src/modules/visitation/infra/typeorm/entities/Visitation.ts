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

@Entity('visitation')
class Visitation { 
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    visitor: string;

    @Column()
    guard_id: string;

    @Column('integer')
    type: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Visitation;