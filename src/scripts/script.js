document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const patenteInput = document.getElementById('patenteInput');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultElement = document.getElementById('result');
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Carga la tabla de valores desde el archivo JSON
    let letterValues = {};
    fetch('./src/scripts/values.json')
        .then(response => response.json())
        .then(data => {
            letterValues = data;
        })
        .catch(error => {
            console.error('Error al cargar la tabla de valores:', error);
            resultElement.textContent = "Error al cargar los datos. Por favor, revisa el archivo 'values.json'.";
            resultElement.style.color = 'red';
        });

    // Manejo del evento de clic en el botón "Calcular"
    calculateBtn.addEventListener('click', calculateDigit);
    
    // Límite la entrada del input a números y letras
    patenteInput.addEventListener('input', (e) => {
        const cleanedValue = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
        e.target.value = cleanedValue.toUpperCase();
    });

    // Habilita el cálculo al presionar "Enter" en el input
    patenteInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateDigit();
        }
    });

    // Lógica principal de cálculo
    function calculateDigit() {
        const patente = patenteInput.value.toUpperCase();
        
        if (!patente) {
            resultElement.textContent = "Por favor, introduce una patente.";
            resultElement.style.color = 'red';
            return;
        }

        // Validación de formato de patente
        // Acepta: 2 letras-3 números-2 letras (ej. AB123CD)
        // o 3 letras-3 números (ej. ABC123)
        // o 3 números-3 letras (ej. 123ABC)
        // o 1 letra-3 números-3 letras (ej. A123BCD)
        const regex = /^[A-Z]{2}[0-9]{3}[A-Z]{2}$|^[A-Z]{3}[0-9]{3}$|^[0-9]{3}[A-Z]{3}$|^[A-Z][0-9]{3}[A-Z]{3}$/;
        if (!regex.test(patente)) {
            resultElement.textContent = "Formato de patente inválido. Ejemplos válidos: AB123CD (auto), A123BCD (moto), ABC123 o 123ABC (antiguos).";
            resultElement.style.color = 'red';
            return;
        }
        
        // Convierte la patente en una secuencia numérica
        let numericSequence = '';
        for (const char of patente) {
            if (/\d/.test(char)) {
                numericSequence += char;
            } else if (letterValues[char] !== undefined) {
                const value = letterValues[char].toString().padStart(2, '0');
                numericSequence += value;
            } else {
                resultElement.textContent = "Patente inválida. Solo se aceptan letras y números.";
                resultElement.style.color = 'red';
                return;
            }
        }
        
        let group1Sum = 0;
        let group2Sum = 0;

        // Se suma de derecha a izquierda, alternando entre los grupos
        for (let i = numericSequence.length - 1; i >= 0; i--) {
            const digit = parseInt(numericSequence[i], 10);
            // Si la posición (contando desde 1) es impar, se suma al Grupo 1
            if ((numericSequence.length - i) % 2 !== 0) {
                group1Sum += digit;
            } else {
                // Si la posición es par, se suma al Grupo 2
                group2Sum += digit;
            }
        }

        // Función para reducir la suma a un solo dígito
        const reduceToSingleDigit = (num) => {
            while (num >= 10) {
                num = num.toString().split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
            }
            return num;
        };

        const finalGroup1 = reduceToSingleDigit(group1Sum);
        const finalGroup2 = reduceToSingleDigit(group2Sum);

        const verifierDigit = `${finalGroup1}${finalGroup2}`;
        resultElement.textContent = `El dígito verificador es: ${verifierDigit}`;
        resultElement.style.color = 'var(--result-color)';
    }

    // Manejo del evento de clic en el botón "Cambiar Tema"
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
});
