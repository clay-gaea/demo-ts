export default interface User {

    ids?: number[];

    // 昵称模糊匹配
    nickname?: string;

    // 昵称模糊匹配
    username?: string;

    // 手机
    mobile?: string;

    // 邮箱模糊匹配
    email?: string;

    status?: number;

    // 两个元素数组
    createdAtRange?: string[];

    // 两个元素数组
    updatedAtRange?: string[];
}
