import User from '@modules/user/infra/typeorm/entities/User';

export default {
    render(user: User) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            type:user.type,
            phone: user.phone,
            guard_id :user.guard_id,
            house_number: user.house_number, 
            street_name: user.street_name,
            tenants: user.tenants
        };
    }
}