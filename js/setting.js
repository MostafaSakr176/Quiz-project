import { quiz } from "./quiz.js";

export class settings{
    constructor(){
        this.categoryElement = document.getElementById("category");
        this.difficultyElement = document.getElementsByName("difficulty");
        this.numerOfquestionsElement = document.getElementById("Number");

        this.startBtn = document.getElementById("startBtn");
        this.startBtn.addEventListener("click" , this.startQuiz.bind(this));

    }

    async startQuiz(){
        let category = this.categoryElement.value ;
        let numberOfQuestion = this.numerOfquestionsElement.value ;
        let difficulty = [...this.difficultyElement].filter(el => el.checked)[0].value ;

        let url = `https://opentdb.com/api.php?amount=${numberOfQuestion}&category=${category}&difficulty=${difficulty}`;
        let data = await this.fetchUrl(url);
        
        if (data.length > 0) {
            $("#setting").fadeOut(400 , ()=>{
                $("#quiz").fadeIn(400)
            })

            new quiz(data , numberOfQuestion);
        }

    }

    async fetchUrl(url){
        let response = await fetch(url) ;
        let data = await response.json()
        return data.results ;
    }
}