export class Customer {
    constructor(
        public name: string = "",
        public phone: string = "",
        public email: string = "",
        public referralCode: string = "",
        public isActive?: string,
        public _id?: string,
        public createdDate?: Date
    ){}
}
