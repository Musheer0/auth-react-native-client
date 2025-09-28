import { z } from "zod";

// --- Auth Routes ---

// 1. Sign Up
export const SignUpArgsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export const SignUpResponseSchema = z.object({
  verification_id: z.string(),
  expires_at: z.string(), // ISO date string
});

// 2. Verify Email
export const VerifyEmailArgsSchema = z.object({
  token_id: z.string(),
  code: z.string(),
});
export const VerifyEmailResponseSchema = z.object({
  token: z.string(),
});

// 3. Resend Verification Email
export const ResendVerificationEmailArgsSchema = z.object({
  email: z.string().email(),
});
export const ResendVerificationEmailResponseSchema = z.object({
  verification_id: z.string(),
  expires_at: z.string(),
});

// 4. Sign In with Credentials
export const SignInCredentialsArgsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  code: z.string().optional(), // req if MFA
  token_id: z.string().optional(), // req if MFA
});
export const SignInCredentialsSuccessResponseSchema = z.object({ token: z.string() })
export const SignInCredentialsErrorResponseSchema =   z.object({
    error: z.literal("mfa_required"),
    verification_id: z.string(),
    expires_at: z.string(),
    message: z.string(),
  })
// 5. Sign In with MFA
export const SignInMFAArgsSchema = z.object({
  token_id: z.string(),
  code: z.string(),
});
export const SignInMFAResponseSchema = z.object({
  token: z.string(),
});

// --- Authenticated Routes (with bearer token) ---

const AuthHeaderSchema = z.object({
  bearer: z.string(),
});

// 6. Get Current User
export const GetCurrentUserResponseSchema = AuthHeaderSchema.extend({
  session: z.object({
    id: z.string(),
    expires_at: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    user_id: z.string(),
    client: z.string(),
    ip: z.string(),
    parsed_location: z.string(),
    last_used: z.string(),
  }),
  user: z
    .object({
      id: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
      email: z.string(),
      backup_email: z.string().optional(),
      is_backup_email_verified: z.boolean().optional(),
      backup_email_verified_at: z.string().optional(),
      email_mfa_enabled: z.boolean().optional(),
      email_mfa_enabled_at: z.string().optional(),
      is_email_verified: z.boolean(),
      email_verified_at: z.string(),
      image_url: z.string().optional(),
    })
    .nullable(),
});

// 7. Logout Current User
export const LogoutCurrentUserResponseSchema = AuthHeaderSchema.extend({
  success: z.boolean(),
});

// 8. Logout All Other Sessions
export const LogoutAllOtherSessionsResponseSchema = AuthHeaderSchema.extend({
  success: z.boolean(),
});

// 9. Get All Sessions
export const GetAllSessionsResponseSchema = AuthHeaderSchema.extend({
  body: z.array(
    z.object({
      primary: z.boolean(),
      id: z.string(),
      expires_at: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
      user_id: z.string(),
      client: z.string(),
      ip: z.string(),
      parsed_location: z.string(),
      last_used: z.string(),
    })
  ),
});

// 10. Enable MFA
export const EnableMFAResponseSchema = AuthHeaderSchema.extend({
  mfa_enabled: z.literal(true),
});

// 11. Disable MFA
export const DisableMFAResponseSchema = AuthHeaderSchema.extend({
  mfa_enabled: z.literal(false),
});

// --- Password Reset ---

// 12. Generate Password Reset Token
export const GeneratePasswordResetTokenArgsSchema = z.object({
  email: z.string().email(),
});
export const GeneratePasswordResetTokenResponseSchema = z.object({
  verification_id: z.string(),
  expires_at: z.string(),
});

// 13. Change Password
export const ChangePasswordArgsSchema = z.object({
  token_id: z.string(),
  code: z.string(),
  password: z.string(),
});
export const ChangePasswordResponseSchema = z.object({
  success: z.boolean(),
});

// --- Google OAuth ---

