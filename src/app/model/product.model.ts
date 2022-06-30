export class IProduct {
}

export class Product {
    constructor(
        public _id: string = "",
        public categoryid: string = "",
        public name: string = "",
        public Category: string = "",
        public description: string = "",
        public image: string = "",
        public video: string = "",
        public hsnCode: string = "",
        public gst: string = "",
        public packetSize: string = "",
        public priceOne: string = "",
        public priceTwo: string = "",
        public priceThree: string = "",
        public commission: string = "",
        public marketedBY: string = "",
        public packedBY: string = "",
        public manufacturedBY: string = "",
        public isShowOnHomePage: string = "",
        public isBestSeller: string = "",
        public isActive: string,
        public createdDate?: Date,
    ){}
}
