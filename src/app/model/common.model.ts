export interface IMenu {
  _id?: string;
  title: string;
  url: string;
  icon: string;
  category: string;
  priority: string;
}

export interface IRole {
  _id: string;
  name: string;
  createdDate?: Date;
  isActive?: string;
  menu?: {
    menuId: string;
    view: boolean;
    add: boolean;
    edit: boolean;
    delete: boolean;
  }[];
}

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