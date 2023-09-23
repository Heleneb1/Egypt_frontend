import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; // Assurez-vous d'importer HttpClient
import { environment } from "src/environments/environment";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class QuizService {

    private quizDataUrl = environment.apiUrl + '/quizzes';
    private questionDataUrl = environment.apiUrl + '/questions';

    questionTitles: any = [];
    constructor(private httpClient: HttpClient) { }

    getQuizzes() {
        return this.httpClient.get(this.quizDataUrl);
    }
    addRating(quizId: string, userRating: number) {
        const url = `${this.quizDataUrl}/${quizId}/rating`;
        this.httpClient.put<any>(url, { rating: userRating }).subscribe(
            updatedQuiz => {
                console.log('Quiz mis à jour avec le vote :', updatedQuiz);
            },
            error => {
                console.error('Erreur lors de la mise à jour du quiz :', error);
            }
        );
    }
    getQuizById(quizId: string) {
        return this.httpClient.get(`${this.quizDataUrl}/${quizId}`);
    }
    getQuestionByTitle(questionId: string): Observable<string> {
        console.log(questionId);

        return this.getQuestionById(questionId).pipe(map((question: any) => `${question.question_title} `));

    }
    getQuestionById(questionId: string) {
        return this.httpClient.get(`${this.questionDataUrl}/${questionId}`);
    }
    getQuestionContent(questionId: string): Observable<any> {
        return this.getQuestionById(questionId).pipe(
            map((question: any) => {
                return {
                    id: question.id,
                    content: question.question_title,
                    option_1: question.option_1,
                    option_2: question.option_2,
                    option_3: question.option_3,
                    answer1: question.rigth_answer,
                    answer2: question.rigth_answer_2

                };
            })
        );
    }
    // addRating(promotionId: string, userRating: number, authorId: string) {
    //     const url = environment.apiUrl + `/promotions/${promotionId}/users/${authorId}`;

    //     this.httpClient.put<any>(url, { rating: userRating }).subscribe(
    //       updatedPromotion => {
    //         console.log('Promotion mise à jour avec le vote :', updatedPromotion);
    //       },
    //       error => {
    //         console.error('Erreur lors de la mise à jour de la promotion :', error);
    //       }
    //     );
    //   }

    // insertQuiz(data: any) {
    //     this.quizDataUrl + '/quiz';
    //     return this.httpClient.post(this.quizDataUrl + '/quizzes', data);
    // }
}
