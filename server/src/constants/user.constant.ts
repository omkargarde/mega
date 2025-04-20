const userRolesEnum = {
  Admin: "admin",
  Member: "member",
  ProjectAdmin: "project_admin",
} as const;

const UserToken = { token: "token" } as const;

const AvailableUserRoles = Object.values(userRolesEnum);

const USER_MESSAGES = {
  BadEmailToken: "Verification token does not exist or is expired",
  BadToken: "Token is invalid",
  CredFailed: "Email or Password is incorrect",
  credSuccess: "User login successful",
  EmailNotVerified: "Email is not verified",
  FailedUserCreation: "Failed to create user",
  FailedUserTokenCreation: "Failed to create email verification token",
  ForgotPassword: "User sent password reset link",
  forgotPasswordSuccess: "Password has been updated successfully",
  SucceededUserCreation: "User register successfully, Please verify your email",
  TokenNotFound: "Token not found",
  UserConflict: "User already exists",
  UserExists: "User already exists",
  UserFound: "User found",
  UserLoggedOut: "User logout success",
  UserNotFound: "User not found",
  VerifiedUserEmail: "User email verified",
} as const;

export { AvailableUserRoles, USER_MESSAGES, userRolesEnum, UserToken };
