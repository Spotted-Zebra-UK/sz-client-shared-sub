import jwt from 'jsonwebtoken';

interface IParsedResponseToken {
  email: string;
  exp: number;
  iat: number;
}

export const parseRecoveryToken = (
  urlSearch: string
): { email: string; token: string, language: string } | undefined => {
  const queryParams = new URLSearchParams(urlSearch);
  const recoveryToken = queryParams.get('token');
  const language = queryParams.get('language');
  if (!recoveryToken) {
    return undefined;
  }
  if (!language) {
    return undefined;
  }

  const parsedToken = jwt.decode(recoveryToken) as IParsedResponseToken | null;

  if (!parsedToken) {
    return undefined;
  }

  return {
    email: parsedToken.email,
    token: recoveryToken,
    language,
  };
};
