export type UserData = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  roles: string[];
  twofa_enabled: boolean;
};
