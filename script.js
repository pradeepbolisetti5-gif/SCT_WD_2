function parsePercentages(expr) {
  
    return expr.replace(/(\d+(\.\d+)?)(%)/g, '($1/100)');
}


function computeResult() {
    if (currentInput === 'Error') return;
    
    let expression = currentInput;
    const lastChar = expression.slice(-1);
    

  if (['+', '-', '*', '/'].includes(lastChar)) {
        expression = expression.slice(0, -1);
    }

    try {

      let sanitizedExpression = parsePercentages(expression);
        

      let result = eval(sanitizedExpression);
        
        if (!isFinite(result)) {
            throw new Error("DivByZero");
        }


      if (result % 1 !== 0) {
            result = parseFloat(result.toFixed(8)); 
        }

        historyDisplay.textContent = formatDisplayString(expression) + ' =';
        currentInput = String(result);
        isCalculationDone = true;
    } catch (error) {
        historyDisplay.textContent = '';
        currentInput = 'Error';
        isCalculationDone = true;
    }
    updateDisplay();
}
