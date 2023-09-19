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

    // insertQuiz(data: any) {
    //     this.quizDataUrl + '/quiz';
    //     return this.httpClient.post(this.quizDataUrl + '/quizzes', data);
    // }
}
