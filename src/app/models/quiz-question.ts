
export class QuizQuestion {
  selectedOption: any;
  constructor(
    public id: string,
    public category: string,
    public option1: string,
    public option2: string,
    public option3: string,
    public questionTitle: string,
    public rightAnswer: string,
    public rightAnswer2: string,
    public quizId: string
  ) { }

}
