import jwt from 'jsonwebtoken';

interface IParsedResponseToken {
  email: string;
  exp: number;
  iat: number;
}

export const parseRecoveryToken = (
  urlSearch: string
): { email: string; token: string } | undefined => {
  const queryParams = new URLSearchParams(urlSearch);
  const recoveryToken = queryParams.get('token');
  if (!recoveryToken) {
    return undefined;
  }

  const parsedToken = jwt.decode(recoveryToken) as IParsedResponseToken | null;

  if (!parsedToken) {
    return undefined;
  }

  return {
    email: parsedToken.email,
    token: recoveryToken,
  };
};
