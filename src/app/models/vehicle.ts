export class Vehicle {
  constructor(
    public VehicleId: number,
    public VehicleClass: string,
    public RegistrationNo: string,
    public VehicleBrand: string,
    public FuelType: string,
    public EngineCC: number,
    public Description: string,
    public VehiclaImage: string,

    public CreatedBy?: any

  ) { }
}
