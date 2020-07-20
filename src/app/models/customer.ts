export class Customer {
  constructor(
    public Name: string,
    public Phone: string,
    public DefaultAddress: string,
    public Email: string,
    public DefaultLandmark: string,
    public DefaultPincode: string,
    public ProfileImage: object,
    public CreatedBy: number,
    public RefCode: string,
    public CustomerType: string,
    public CustomerId?: string,
    public data?: object
  ) { }
}
