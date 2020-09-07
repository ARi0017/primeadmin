export class Category {
  constructor(
    public ParentCategoryId:string,
    public Category:string,
    public CoverImage:string,
    public CoverVideo:string,
    public Description:string,
    public CreatedBy:number,
    public IsFeatured:string,
    public IsEdit:string,
    public CategoryId?:number,
    public IsActive?:string,
    public CategoryMain?:string,
    public CategoryParent?:string,
  ) {}
}

