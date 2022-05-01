import { getRepository, ObjectID,Like,In, Between} from 'typeorm';
import path from 'path';

import fs from 'fs';
import User from '@modules/user/infra/typeorm/entities/User';
import Tenant from '@modules/tenant/infra/typeorm/entities/Tenant';
import Invitation from '@modules/invitation/infra/typeorm/entities/Invitation';
import Visitation from '@modules/visitation/infra/typeorm/entities/Visitation';
import Setting from '@modules/settings/infra/typeorm/entities/Setting';
import moment from 'moment';



interface Request {
    param: string;
    param2: string;
}

interface Provider {
    landlordCount:number,
    guardCount:number,
    tenantCount:number,
    inviteCount:number,
    visitationCount:number
}

class DashBoardService {
    public async execute({ param,param2 }: Request): Promise<Object> {
        const usersRepository = getRepository(User);
        const tenantsRepository = getRepository(Tenant);
        const invitationsRepository = getRepository(Invitation);
        const visitationsRepository = getRepository(Visitation);
        let obj={};
        obj.landlordCount = await usersRepository.count({type:"2"});
        obj.guardCount = await usersRepository.count({type:"3"});
        obj.topVisit = await usersRepository.find({
            order: {
            visitations: "DESC",
            name: "ASC"
            },
            take:10
        });
        obj.tenantCount = await tenantsRepository.count({status:1});
        obj.inviteCount = await invitationsRepository.count();
        obj.visitationCount = await visitationsRepository.count();
        let today= moment().format("YYYY-MM-DD");
        obj.dailyVisitation = await visitationsRepository.find( {
            created_at: {
                $gte: new Date(today+"T00:00:00.000Z"),
                $lt:new Date(today+"T23:59:00.000Z"),
            }, 
            take:10
        });
       
        
        obj.dailyVisitationCount = await visitationsRepository.count( {
            created_at: {
                $gte: new Date(today+"T00:00:00.000Z"),
                $lt:new Date(today+"T23:59:00.000Z"),
            }, 
        });

        obj.dailyInviteCount = await invitationsRepository.count({
            created_at: {
                    $gte: new Date(today+"T00:00:00.000Z"),
                    $lt:new Date(today+"T23:59:00.000Z"),
                }, 
                
           
        });
        
       
       
        return obj;
    }
}

export default DashBoardService;