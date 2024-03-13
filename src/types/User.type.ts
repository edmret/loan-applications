export interface Role {
  name: string;
  id: string;
}
export interface User {
  username: string;
  password: string;
  roles?: string[];
}
