export class quiz{
    constructor(data , numberOfQuestion){
        this.data = data;
        this.numerOfquestions = numberOfQuestion;
        this.currentQuestionElement = document.getElementById("currentQuestion");
        this.totalAmountQuestionsElement = document.getElementById("totalAmountQuestions");
        this.questionElement = document.getElementById("question");
        this.rowAnswerElement = document.getElementById("rowAnswer");
        this.nextbtn = document.getElementById("next");
        this.answerElement = document.getElementsByName("answer");
        this.scoreElement = document.getElementById("score");
        this.tryBtn = document.getElementById("tryBtn");
        this.currentQuestion = 0;
        this.score = 0;

        this.nextbtn.addEventListener("click" , this.nextQuestion.bind(this));
        this.tryBtn.addEventListener("click" , this.tryAgain.bind(this));
        this.showQuestions();
    }

    showQuestions(){
        $("#Correct").fadeOut();
        $("#inCorrect").fadeOut();
        this.questionElement.innerHTML = this.data[this.currentQuestion].question;
        this.totalAmountQuestionsElement.innerHTML = this.numerOfquestions;
        this.currentQuestionElement.innerHTML = this.currentQuestion+1;

        this.getAnswers(this.currentQuestion);
    }

    getAnswers(currentQuestion){
        let answers = [
            this.data[currentQuestion].correct_answer ,
            ...this.data[currentQuestion].incorrect_answers
        ]

        answers = answers.sort( () => 0.5 - Math.random() );

        
        let cartona =``;
        for (let i = 0; i < answers.length; i++) {

            cartona += `
                    <div class="form-check">
                        <label class="form-check-label">
                            <input type="radio" class="form-check-input" name="answer" id="q${i}" value="${answers[i]}">
                            ${answers[i]}
                        </label>
                    </div>`

            this.rowAnswerElement.innerHTML = cartona ;
        }
        
    }

    nextQuestion(){
        let chekedAnswer = [...this.answerElement].filter(el => el.checked)[0].value ;
        this.checkAnswer(chekedAnswer);
        this.currentQuestion++;
        this.currentQuestion < this.numerOfquestions ? this.showQuestions() : this.finish() ;
        

        console.log(chekedAnswer);
    }

    checkAnswer(chekedAnswer){
        if (this.data[this.currentQuestion].correct_answer == chekedAnswer) {
            $("#Correct").fadeIn(500);
            this.score++;
        } else {
            $("#inCorrect").fadeIn(500);
        }
    }
    finish(){
        $("#quiz").fadeOut(500 , () => {
            $("#finish").fadeIn(500) ;
        });
        this.scoreElement.innerHTML = this.score ;
    }
    tryAgain(){
        $("#Correct").fadeOut();
        $("#inCorrect").fadeOut();

        this.currentQuestion = 0;

        $("#finish").fadeOut(500 , () => {
            $("#setting").fadeIn(500) ;
        });
    }
}
