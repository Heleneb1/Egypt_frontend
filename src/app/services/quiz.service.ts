import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; // Assurez-vous d'importer HttpClient
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class QuizService {

    private quizDataUrl = environment.apiUrl + '/quizzes';

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