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


export class CustomerAddress {
    constructor(
        public customerId: string = "",
        public addressTitle: string = "",
        public name: string = "",
        public phone: string = "",
        public address: string = "",
        public landmark: string = "",
        public pincode: string = "",
        public location: string = "",
        public longitude: string = "",
        public isActive?: string | Boolean,
        public softDelete?: string | Boolean,
        public createdDate?: Date,
        public createdBy?: string,
        public modifiedDate?: Date,
        public modifiedBy?: string
    ){}
}

export class CustomerAccount {
    constructor(
        public bankName: string = "",
        public bankBranch: string = "",
        public ifscCode: string = "",
        public accountHolderName: string = "",
        public accountNumber: string = "",
        public panNumber: string = "",
        public aadharNumber: string = "",
        public accountImage: string = "",
        public panImage: string = "",
        public aadharImage: string = "",
        public walletAmount: number = 0,
        public panVerified: string = "",
        public bankVerified: string = "",
        public isActive?: string | Boolean,
        public softDelete?: string | Boolean,
        public createdDate?: Date,
        public createdBy?: string,
        public modifiedDate?: Date,
        public modifiedBy?: string
    ){}
}

export class CustomerIncentive {
    constructor(
        public _id: string,
        public orderId: {
            _id: string,
            orderNo: string
        },
        public amount: number,
        public remarks: string,
        public createdDate: Date
    ) {}
}
