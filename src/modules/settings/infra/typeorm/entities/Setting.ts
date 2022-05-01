import {
    Entity,
    PrimaryGeneratedColumn,
    ObjectIdColumn,
    ObjectID,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
 
@Entity('setting')
class Setting {
    
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    value: string;

   

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Setting;