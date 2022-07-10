export class Category {
    constructor(
        public categoryName: string = "",
        public coverImage: string = "",
        public coverVideo: string = "",
        public description: string = "",
        public displayOrder: number = 0,
        public isFeatured: string | Boolean = false,
        public isTopMenu: string | Boolean = false,
        public isActive?: string,
        public _id?: string,
        public createdDate?: Date,
        public createdBy?: string
    ){}
}

export class CategoryDropDown {
    constructor(
        public _id: string,
        public categoryName: string
    ){}
}

