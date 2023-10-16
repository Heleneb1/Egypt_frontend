import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; // Assurez-vous d'importer HttpClient
import { environment } from "src/environments/environment";
import { Observable, map } from "rxjs";
import { QuizQuestion } from "../models/quiz-question";
import { loginUser } from "../components/login/login.component";

@Injectable({
    providedIn: 'root'
})
export class QuizService {





    private quizDataUrl = environment.apiUrl + '/quizzes';
    private questionDataUrl = environment.apiUrl + '/questions';
    private badgeDataUrl = environment.apiUrl + '/badges';

    questionTitles: any = [];
    constructor (private httpClient: HttpClient) { }

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
    getQuizQuestions(quizId: string): Observable<QuizQuestion[]> {
        const url = `${this.quizDataUrl}/${quizId}/questions`;
        return this.httpClient.get<QuizQuestion[]>(url);
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
                    answer1: question.right_answer,
                    answer2: question.right_answer_2
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
    createQuestion(data: any) {
        this.questionDataUrl + '/question';
        console.log(this.questionDataUrl + '/create', data);

        return this.httpClient.post(this.questionDataUrl + '/create', data);
    }
    getAllQuestionByCategory(category: string): Observable<any> {
        const url = `${this.questionDataUrl}/category/${category}`;
        return this.httpClient.get<any>(url);
    }
    addQuestionByCategoryToQuiz(quizId: string, category: string) {
        const url = `${this.quizDataUrl}/${quizId}/add-questions`;
        console.log(category);

        const requestBody = { category: category };

        return this.httpClient.put(url, requestBody);
    }


    getQuestionsByCategory(category: string): Observable<any[]> {
        const url = `${this.questionDataUrl}/category/${category}`;
        return this.httpClient.get<any[]>(url);
    }
    getCategories(): Observable<string[]> {
        return this.httpClient.get<any[]>(this.questionDataUrl).pipe(
            map((questions: any[]) => {
                const uniqueCategory = new Set<string>();

                questions.forEach((question: any) => {
                    const category = question.category.split(',').map((c: string) => c.trim());
                    category.forEach((c: string) => uniqueCategory.add(c));
                });

                // Convertion du Set en tableau
                return Array.from(uniqueCategory);
            })
        );

    }



    createQuiz(data: any) {
        console.log(data);

        return this.httpClient.post(this.quizDataUrl + '/create', data);

    }
    deleteQuiz(id: string) {
        return this.httpClient.delete(`${this.quizDataUrl}/${id}`);
    }
    updateQuiz(id: string, updatedQuiz: any) {
        return this.httpClient.put(`${this.quizDataUrl}/${id}`, updatedQuiz);
    }


    updateQuestion(id: string, updatedQuestion: any) {
        return this.httpClient.put(`${this.questionDataUrl}/${id}`, updatedQuestion);
    }
    insertQuestionsbyCategory(quizId: string, category: string) {
        const url = `${this.quizDataUrl}/${quizId}/add-questions`;
        return this.httpClient.put(url, { category: category });
    }
    deleteQuestion(questionId: string) {
        return this.httpClient.delete(`${this.questionDataUrl}/${questionId}`)
    }
    getBadges(): Observable<any[]> {
        return this.httpClient.get<any[]>(this.badgeDataUrl);
    }
    createBadge(data: any) {
        console.log(data);

        return this.httpClient.post(this.badgeDataUrl + '/create', data);
    }
    getBadgeById(badgeId: string) {
        return this.httpClient.get(`${this.badgeDataUrl}/${badgeId}`);
    }


    addBadgeToQuiz(quizId: string, badgeId: string) {
        console.log(`${this.quizDataUrl}/${quizId}/badges/${badgeId}/add-badge`);

        return this.httpClient.put(`${this.quizDataUrl}/${quizId}/badges/${badgeId}/add-badge`, { badgeId: badgeId });
    }
    // @PutMapping("/{id}/badges/{badgeId}/add-badge")
    // public ResponseEntity<QuizDTO> addBadgeToQuiz(@PathVariable UUID id,
    //                 @PathVariable UUID badgeId) {
    //         Quiz quiz = quizRepository.findById(id)
    //                         .orElseThrow(() -> new ResponseStatusException(
    //                                         HttpStatus.NOT_FOUND, "Quiz not found: " + id));

    //         Badge badge = badgeRepository.findById(badgeId)
    //                         .orElseThrow(() -> new ResponseStatusException(
    //                                         HttpStatus.NOT_FOUND, "Badge not found: " + badgeId));

    //         quiz.setBadge(badge);

    //         quizRepository.save(quiz);

    //         QuizDTOMapper mapper = new QuizDTOMapper();
    //         QuizDTO quizDTO = mapper.convertToDTO(quiz);

    //         return ResponseEntity.ok(quizDTO);
    // }

}
