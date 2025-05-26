(() => {
  const display = document.getElementById('display');
  let currentInput = '0';
  let previousInput = null;
  let operator = null;
  let resetNext = false;

  function updateDisplay() {
    display.textContent = currentInput;
  }

  function clear() {
    currentInput = '0';
    previousInput = null;
    operator = null;
    resetNext = false;
    updateDisplay();
  }

  function inputNumber(num) {
    if (resetNext) {
      currentInput = num === '.' ? '0.' : num;
      resetNext = false;
    } else {
      if (num === '.') {
        if (!currentInput.includes('.')) {
          currentInput += '.';
        }
      } else {
        currentInput = currentInput === '0' ? num : currentInput + num;
      }
    }
    updateDisplay();
  }

  function calculate() {
    if (operator && previousInput !== null) {
      const prev = parseFloat(previousInput);
      const current = parseFloat(currentInput);
      let result = 0;
      switch (operator) {
        case '+':
          result = prev + current;
          break;
        case '-':
          result = prev - current;
          break;
        case '*':
          result = prev * current;
          break;
        case '/':
          result = current === 0 ? 'Error' : prev / current;
          break;
      }
      currentInput = result.toString();
      operator = null;
      previousInput = null;
      updateDisplay();
      resetNext = true;
    }
  }

  function handleOperator(nextOperator) {
    if (operator && !resetNext) {
      calculate();
    } else {
      previousInput = currentInput;
      resetNext = true;
    }
    operator = nextOperator;
  }

  document.querySelector('.buttons').addEventListener('click', e => {
    const target = e.target;
    if (target.matches('button')) {
      if (target.id === 'clear') {
        clear();
      } else if (target.id === 'equals') {
        calculate();
      } else if (target.hasAttribute('data-number')) {
        inputNumber(target.getAttribute('data-number'));
      } else if (target.hasAttribute('data-operator')) {
        handleOperator(target.getAttribute('data-operator'));
      }
    }
  });

  // Initialize display
  updateDisplay();
})();