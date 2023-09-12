export class Article {
  constructor(
    public id: number,
    public archive: boolean,
    public author: string,
    public content: string,
    public creation_date: Date,
    public tag: string,
    public title: string,
    public edition_date: Date,
    public rating: number
  ) {}
}
