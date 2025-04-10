export class Article {
  constructor(
    public archive: boolean,
    public author: string,
    public content: string,
    public creation_date: Date,
    public tag: string,
    public title: string,
    public edition_date: Date,
    public ratings: number[],
    public image: string,
    public comments: any[],
    public averageRating: number,
    public quizzesIds?: any[],
    public slug?: string,// ? pour etre omis lors de la création
    public id?: string,
    public quizzes?: any[],
  ) { }

}
