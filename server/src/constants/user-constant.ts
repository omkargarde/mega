const userRolesEnum = {
  ADMIN: "admin",
  MEMBER: "member",
  PROJECT_ADMIN: "project_admin",
} as const;

const AvailableUserRoles = Object.values(userRolesEnum);

export { AvailableUserRoles, userRolesEnum };
