export class Category {
  constructor(
    public ParentCategoryId:number,
    public Category:string,
    public CoverImage:any,
    public CoverVideo:string,
    public Description:string,
    public CreatedBy:number,
    public IsSpecial:string,
    public IsFeatured:number,
    public CategoryId?:number,
  ) {}
}

