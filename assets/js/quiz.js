// Quiz Data Bank
const quizzes = {
    class10: [
        {
            question: "In OpenOffice Writer, which menu is used to insert a header?",
            options: ["Format", "Insert", "View", "Tools"],
            answer: 1 // Index of correct option (Insert)
        },
        {
            question: "Scenarios in Calc are used for ________ analysis.",
            options: ["What-If", "Statistical", "Mathematical", "Logical"],
            answer: 0
        },
        {
            question: "In a database, a _______ represents a single data item in a table.",
            options: ["Row", "Record", "Field", "Table"],
            answer: 2
        },
        {
            question: "Which of these is NOT an Instant Messaging software?",
            options: ["Google Talk", "Skype", "Yahoo Messenger", "Notepad"],
            answer: 3
        },
        {
            question: "To consolidate data from different sheets, the sheets must have ________.",
            options: ["Different Labels", "Same Labels", "No Labels", "Formulas"],
            answer: 1
        }
    ],
    class12: [
        {
            question: "Which keyword is used to define a function in Python?",
            options: ["func", "def", "definition", "function"],
            answer: 1
        },
        {
            question: "What is the output of: print(2 ** 3)?",
            options: ["6", "8", "9", "5"],
            answer: 1
        },
        {
            question: "Which SQL command is used to fetch data from a database?",
            options: ["GET", "OPEN", "SELECT", "FETCH"],
            answer: 2
        },
        {
            question: "In Python, which of the following is mutable?",
            options: ["Tuple", "String", "List", "Integer"],
            answer: 2
        },
        {
            question: "Which device is used to connect dissimilar networks?",
            options: ["Switch", "Hub", "Router", "Gateway"],
            answer: 3
        }
    ],
    logic: [
        {
            question: "What comes next: 2, 6, 12, 20, 30, ...?",
            options: ["36", "40", "42", "48"],
            answer: 2 // 42 (n*n+n or +4,+6,+8,+10,+12)
        },
        {
            question: "Python: x = [1, 2, 3]; y = x; y[0] = 5; print(x[0])",
            options: ["1", "5", "Error", "3"],
            answer: 1 // Lists are mutable references
        },
        {
            question: "Which pattern is typically used for a LIFO structure?",
            options: ["Queue", "Stack", "Array", "Tree"],
            answer: 1
        },
        {
            question: "Binary of 10 is ...?",
            options: ["1010", "1001", "1100", "1110"],
            answer: 0
        },
        {
            question: "Find the odd one out:",
            options: ["Python", "Java", "C++", "HTML"],
            answer: 3 // HTML is not a programming language
        }
    ]
};

let currentQuiz = [];
let currentIndex = 0;
let score = 0;
let quizType = '';

// DOM Elements
const quizModal = document.getElementById('quiz-modal');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const quizTitle = document.getElementById('quiz-title');
const resultContainer = document.getElementById('result-container');
const quizContainer = document.getElementById('quiz-content');

// Start Quiz
function startQuiz(type) {
    quizType = type;
    currentQuiz = quizzes[type];
    currentIndex = 0;
    score = 0;

    if (!currentQuiz) {
        alert("Quiz content loading...");
        return;
    }

    // Set Title
    let titleMap = {
        'class10': 'Class 10 IT Challenge',
        'class12': 'Class 12 CS Challenge',
        'logic': 'Logic Builder Challenge'
    };
    quizTitle.innerText = titleMap[type];

    // Show Modal
    quizModal.style.display = 'flex';
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';

    renderQuestion();
}

// Render Question
function renderQuestion() {
    let q = currentQuiz[currentIndex];

    // Update Question Number & Text
    questionText.innerHTML = `<span style="color:var(--accent-color);">Q${currentIndex + 1}.</span> ${q.question}`;

    // Clear old options
    optionsContainer.innerHTML = '';

    // Create Options
    q.options.forEach((opt, index) => {
        let btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = 'quiz-option';
        btn.onclick = () => checkAnswer(index, btn);
        optionsContainer.appendChild(btn);
    });

    // Update Progress
    document.getElementById('question-count').innerText = `${currentIndex + 1} of ${currentQuiz.length}`;
}

// Check Answer
function checkAnswer(selectedIndex, btnElement) {
    let correctIndex = currentQuiz[currentIndex].answer;

    // Disable all buttons
    let allBtns = optionsContainer.children;
    for (let btn of allBtns) {
        btn.disabled = true;
        btn.style.cursor = 'default';
    }

    if (selectedIndex === correctIndex) {
        btnElement.classList.add('correct');
        score++;
    } else {
        btnElement.classList.add('wrong');
        // Highlight correct one
        allBtns[correctIndex].classList.add('correct');
    }

    // Wait and go next
    setTimeout(() => {
        currentIndex++;
        if (currentIndex < currentQuiz.length) {
            renderQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

// Show Results
function showResults() {
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    let percentage = (score / currentQuiz.length) * 100;
    let msg = '';
    let color = '';

    if (percentage >= 80) {
        msg = "Excellent! You are Board Exam Ready! 🏆";
        color = "#10b981";
    } else if (percentage >= 50) {
        msg = "Good Job! Keep practicing to reach the top. 👍";
        color = "#facc15";
    } else {
        msg = "Don't give up! Revision is key. 📚";
        color = "#ef4444";
    }

    document.getElementById('score-text').innerHTML = `You Scored <span style="color:${color}; font-size:2rem;">${score}/${currentQuiz.length}</span>`;
    document.getElementById('result-msg').innerText = msg;
}

// Close Modal
function closeQuiz() {
    quizModal.style.display = 'none';
}
