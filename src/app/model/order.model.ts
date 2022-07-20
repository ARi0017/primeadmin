export class OrderStatus {
    constructor(
        public _id: string = "",
        public statusTitle: string = "",
        public remarks: string = "",
    ){}
}

export class Order {
    constructor(
        public isActive?: string,
        public _id?: string,
        public createdDate?: Date
    ){}
}

export class OrderDetail {
    constructor(
        
        public isActive?: string,
        public _id?: string,
        public createdDate?: Date
    ){}
}
