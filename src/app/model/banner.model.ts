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
    public remarks: string = "",
    public image: string = "",
    public displayOrder: number = 0,
    public isHead: boolean = false,
    public isActive?: string,
    public _id?: string,
    public createdDate?: Date,
  ) {}
}