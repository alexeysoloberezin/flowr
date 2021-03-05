

(function() {
  var questions = [{
    question: "Как Вы относитесь к этому празднику?",    
    choices: ["Очень люблю! Уже начала готовиться.", "Нейтрально, но зато высплюсь, выходной же!", "У меня каждый день праздник!)"],

  }, {
    question: "Что Вы делали в первый день весны?", 

    choices: ["Была отчаянно красива на краешке Земли", "Не помню, у меня режим многозадачности: я то дева, то богиня, потом царица - каждый день новая роль", "Гуляла, как шальная императрица, до сих пор все берут с меня пример"],

  }, {
    question: "Где бы Вы хотели оказаться 8 марта?",  
    choices: ["На море, конечно.", "На Марсе, только чтобы никто не дергал.", "Я уже точно знаю. Буду в окружении любимых людей."],

  },];
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  var title = document.querySelector('.title') ;
  var subtitle = document.querySelector('.subtitle') ;
  var quizWrapper = document.querySelector('.quiz__wrapper') ;
  

  var image1 = document.createElement("img");
  image1.src = "img/1.jpg";
  var image2 = document.createElement("img");
  image2.src = "img/2.jpg";
  var image3 = document.createElement("img");
  image3.src = "img/3.jpg";
  var image4 = document.createElement("img");
  image4.src = "img/4.jpg";
  var image5 = document.createElement("img");
  image5.src = "img/5.jpg";
  var image6 = document.createElement("img");
  image6.src = "img/6.jpg";

  var imgBlock1 =  document.createElement('div');
  imgBlock1.append(image1);
  imgBlock1.classList.add('image');

  var imgBlock2 =  document.createElement('div');
  imgBlock2.append(image2);
  imgBlock2.classList.add('image');
  
  var imgBlock3 =  document.createElement('div');
  imgBlock3.append(image3);
  imgBlock3.classList.add('image');

  var imgBlock4 =  document.createElement('div');
  imgBlock4.append(image4);
  imgBlock4.classList.add('image');

  var imgBlock5 =  document.createElement('div');
  imgBlock5.append(image5);
  imgBlock5.classList.add('image');

  var imgBlock6 =  document.createElement('div');
  imgBlock6.append(image6);
  imgBlock6.classList.add('image');

  var images = [{    
    image : imgBlock1
  }, {
    image : imgBlock2
  }, {
    image : imgBlock3
  },];

  var imagesend = [{    
    imageend : imgBlock4
  }, {
    imageend : imgBlock5
  }, {
    imageend : imgBlock6
  },];

 
  // document.body.append(imgBlock);

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Выберите вариант ответа!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    
  
  
    qElement.append(images[index].image);

    var question = $('<h2>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    
    var item;
    var radioList = $('<ul>');    
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      
      item = $('<li>');
      
      
      input = '<input type="radio" name="answer" value=' + i + ' />';
     
      input += questions[index].choices[i];
      item.append(input);
      var label = document.createElement("label");
      label.name = "answer";
      item.append(label) 
      radioList.append(item);

    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  var subtitle = document.querySelector('.subtitle');
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        var scoreElem2 = displayScore2();
        quiz.append(scoreElem2).fadeIn();
        quiz.append(scoreElem).fadeIn();      
        title.classList.add('active');
        title.classList.add('active-end');
        subtitle.textContent = "Результат";
        quizWrapper.classList.add('active-end');
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    var answers = [
  "легкое и радостное 8 марта . Вы будете собирать восторженные взгляды и даже наш аппарат Ovison, который и производит оплату по лицу, захотел бы заплатить за Вас.",
  "эпатажное 8 марта: из ресторана в ресторан, там цветы, тут подарки. Не удивимся, если в пробке машины, на которых установлено умное заднее стекло ADcar, будут писать Вам комплименты. ФОТО ЭДКАР",
  "8 марта в движении. Вашей энергии можно позавидовать, неизвестно у кого мощнее заряд у Вас или у батареи на суперконденсаторах от участника акселератора - Titan Power Solution."
]
var randomAnswer = answers[Math.floor(Math.random() * answers.length)];


    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('Вам подойдет ' + randomAnswer);
    
    return score;
  }
  function displayScore2() {
    var score2 = $('<p>',{id: 'imageend'});
    var answers2 = [
  imgBlock4,
  imgBlock5,
  imgBlock6
]
var randomAnswer2 = answers2[Math.floor(Math.random() * answers2.length)];


    var numCorrect2 = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect2++;
      }
    }
    
    score2.append(randomAnswer2);
    
    return score2;
  }
})();




var btnStart = document.querySelector('.button-quizy');
btnStart.addEventListener('click', function(){
  document.querySelector('.quiz__wrapper').classList.add('active');
  document.querySelector('.title').classList.remove('active');
});