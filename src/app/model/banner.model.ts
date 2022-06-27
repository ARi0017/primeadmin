export interface IBanner {
  _id?: string;
  name: string;
  image: string;
  remarks: string;
  displayOrder: number;
  isHead: boolean;
  isActive: string;
  createdDate: Date;
}

export class Banner {
  constructor(
    public name: string = "",
    public image: string = "",
    public remarks: string = "",
    public displayOrder: number = 0,
    public isHead: boolean = true,
    public isActive: string = "1",
    public createdDate?: Date,
    public _id?: string,
  ) {}
}