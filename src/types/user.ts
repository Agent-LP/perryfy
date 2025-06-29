export interface UserResponse  {
    userId: number
    userRoles: userRoles[]
    token: string
}

export interface userRoles{
    roleId: number
    role: string
}