export default interface User {

    id?: number;

    // 昵称
    nickname?: string;

    // 用户名
    username?: string;

    // 密码
    password?: string;

    // 手机
    mobile?: string;

    // 邮箱
    email?: string;

    // 头像
    avatar?: string;

    // 状态0禁用 1启用
    status?: number;

    // 备注
    remark?: string;

    createdAt?: string;

    updatedAt?: string;
}
