enum Error {
  EMAIL_NOT_FOUND = 'EMAIL_NOT_FOUND',
  RECOVERY_TOKEN_EXPIRED_OR_INVALID = 'RECOVERY_TOKEN_EXPIRED_OR_INVALID',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  EXISTING_ACCOUNT = 'EXISTING_ACCOUNT',
  EXCEEDED_NUMBER_OF_ATTEMPTS = 'EXCEEDED_NUMBER_OF_ATTEMPTS',
  PASSWORD_TOO_WEAK = 'PASSWORD_TOO_WEAK',
  INVITATION_TOKEN_INVALID = 'INVITATION_TOKEN_INVALID',
  INVALID_PLATFORM = 'INVALID_PLATFORM',
  INVALID_PLATFORM_JWT = 'INVALID_PLATFORM_JWT',
  PLATFORM_VERIFICATION_FAILED = 'PLATFORM_VERIFICATION_FAILED',
  INVALID_APIKEY = 'INVALID_APIKEY',
  INVITATION_PROCESSED_SUCCESSFULLY = 'INVITATION_PROCESSED_SUCCESSFULLY',
  USER_ID_DOES_NOT_EXIST = 'USER_ID_DOES_NOT_EXIST',
  INVALID_TOKEN = 'INVALID_TOKEN',
  FIND_MANY_NOT_FOUND = 'FIND_MANY_NOT_FOUND',
  MFA_REQUIRED = 'MFA_REQUIRED',
  INVALID_MFA_CODE = 'INVALID_MFA_CODE',
  EXPIRED_MFA_TOKEN = 'EXPIRED_MFA_TOKEN',
  BAD_USER_INPUT = 'BAD_USER_INPUT',
}

export default Error;
