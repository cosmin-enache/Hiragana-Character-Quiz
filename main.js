// Group choice
let choice = 'Group All';

window.onload = function () {
    // Selecting the chosen character group
    let chosenGroup = groups[choice];

    // Retrieving points from sessionStorage
    // If no points are found, set the values to '0'
    let correctPoints = parseInt(sessionStorage.getItem('correctPoints')) | 0;
    let incorrectPoints = parseInt(sessionStorage.getItem('incorrectPoints')) | 0;
    
    // Displaying points in view
    $('#correct-stats').text(correctPoints);
    $('#incorrect-stats').text(incorrectPoints);

    // Selecting a random character, displaying it and retrieving its correct answer
    let dictKeys = Object.keys(chosenGroup);
    let random = Math.floor(Math.random() * dictKeys.length);
    let randomKey = dictKeys[random]

    $('#q-char').text(randomKey);
    
    let correctAnswer = chosenGroup[randomKey];
    
    $('.btn').click(function () {
        // Retrieving user answer
        let userAnswer = $('#character').val();

        // Skip the character if the input is empty
        if (userAnswer === '')
        {
            return;
        }

        // Comparing user answer to actual answer and displaying a result
        // Storing new point values
        if (userAnswer === correctAnswer)
        {
            alert('Correct!');
            sessionStorage.setItem('correctPoints', correctPoints + 1);
        }
        else
        {
            alert(`Incorrect! The correct answer is: ${correctAnswer}`);
            sessionStorage.setItem('incorrectPoints', incorrectPoints + 1);
        }
    });

    RevealAnswerClick(correctAnswer);
}

function RevealAnswerClick(correctAnswer) {
    $('#reveal-answer').click(function () {
        $(this).removeClass('badge');
        $(this).removeClass('badge-primary');
        $(this).css('cursor', 'text');
        $(this).text(`Answer: ${correctAnswer}`);
    });
}