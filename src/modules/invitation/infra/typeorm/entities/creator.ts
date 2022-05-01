import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm";
export class Creator {
    
    @Column()
    id: string;
    
    @Column()
    name: string;
    
    @Column()
    email: string;


    constructor(id: string, name: string,   email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    
}