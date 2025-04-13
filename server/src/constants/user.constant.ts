const userRolesEnum = {
  Admin: "admin",
  Member: "member",
  ProjectAdmin: "project_admin",
} as const;

const AvailableUserRoles = Object.values(userRolesEnum);

const USER_MESSAGES = {
  BadEmailToken: "Verification token does not exist or is expired",
  CredFailed: "Email or Password is incorrect",
  credSuccess: "User login successful",
  EmailNotVerified: "Email is not verified",
  FailedUserCreation: "Failed to create email verification token",
  SucceededUserCreation: "User register successfully, Please verify your email",
  UserExists: "User already exists",
  VerifiedUserEmail: "User email verified",
} as const;

export { AvailableUserRoles, USER_MESSAGES, userRolesEnum };
