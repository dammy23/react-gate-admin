import {
    Entity,
    PrimaryGeneratedColumn,
    Generated,
    Column,
    ObjectIdColumn,
    ObjectID,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
} from 'typeorm';
import Invitation from '@modules/invitation/infra/typeorm/entities/Invitation';


@Entity('visitation')
class Visitation { 
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    visitor: string;

    @Column()
    visitor_name: string;

    @Column()
    inviter: string;

    @Column()
    guard_id: string;

    @Column()
    check_visitor: boolean

    @Column()
    guard_name: string;


    @Column('integer')
    type: number;


    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;



    //@ManyToOne(() => Invitation, (invite) => invite.visits)
    //invite: Invitation
}

export default Visitation;