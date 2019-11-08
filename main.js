// Group choice
let choice = 'Group All';

window.onload = function () {
    // Remove guide image after an answer is submitted
    if (sessionStorage.getItem('answerSubmitted') == 1) $('.guide-img').remove();

    // Removes guide image below a certain window width
    if ($(window).width() < 1100) $('.guide-img').remove();
    
    // Selecting the chosen character group
    let chosenGroup = groups[choice];

    // Retrieving points from sessionStorage
    // If no points are found, set the values to '0'
    let correctPoints = parseInt(sessionStorage.getItem('correctPoints')) | 0;
    let incorrectPoints = parseInt(sessionStorage.getItem('incorrectPoints')) | 0;

    // Selecting a random character, displaying it and retrieving its correct answer
    let dictKeys = Object.keys(chosenGroup);
    let random = Math.floor(Math.random() * dictKeys.length);
    let randomKey = dictKeys[random]
    let correctAnswer = chosenGroup[randomKey];

    // Displaying character in view
    $('#q-char').text(randomKey);

    // Displaying points in view
    $('#correct-stats').text(correctPoints);
    $('#incorrect-stats').text(incorrectPoints);

    SubmitAnswer(correctAnswer, correctPoints, incorrectPoints);
    RevealAnswer(correctAnswer);
}

function SubmitAnswer(correctAnswer, correctPoints, incorrectPoints) {
    $('.btn').click(function () {
        let message = '';

        // Retrieving user answer
        let userAnswer = $('#character').val();

        // Skip the character if the input is empty
        if (userAnswer === '') return;

        // If guide is not closed, close it
        sessionStorage.setItem('answerSubmitted', 1);

        // Comparing user answer to actual answer and displaying a result
        // Storing new point values
        if (userAnswer === correctAnswer)
        {
            message = 'Correct!';
            sessionStorage.setItem('correctPoints', correctPoints + 1);
        }
        else
        {
            message = `Incorrect! The correct answer is: ${correctAnswer}`;
            sessionStorage.setItem('incorrectPoints', incorrectPoints + 1);
        }
        
        alert(message);
    });
}

function RevealAnswer(correctAnswer) {
    // Reveals answer by changing element properties
    $('#reveal-answer').click(function () {
        $(this).removeClass('badge');
        $(this).removeClass('badge-primary');
        $(this).css('cursor', 'text');
        $(this).text(`Answer: '${correctAnswer}'`);
    });
}