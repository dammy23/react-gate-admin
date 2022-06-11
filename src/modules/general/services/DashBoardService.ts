import { getRepository, ObjectID,Like,In, Between, FindManyOptions} from 'typeorm';
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
    landlordCount?:number,
    guardCount?:number,
    tenantCount?:number,
    inviteCount?:number,
    visitationCount?:number
    topVisit?:Object,
    dailyVisitation?:Object,
    dailyVisitationCount?:number,
    dailyInviteCount?:number

}

class DashBoardService {
    public async execute({ param,param2 }: Request): Promise<Object> {
        const usersRepository = getRepository(User);
        const tenantsRepository = getRepository(Tenant);
        const invitationsRepository = getRepository(Invitation);
        const visitationsRepository = getRepository(Visitation);
        let obj:Provider={
            landlordCount: 0,
            guardCount: 0,
            tenantCount: 0,
            inviteCount: 0,
            visitationCount: 0,
            topVisit: {},
            dailyVisitation: {},
            dailyVisitationCount: 0,
            dailyInviteCount: 0
        };
        obj.landlordCount = await usersRepository.count({type:2});
        obj.guardCount = await usersRepository.count({type:3});
        obj.topVisit = await usersRepository.find({
            order: {
            visitations: "DESC",
            name: "ASC"
            },
            take:10
        });
        obj.tenantCount = await tenantsRepository.count({status:false});
        obj.inviteCount = await invitationsRepository.count();
        obj.visitationCount = await visitationsRepository.count();
        let today= moment().format("YYYY-MM-DD");
        let options = {
            created_at: {
                $gte: new Date(today+"T00:00:00.000Z"),
                $lt:new Date(today+"T23:59:00.000Z"),
            }, 
            take:10
        } as FindManyOptions;
        obj.dailyVisitation = await visitationsRepository.find(options);
       
        let options1 = {
            created_at: {
                $gte: new Date(today+"T00:00:00.000Z"),
                $lt:new Date(today+"T23:59:00.000Z"),
            }, 
        } as FindManyOptions;
        
        obj.dailyVisitationCount = await visitationsRepository.count( options1);

        let options2 = {
            created_at: {
                    $gte: new Date(today+"T00:00:00.000Z"),
                    $lt:new Date(today+"T23:59:00.000Z"),
                }, 
                
           
        } as FindManyOptions;
        

        obj.dailyInviteCount = await invitationsRepository.count(options2);
        
       
       
        return obj;
    }
}

export default DashBoardService;