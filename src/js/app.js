const $ = require('jquery');

import {
  startButton,
  startSection,
  startText,
  quizSection,
  questionContainer,
  scoreContainer,
  quizScore,
  answersContainer,
  msg,
  resetButton,
  resetting
} from './dom-elements';

const questions = require('./questions');

// Append year to span
{
  let year = new Date();
  let yearSpan = document.querySelector('.year');

  yearSpan.innerHTML = year.getFullYear();
}

// Quiz App
{
  // Counters for questions and answers
  let i = 0;
  let j = 0;

  // State of questions and score
  const state = {
    score: 0
  };

  // Begin quiz after pressing start
  const handleStartClick = () => {
    startButton.on('click', startButton, () => {
      // reRender();
      startButton.addClass('start-button-hidden');
      startText.removeClass('starting-text-hidden');

      setTimeout(() => {
        startSection.addClass('hide-start');
        startSection.remove();
        quizSection.addClass('quiz-show');
      }, 2000);
    });
  };

  // Render quiz to screen
  const render = () => {
    // Render score and questions
    quizScore.html(state.score);
    questionContainer.html(questions[i].q);

    // Grab answers from question
    for (j; j < questions[i].a.length; j++) {
      answersContainer.append(`<li><button>${questions[i].a[j]}</button></li>`);
    }
  };

  const reRender = () => {
    // Give 2 second buffer to re-render and empty html containers
    setTimeout(() => {
      quizScore.empty();
      questionContainer.empty();
      answersContainer.empty();
      msg.empty();

      // Allow user to click on answers again
      answersContainer.removeClass('no-pointer-events');
      quizScore.html(state.score);

      // If reached the end of the quiz
      if (i >= questions.length) {
        scoreContainer.addClass('hide-score');
        questionContainer.html(`You've reached the end of the quiz!<br /> Your score was ${state.score}.<br /> Would you like to play again?`);

        // Show reset buton
        resetButton.removeClass('hide-reset');
        return;
      } else {
        // Re-render html and advance to next question
        questionContainer.html(questions[i].q);

        // Grab answers from question
        for (j; j < questions[i].a.length; j++) {
          answersContainer.append(`<li><button>${questions[i].a[j]}</button></li>`);
        }
      }
    }, 2000);
  };

  const advance = () => {
    answersContainer.on('click', 'button', e => {
      if ($(e.currentTarget).html().toLowerCase() === questions[i].correctAnswer.toLowerCase()) {

        // Prevent user from clicking on answer again
        answersContainer.addClass('no-pointer-events');
        msg.html('correct!');
        questionContainer.empty();
        answersContainer.empty();
        state.score += 1;
        i += 1;
        j = 0;
        reRender();
      } else {
        answersContainer.addClass('no-pointer-events');
        msg.html('wrong!');
        questionContainer.empty();
        answersContainer.empty();
        i += 1;
        j = 0;
        reRender();
      }
    });
  };

  const reset = () => {
    resetButton.on('click', () => {
      questionContainer.empty();
      resetButton.addClass('hide-reset');
      resetting.removeClass('reset-text-hidden');
      state.score = 0;
      i = 0;
      j = 0;
      reRender();
      setTimeout(() => {
        resetting.addClass('reset-text-hidden');
        scoreContainer.removeClass('hide-score');
      }, 2000);
    });
  };

  // Initialize Application
  {
    handleStartClick();
    render();
    advance();
    reset();
  }
}
