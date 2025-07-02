export interface UserResponse  {
    userId: number
    userName: string
    userRoles: userRoles[]
    token: string
}

export interface userRoles{
    roleId: number
    role: string
}