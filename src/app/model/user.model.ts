export class User {
  constructor(
    public name: string,
    public email: string,
    public phone: string,
    public role: any,
    public password?: string,
    public _id?: string,
    public isActive?: string
  ) {}
}
