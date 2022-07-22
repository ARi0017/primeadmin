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

export interface ICommission {
  _id: string;
  amount?: string;
  createdDate?: Date;
  remarks?: string;
  orderId?: { isCancelled: string; _id: string; orderNo: string; };
  customerId?: { name: string; phone: string; referralCode?: string; _id: string };
};



