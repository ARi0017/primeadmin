export class TaxCategory {
    constructor(
      public TaxCategoryId:number,
      public TaxCategory:string,
      public Percentage:number,
      public Description:string,
      public IsActive:string
    ) {}
  }