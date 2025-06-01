document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos del DOM ---
    const questionArea = document.getElementById('question-area');
    const levelTitle = document.getElementById('level-title');
    const questionText = document.getElementById('question-text');
    const userAnswerInput = document.getElementById('user-answer');
    const submitBtn = document.getElementById('submit-btn');
    const nextBtn = document.getElementById('next-btn');
    const feedbackArea = document.getElementById('feedback-area');
    const feedbackMessage = document.getElementById('feedback-message');
    const correctAnswerDisplay = document.getElementById('correct-answer-display');
    const gameOverScreen = document.getElementById('game-over-screen');
    const finalScoreDisplay = document.getElementById('final-score');
    const restartBtn = document.getElementById('restart-btn');
    const instructions = document.getElementById('instructions');
    const currentQIndexDisplay = document.getElementById('current-q-index');
    const totalQDisplay = document.getElementById('total-q');
    const scoreDisplay = document.getElementById('score');

    // --- Variables de Estado del Juego ---
    let currentQuestionIndex = 0;
    let score = 0;

    // --- Preguntas del Juego (Adaptadas de tu Guía) ---
    const questions = [
        // Nivel 1: Descifrando el Código (Términos Clave - Respuesta Corta)
        {
            type: 'quiz_short',
            level: 'Nivel 1: Descifrando el Código',
            question: "Soy la declaración que especifica la versión de HTML utilizada al inicio de un documento. ¿Qué soy?",
            correctAnswer: "<!DOCTYPE>",
            feedback: "¡Correcto! Eres la declaración `<!DOCTYPE>`. ¡Empezamos bien!"
        },
        {
            type: 'quiz_short',
            level: 'Nivel 1: Descifrando el Código',
            question: "Soy el elemento raíz que envuelve todo el contenido de la página HTML. ¿Qué soy?",
            correctAnswer: "<html>",
            feedback: "¡Así es! Eres el elemento `<html>`. ¡Un envoltorio esencial!"
        },
        {
            type: 'quiz_short',
            level: 'Nivel 1: Descifrando el Código',
            question: "Contengo metadatos sobre el documento HTML (título, CSS), pero mi contenido no es visible en la página. ¿Qué elemento soy?",
            correctAnswer: "<head>",
            feedback: "¡Excelente! Eres el elemento `<head>`. La cabeza pensante de la página."
        },
        {
            type: 'quiz_short',
            level: 'Nivel 1: Descifrando el Código',
            question: "Indico texto importante y normalmente se muestra en negrita. ¿Qué elemento de énfasis soy?",
            correctAnswer: "<strong>",
            feedback: "¡Bien hecho! Eres `<strong>`. ¡Demasiado importante para no ser notado!"
        },
        {
            type: 'quiz_short',
            level: 'Nivel 1: Descifrando el Código',
            question: "Soy un atributo que se utiliza en elementos de multimedia (`<audio>`, `<video>`, `<img>`) para mejorar la accesibilidad, proporcionando una descripción si el contenido no se carga o para lectores de pantalla. ¿Qué atributo soy?",
            correctAnswer: "alt",
            feedback: "¡Correcto! Eres el atributo `alt`. ¡La accesibilidad es clave para un buen desarrollador!"
        },

        // Nivel 2: La Primera Pincelada (Quiz de Repaso)
        {
            type: 'quiz_detailed',
            level: 'Nivel 2: La Primera Pincelada',
            question: "¿Cuál es la función principal del elemento `<head>` en un documento HTML? (2-3 oraciones)",
            correctAnswer: "El elemento <head> contiene metadatos sobre el documento HTML, como el título de la página, enlaces a hojas de estilo y scripts, y otra información que no es visible directamente en el contenido de la página.",
            feedback: "¡Correcto! El elemento `<head>` contiene metadatos sobre el documento HTML, como el título de la página, enlaces a hojas de estilo y scripts, y otra información que no es visible directamente en el contenido de la página."
        },
        {
            type: 'quiz_detailed',
            level: 'Nivel 2: La Primera Pincelada',
            question: "Explica la diferencia entre los elementos `<strong>` y `<em>`.",
            correctAnswer: "Ambos elementos se utilizan para dar énfasis al texto. <strong> indica texto importante (normalmente mostrado en negrita), mientras que <em> indica texto enfatizado (normalmente mostrado en cursiva).",
            feedback: "¡Muy bien! Ambos elementos se utilizan para dar énfasis al texto. `<strong>` indica texto importante (normalmente mostrado en negrita), mientras que `<em>` indica texto enfatizado (normalmente mostrado en cursiva)."
        },
        {
            type: 'quiz_detailed',
            level: 'Nivel 2: La Primera Pincelada',
            question: "¿Qué atributo es esencial para definir el destino de un enlace utilizando el elemento `<a>`?",
            correctAnswer: "El atributo href es esencial para definir el destino de un enlace. Este atributo especifica la URL o ruta del recurso al que apunta el enlace.",
            feedback: "¡Efectivamente! El atributo `href` es esencial para definir el destino de un enlace. Este atributo especifica la URL o ruta del recurso al que apunta el enlace."
        },
        {
            type: 'quiz_detailed',
            level: 'Nivel 2: La Primera Pincelada',
            question: "Describe la función de los elementos `<tr>` y `<td>` dentro de una tabla HTML.",
            correctAnswer: "Dentro de una tabla HTML, <tr> define una fila completa de la tabla, mientras que <td> define una celda de datos individual dentro de esa fila.",
            feedback: "¡Respuesta precisa! Dentro de una tabla HTML, `<tr>` define una fila completa de la tabla, mientras que `<td>` define una celda de datos individual dentro de esa fila."
        },
        {
            type: 'quiz_detailed',
            level: 'Nivel 2: La Primera Pincelada',
            question: "En CSS, ¿cuál es la diferencia principal entre un selector de clase (.) y un selector de ID (#)?",
            correctAnswer: "Un selector de clase (.nombreclase) puede ser aplicado a múltiples elementos en un documento HTML para aplicarles los mismos estilos CSS. Un selector de ID (#nombreid) debe ser único para un solo elemento en el documento y se utiliza para aplicar estilos específicos a ese elemento particular.",
            feedback: "¡Lo tienes! Un selector de clase (`.nombreclase`) puede ser aplicado a múltiples elementos en un documento HTML para aplicarles los mismos estilos CSS. Un selector de ID (`#nombreid`) debe ser único para un solo elemento en el documento y se utiliza para aplicar estilos específicos a ese elemento particular."
        },
        {
            type: 'quiz_detailed',
            level: 'Nivel 2: La Primera Pincelada',
            question: "Menciona tres propiedades comunes que forman parte del modelo de caja en CSS.",
            correctAnswer: "Tres propiedades comunes que forman parte del modelo de caja en CSS son margin, padding y border. Estas propiedades controlan el espacio alrededor, dentro y en el borde de un elemento, respectivamente.",
            feedback: "¡Excelente! Tres propiedades comunes que forman parte del modelo de caja en CSS son `margin`, `padding` y `border`. Estas propiedades controlan el espacio alrededor, dentro y en el borde de un elemento, respectivamente."
        },
        {
            type: 'quiz_detailed',
            level: 'Nivel 2: La Primera Pincelada',
            question: "¿Para qué se utiliza la regla `@media` en CSS?",
            correctAnswer: "La regla @media se utiliza en CSS para aplicar reglas de estilo condicionales basadas en las características del dispositivo o la ventana gráfica, como el tamaño de la pantalla. Esto es fundamental para crear diseños responsivos.",
            feedback: "¡Exacto! La regla `@media` se utiliza en CSS para aplicar reglas de estilo condicionales basadas en las características del dispositivo o la ventana gráfica, como el tamaño de la pantalla. Esto es fundamental para crear diseños responsivos."
        },
        {
            type: 'quiz_detailed',
            level: 'Nivel 2: La Primera Pincelada',
            question: "¿Cuál es la función del at-rule `@keyframes` en CSS?",
            correctAnswer: "El at-rule @keyframes se utiliza para definir los pasos o estados de una animación CSS. Especifica cómo debe cambiar un elemento a lo largo del tiempo durante la animación.",
            feedback: "¡Correcto! El at-rule `@keyframes` se utiliza para definir los pasos o estados de una animación CSS. Especifica cómo debe cambiar un elemento a lo largo del tiempo durante la animación."
        },
        {
            type: 'quiz_detailed',
            level: 'Nivel 2: La Primera Pincelada',
            question: "¿Qué hace la propiedad transform en CSS, específicamente la función rotate?",
            correctAnswer: "La propiedad transform en CSS permite modificar la forma, tamaño o posición de un elemento. Específicamente, la función rotate() gira un elemento alrededor de su punto central o un punto de origen especificado.",
            feedback: "¡Buena respuesta! La propiedad `transform` en CSS permite modificar la forma, tamaño o posición de un elemento. Específicamente, la función `rotate()` gira un elemento alrededor de su punto central o un punto de origen especificado."
        },

        // Nivel 3: El Lienzo en Blanco (Preguntas de Ensayo - Auto-evaluación)
        {
            type: 'essay',
            level: 'Nivel 3: El Lienzo en Blanco',
            question: "Describe y compara la estructura básica de un documento HTML, explicando la función de los elementos <DOCTYPE>, <html>, <head>, <title>, y <body>.",
            correctAnswer: "El `<!DOCTYPE>` declara la versión de HTML. `<html>` es el elemento raíz que envuelve todo. `<head>` contiene metadatos invisibles como el `<title>` (título de la pestaña del navegador) y enlaces a CSS/JS. `<body>` contiene todo el contenido visible de la página.",
            feedback: "¡Excelente explicación! Has abordado la jerarquía fundamental del HTML. Es crucial entender que `<!DOCTYPE>` define la versión, `<html>` es el contenedor principal, `<head>` maneja la información invisible pero vital de la página, `<title>` da nombre a la pestaña, y `<body>` es donde reside todo el contenido visible. ¡Un buen arquitecto web lo sabe! (Revisa tu respuesta y compara si incluiste estos puntos clave)."
        },
        {
            type: 'essay',
            level: 'Nivel 3: El Lienzo en Blanco',
            question: "Explica el concepto del modelo de caja en CSS y cómo las propiedades margin, padding, y border afectan la disposición y el tamaño de los elementos HTML en una página web.",
            correctAnswer: "El modelo de caja en CSS trata cada elemento HTML como una caja rectangular que tiene contenido, padding (espacio interno), borde (línea alrededor) y margen (espacio externo). El `padding` crea espacio entre el contenido y el borde. El `border` es la línea visible que rodea el padding y el contenido. El `margin` crea espacio alrededor del borde, separando el elemento de otros elementos.",
            feedback: "¡Magnífica descripción del modelo de caja! Tu comprensión de que cada elemento es una 'caja' es clave. Has destacado cómo `padding` crea espacio interno entre el contenido y el borde, `border` dibuja el límite visible, y `margin` genera espacio externo entre esa caja y otros elementos. ¡Dominas el espacio y la composición! (Compara tu respuesta con estos puntos clave)."
        },
        {
            type: 'essay',
            level: 'Nivel 3: El Lienzo en Blanco',
            question: "Analiza cómo se pueden integrar elementos multimedia (imágenes, audio, video) en una página web utilizando HTML y describe los atributos clave para cada tipo de elemento.",
            correctAnswer: "Las imágenes se insertan con `<img>` (atributos clave: `src` para la ruta, `alt` para texto alternativo, `width`/`height`). El audio se incrusta con `<audio>` (atributos: `src`, `controls`, `autoplay`, `loop`). Los videos se incrustan con `<video>` (atributos: `src`, `controls`, `width`/`height`, `autoplay`, `loop`, `poster`).",
            feedback: "¡Impresionante análisis de la multimedia! Has cubierto los elementos `<img>`, `<audio>` y `<video>`, y lo más importante, sus atributos vitales: `src` para la fuente, `alt` para accesibilidad de imágenes, `controls` para la interacción, `width`/`height` para dimensiones. ¡Tu sitio web ahora puede cobrar vida! (¿Cubriste todos estos atributos clave?)"
        },
        {
            type: 'essay',
            level: 'Nivel 3: El Lienzo en Blanco',
            question: "Discute la importancia del diseño responsivo en el desarrollo web moderno y explica cómo las reglas @media y las propiedades de Flexbox (display: flex, flex-wrap, justify-content) contribuyen a lograrlo.",
            correctAnswer: "El diseño responsivo es crucial hoy para que los sitios web se adapten y se vean bien en cualquier dispositivo (móvil, tablet, escritorio). La regla `@media` en CSS permite aplicar estilos condicionalmente según el tamaño de la pantalla u otras características del dispositivo. Flexbox (`display: flex`) es un modelo de diseño que facilita organizar y alinear elementos en filas o columnas. `flex-wrap` controla si los elementos se envuelven a la siguiente línea y `justify-content` alinea los elementos a lo largo del eje principal, lo que permite crear diseños fluidos y adaptativos.",
            feedback: "¡Excelente argumentación sobre la importancia del diseño responsivo! Es fundamental que los sitios se adapten a cualquier dispositivo. Has señalado acertadamente cómo `@media` permite aplicar estilos condicionales y cómo Flexbox con `display: flex`, `flex-wrap` y `justify-content` son herramientas poderosas para organizar el contenido de forma fluida y adaptable. ¡Tu sitio se verá bien en todas partes! (Verifica que tu respuesta incluyó la importancia del responsivo y el rol de `@media` y Flexbox)."
        },
        {
            type: 'essay',
            level: 'Nivel 3: El Lienzo en Blanco',
            question: "Detalla el proceso de creación de una animación simple utilizando CSS, explicando cómo @keyframes y la propiedad animation trabajan juntos para definir y aplicar movimiento a un elemento.",
            correctAnswer: "Para una animación CSS, primero se define el comportamiento de la animación usando `@keyframes`. Dentro de `@keyframes`, se especifican los estados del elemento en diferentes puntos de la animación (usando porcentajes como `0%`, `50%`, `100%` o palabras clave `from`/`to`). Luego, la animación se aplica a un elemento HTML usando la propiedad `animation` (o sus propiedades individuales como `animation-name`, `animation-duration`, `animation-iteration-count`, etc.), que vincula el elemento a los `@keyframes` definidos y configura cómo debe reproducirse la animación.",
            feedback: "¡Perfecta explicación del arte de la animación CSS! Has comprendido que `@keyframes` es donde se 'coreografía' el movimiento (qué estados tendrá el elemento en diferentes puntos de la animación), y la propiedad `animation` es la que 'reproduce' esa coreografía en un elemento específico, controlando su duración, repetición, etc. ¡Tu sitio ahora puede bailar! (¿Explicaste cómo `@keyframes` define el cambio y `animation` lo aplica y configura?)"
        }
    ];

    // --- Funciones del Juego ---

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const q = questions[currentQuestionIndex];
            levelTitle.textContent = q.level;
            questionText.textContent = q.question;
            userAnswerInput.value = ''; // Limpiar la respuesta anterior
            feedbackArea.style.display = 'none'; // Ocultar feedback
            submitBtn.style.display = 'inline-block'; // Mostrar botón de comprobar
            nextBtn.style.display = 'none'; // Ocultar botón siguiente
            userAnswerInput.focus(); // Enfocar el área de texto
            updateProgress();
            instructions.style.display = 'none'; // Ocultar instrucciones al iniciar el juego
        } else {
            endGame();
        }
    }

    function checkAnswer() {
        const q = questions[currentQuestionIndex];
        const userAnswer = userAnswerInput.value.trim().toLowerCase();
        const correctAnswer = q.correctAnswer.trim().toLowerCase();

        feedbackArea.style.display = 'block';
        correctAnswerDisplay.innerHTML = `**Respuesta Correcta:** ${q.correctAnswer}`;

        if (q.type === 'quiz_short' || q.type === 'quiz_detailed') {
            // Para preguntas de quiz, verifica la respuesta
            if (userAnswer === correctAnswer) {
                feedbackMessage.textContent = "¡Correcto! " + q.feedback;
                feedbackMessage.className = 'correct';
                score += 10; // Sumar puntos por respuesta correcta
            } else {
                feedbackMessage.textContent = "Incorrecto. " + q.feedback;
                feedbackMessage.className = 'incorrect';
            }
        } else if (q.type === 'essay') {
            // Para preguntas de ensayo, no hay una "respuesta correcta" estricta para auto-evaluar.
            // Solo muestra la retroalimentación y pide al usuario que se auto-evalúe.
            feedbackMessage.textContent = "¡Has reflexionado sobre el tema! Ahora, compara tu respuesta con la explicación a continuación:";
            feedbackMessage.className = ''; // Sin clase específica de correcto/incorrecto
            // Podríamos dar puntos por intentar, o no darlos para las de ensayo
            score += 5; // Puntos por el esfuerzo en la reflexión
        }
        
        scoreDisplay.textContent = score; // Actualizar la puntuación en la UI

        submitBtn.style.display = 'none'; // Ocultar botón de comprobar
        nextBtn.style.display = 'inline-block'; // Mostrar botón siguiente
    }

    function nextQuestion() {
        currentQuestionIndex++;
        loadQuestion();
    }

    function endGame() {
        questionArea.style.display = 'none';
        progressArea.style.display = 'none';
        gameOverScreen.style.display = 'block';
        finalScoreDisplay.textContent = `Has obtenido ${score} puntos de ${questions.length * 10} posibles (considerando 10 puntos por quiz y 5 por ensayo).`;
    }

    function restartGame() {
        currentQuestionIndex = 0;
        score = 0;
        gameOverScreen.style.display = 'none';
        questionArea.style.display = 'block';
        progressArea.style.display = 'flex'; // Asegurarse que se muestre de nuevo
        instructions.style.display = 'block'; // Volver a mostrar las instrucciones al reiniciar
        loadQuestion();
    }

    function updateProgress() {
        currentQIndexDisplay.textContent = currentQuestionIndex + 1;
        totalQDisplay.textContent = questions.length;
        scoreDisplay.textContent = score;
    }

    // --- Event Listeners ---
    submitBtn.addEventListener('click', checkAnswer);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartGame);

    // Permitir Enter para enviar respuesta
    userAnswerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && submitBtn.style.display !== 'none') {
            e.preventDefault(); // Evita el salto de línea en el textarea
            checkAnswer();
        } else if (e.key === 'Enter' && nextBtn.style.display !== 'none') {
            e.preventDefault();
            nextQuestion();
        }
    });

    // --- Inicializar el Juego ---
    loadQuestion(); // Carga la primera pregunta al cargar la página
    totalQDisplay.textContent = questions.length; // Asegura que el total se muestre desde el inicio
});