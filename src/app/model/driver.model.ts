
export class Driver {
    constructor(
        public name: string = "",
        public phone: string = "",
        public email: string = "",
        public address: string = "",
        public landmark: string = "",
        public pincode: string = "",
        public image: string = "",
        public isOnline: boolean = false,
        public isActive?: string,
        public _id?: string, 
        public createdDate?: Date,
    ){}
}
