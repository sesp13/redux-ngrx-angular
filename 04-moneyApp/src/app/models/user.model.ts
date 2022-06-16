export interface User {
  userId?: string;
  name?: string;
  email?: string | undefined | null;
}

export const parseFirebaseUser = ({ email, userId, name }: any): User => {
  return {
    userId,
    name,
    email,
  };
};
