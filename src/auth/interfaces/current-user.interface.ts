export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  iat?: Date;
  exp?: Date;
}
