export const userRolesEnum = {
  ADMIN: "admin",
  MEMBER: "member",
  PROJECT_ADMIN: "project_admin",
} as const;

export const AvailableUserRoles = Object.values(userRolesEnum);
