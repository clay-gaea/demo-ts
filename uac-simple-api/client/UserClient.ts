import {getRequestMethod} from 'com.clay.common/libs/request';
import User from "../entity/User";
import UserFilter from "../entity/UserFilter";
import Page from "com.clay.common/libs/page"

const request = getRequestMethod('uac-service');

export async function queryUserList(userFilter: UserFilter = null, limit: number = 1000): Promise<User[]> {
    return request('/user/list', {
        method: 'POST',
        params: {limit},
        data: userFilter,
    });
}

export async function queryUserPage(userFilter: UserFilter = null, size: number = 20, page: number = 1): Promise<Page<User>> {
    return request('/user/page', {
        method: 'POST',
        params: {size, page},
        data: userFilter,
    });
}

export async function createUser(user: User): Promise<number> {
    return request('/user/create', {
        method: 'POST',
        data: user,
    });
}

export async function findUser(id: number): Promise<User> {
    return request('/user/find', {
        method: 'GET',
        params: {id},
    });
}

export async function updateUser(id: number, user: User): Promise<boolean> {
    return request('/user/update', {
        method: 'PUT',
        params: {id},
        data: user,
    });
}

export async function deleteUser(id: number): Promise<boolean> {
    return request('/user/delete', {
        method: 'DELETE',
        params: {id},
    });
}