// 14. Get Google OAuth URL (Web)
export const GetGoogleOAuthUrlArgsSchema = z.object({}); // query params handled externally
export const GetGoogleOAuthUrlResponseSchema = z.string(); // redirect URL

// 15. Google OAuth Callback (Web)
export const GoogleOAuthCallbackArgsSchema = z.object({
  code: z.string(),
  state: z.string(),
  redirect_uri: z.string().url(),
});
export const GoogleOAuthCallbackResponseSchema = z.union([
  z.object({
    error: z.literal("mfa_required"),
    verification_id: z.string(),
    expires_at: z.string(),
    message: z.string(),
  }),
  z.object({
    success: z.boolean(),
    state: z.string(),
    token: z.string(),
  }),
]);

// ---TS types---

// 1. Sign Up
export type TSignUpArgs = z.infer<typeof SignUpArgsSchema>;
export type TSignUpResponse = z.infer<typeof SignUpResponseSchema>;

// 2. Verify Email
export type TVerifyEmailArgs = z.infer<typeof VerifyEmailArgsSchema>;
export type TVerifyEmailResponse = z.infer<typeof VerifyEmailResponseSchema>;

// 3. Resend Verification Email
export type TResendVerificationEmailArgs = z.infer<typeof ResendVerificationEmailArgsSchema>;
export type TResendVerificationEmailResponse = z.infer<typeof ResendVerificationEmailResponseSchema>;

// 4. Sign In with Credentials
export type TSignInCredentialsArgs = z.infer<typeof SignInCredentialsArgsSchema>;
export type TSignInCredentialsResponse = z.infer<typeof SignInCredentialsSuccessResponseSchema>;

// 5. Sign In with MFA
export type TSignInMFAArgs = z.infer<typeof SignInMFAArgsSchema>;
export type TSignInMFAResponse = z.infer<typeof SignInMFAResponseSchema>;

// --- Authenticated Routes (bearer token) ---
export type TAuthHeader = z.infer<typeof AuthHeaderSchema>;

// 6. Get Current User
export type TGetCurrentUserResponse = z.infer<typeof GetCurrentUserResponseSchema>;

// 7. Logout Current User
export type TLogoutCurrentUserResponse = z.infer<typeof LogoutCurrentUserResponseSchema>;

// 8. Logout All Other Sessions
export type TLogoutAllOtherSessionsResponse = z.infer<typeof LogoutAllOtherSessionsResponseSchema>;

// 9. Get All Sessions
export type TGetAllSessionsResponse = z.infer<typeof GetAllSessionsResponseSchema>;

// 10. Enable MFA
export type TEnableMFAResponse = z.infer<typeof EnableMFAResponseSchema>;

// 11. Disable MFA
export type TDisableMFAResponse = z.infer<typeof DisableMFAResponseSchema>;

// --- Password Reset ---

// 12. Generate Password Reset Token
export type TGeneratePasswordResetTokenArgs = z.infer<typeof GeneratePasswordResetTokenArgsSchema>;
export type TGeneratePasswordResetTokenResponse = z.infer<typeof GeneratePasswordResetTokenResponseSchema>;

// 13. Change Password
export type TChangePasswordArgs = z.infer<typeof ChangePasswordArgsSchema>;
export type TChangePasswordResponse = z.infer<typeof ChangePasswordResponseSchema>;

// --- Google OAuth ---

// 14. Get Google OAuth URL (Web)
export type TGetGoogleOAuthUrlArgs = z.infer<typeof GetGoogleOAuthUrlArgsSchema>;
export type TGetGoogleOAuthUrlResponse = z.infer<typeof GetGoogleOAuthUrlResponseSchema>;

// 15. Google OAuth Callback (Web)
export type TGoogleOAuthCallbackArgs = z.infer<typeof GoogleOAuthCallbackArgsSchema>;
export type TGoogleOAuthCallbackResponse = z.infer<typeof GoogleOAuthCallbackResponseSchema>;
