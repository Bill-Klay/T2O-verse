export type UserData = {
  message: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    roles: [];
    twofa_enabled: boolean;
  };
  success: boolean;
};
