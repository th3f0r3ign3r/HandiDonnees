import { IAllRoles } from '../interfaces/config.interface';

const allRoles: IAllRoles = {
    partner: [],
    consumer: [],
    admin: ['deleteUsers', 'getUsers', 'getUser', 'updateUsers', 'updateUsersRole', 'createUsers'],
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
