export interface RegisterUserInput {
  fullName: string;
  username: string;
  email: string;
  password: string;
  phone?: string;
  bio?: string;
  avatar?: string;
}