// export class Contact {
//     constructor(
//         public username: string,
//         public email: string,
//         public message: string
//     ) { }
// }

export class Contact {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public message: string
    ) { }

    get username() {
        return `${this.firstName} ${this.lastName}`;
    }
}
