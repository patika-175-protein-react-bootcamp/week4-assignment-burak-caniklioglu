import React  from 'react';
import SmallCircle from '../constants/icons/GamePage/SmallCircle';
import Student from '../constants/icons/GamePage/Student';
import '../App.css';

import { useGame } from '../contexts/context';

function GameP() {

    const {tour, // tur sayısı
    setStep, // her bir soru adımı
    score, // gecici skor
    setScore, // gecici skor setleme
    questions, // gecici toplam soru sayısı
    setCorrect, // arka planı kırmızı yeşil yapan fonksiyon
    allQuestions, // tüm sorulmus sorular
    setPoint, // gecici skoru sessiona kaydetmek ve gecici skoru da sıfırlamak icin kullandıgım fonksiyon
    clicked, // tıklanılanı siyah diğerlerini de uygun renk yapma
    setClicked, //// tıklanılanı siyah diğerlerini de uygun renk yapan fonksiyon
    tempCorrect, // gecici doğru cevap
    setTempCorrect, // gecici doğru cevap setleme
    disabled,   // soruya tıklanıldığında disabled olması için
    setDisabled // soruya tıklanıldığında disabled olması için fonksiyon
    } = useGame()
  
    
  


  const handleClick = (e,item) => {
    setDisabled(true) // soruya tıklanıldığında disabled olması için
    item.active = true // tıklananın renkini değiştirme
    setClicked(true); // tıklanılanı siyah diğerlerini de uygun renk yapma
    if(Number(e.currentTarget.innerText) === questions.resultTrue){
      questions.isCorrect = true;
      
      setTempCorrect([...tempCorrect,questions])
      setTimeout(() => {
        if(Number.isInteger(Math.sqrt(questions.resultTrue))){ // karekökünün tam olup olmadığını kontrol ediyoruz
          setScore(Number(score) + Math.floor(Math.sqrt(questions.resultTrue)));
          setPoint(Number(score) + Math.floor(Math.sqrt(questions.resultTrue)));
        }else{
          setScore(Number(score) + Math.floor(Math.sqrt(questions.resultTrue))+1);
          setPoint(Number(score) + Math.floor(Math.sqrt(questions.resultTrue))+1);
        }
        
      },3000)
    }

    const checkedAnswer = Number(e.currentTarget.innerText) === questions.resultTrue ? "correct" : "uncorrect";
    // arkaplanın kırmızı yeşil olması için
    setCorrect(checkedAnswer);
    
    setTimeout(()=>{
      setStep((prevStep) => prevStep + 1);
    },3000) // 3 saniye sonra bir sonraki soruya geçmesini sağlıyoruz ayrıca contexte yazdığımız fonksiyonlar calısıyor
  }
  
  return (
    <>
         <div className='left-game'>
          <Student/> 
          <div className="conc">
            <span>{questions.firstNumber}</span>
            <span>X</span>
            <span>{questions.secondNumber}</span>
          </div>
        </div>
        <div className='right-game'>
          <div className='score-container'>
            <p className="game-score">Score: <span>{score}</span></p>
            <p className="game-score">Tour: <span>{tour}</span></p>
            <p className="game-score">Questions: <span>{tempCorrect.length}</span><span>/</span><span>{allQuestions.length+1}</span></p>
          </div>
          <div className="circles">
            {questions?.answers?.map((item, index) => (
              <button className={`circle circle-${index}`} key = {index}onClick={(e) => handleClick(e,item) } disabled = {disabled}>
                <SmallCircle item={item} clicked={clicked} questions={questions} />
                
              </button>
            ))}
          </div>
        </div>
    </>
  )
}

export default GameP