export class Comment {
    constructor (
        public id: number,
        public archive: boolean,
        public author: string,
        public content: string,
        public creationDate: Date,
        public articleId: string,
        public quizId: string,
    ) { }
}
