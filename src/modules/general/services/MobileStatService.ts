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
    id: string;
}

interface Provider {
    landlordCount:number,
    guardCount:number,
    tenantCount:number,
    inviteCount:number,
    visitationCount:number
}

class MobileStatService {
    public async execute({ id }: Request): Promise<Object> {
        const usersRepository = getRepository(User);
        const tenantsRepository = getRepository(Tenant);
        const invitationsRepository = getRepository(Invitation);
        const visitationsRepository = getRepository(Visitation);
        let obj={};
       
        var day0 = moment().format('YYYY-MM-DD');
        var day1 = moment().subtract(1, 'day').format('YYYY-MM-DD');
        var day2 = moment().subtract(2, 'day').format('YYYY-MM-DD');
        var day3 = moment().subtract(3, 'day').format('YYYY-MM-DD');
        var day4 = moment().subtract(4, 'day').format('YYYY-MM-DD');
        var day5 = moment().subtract(5, 'day').format('YYYY-MM-DD');
        var day6 = moment().subtract(6, 'day').format('YYYY-MM-DD');

       
        
        let d0 = await visitationsRepository.count( {

            
                '$and' : [
                    {created_at: {
                        $gte: new Date(day0+"T00:00:00.000Z"),
                        $lt:new Date(day0+"T23:59:59.000Z"),
                    }},
                    {$or:[
                        {inviter:id},
                        {guard_id:id}
                    ]}
                ]
            
           
        });


        let d1 = await visitationsRepository.count( {

         
                '$and' : [
                    {created_at: {
                        $gte: new Date(day1+"T00:00:00.000Z"),
                        $lt:new Date(day1+"T23:59:59.000Z"),
                    }},
                    {$or:[
                        {inviter:id},
                        {guard_id:id}
                    ]}
                ]
            
           
        });

        let d2 = await visitationsRepository.count( {

          
                '$and' : [
                    {created_at: {
                        $gte: new Date(day2+"T00:00:00.000Z"),
                        $lt:new Date(day2+"T23:59:59.000Z"),
                    }},
                    {$or:[
                        {inviter:id},
                        {guard_id:id}
                    ]}
                ]
            
           
        });

        let d3 = await visitationsRepository.count( {

           
                '$and' : [
                    {created_at: {
                        $gte: new Date(day3+"T00:00:00.000Z"),
                        $lt:new Date(day3+"T23:59:59.000Z"),
                    }},
                    {$or:[
                        {inviter:id},
                        {guard_id:id}
                    ]}
                ]
            
           
        });

        let d4 = await visitationsRepository.count( {

           
                '$and' : [
                    {created_at: {
                        $gte: new Date(day4+"T00:00:00.000Z"),
                        $lt:new Date(day4+"T23:59:59.000Z"),
                    }},
                    {$or:[
                        {inviter:id},
                        {guard_id:id}
                    ]}
                ]
            
           
        });

        let d5= await visitationsRepository.count( {

          
                '$and' : [
                    {created_at: {
                        $gte: new Date(day5+"T00:00:00.000Z"),
                        $lt:new Date(day5+"T23:59:59.000Z"),
                    }},
                    {$or:[
                        {inviter:id},
                        {guard_id:id}
                    ]}
                ]
            
           
        });

        let d6 = await visitationsRepository.count( {

           
                '$and' : [
                    {created_at: {
                        $gte: new Date(day6+"T00:00:00.000Z"),
                        $lt:new Date(day6+"T23:59:59.000Z"),
                    }},
                    {$or:[
                        {inviter:id},
                        {guard_id:id}
                    ]}
                ]
            
           
        });

        
       
       
        return [d6,d5,d4,d3,d2,d1,d0];
    }
}

export default MobileStatService;