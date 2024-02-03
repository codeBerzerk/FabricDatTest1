document.addEventListener('DOMContentLoaded', () => {
    const loanAmountInput = document.getElementById('loanAmount');
    const loanAmountRange = document.getElementById('loanAmountRange');
    const repaymentPeriodInput = document.getElementById('repaymentPeriod');
    const repaymentPeriodRange = document.getElementById('repaymentPeriodRange');
    const calculateButton = document.getElementById('calculateButton');
    const dailyRepayment = document.getElementById('dailyRepayment');
    const totalRepayment = document.getElementById('totalRepayment');
    const errorMessage = document.querySelector('.error-message');

    function validateInput() {
        const loanAmount = parseFloat(loanAmountInput.value);
        const repaymentPeriod = parseFloat(repaymentPeriodInput.value);
        if (loanAmount < 1000 || loanAmount > 50000 || repaymentPeriod < 7 || repaymentPeriod > 60) {
            calculateButton.disabled = true;
            errorMessage.textContent = 'Введені дані виходять за межі допустимих значень.';
        } else {
            calculateButton.disabled = false;
            errorMessage.textContent = '';
            calculateRepayment();
        }
    }

    function syncInputAndRange(input, range) {
        input.addEventListener('input', () => {
            range.value = input.value;
            validateInput();
        });
        range.addEventListener('input', () => {
            input.value = range.value;
            validateInput();
        });
    }

    function calculateRepayment() {
        const loanAmount = parseFloat(loanAmountInput.value);
        const repaymentPeriod = parseFloat(repaymentPeriodInput.value);
        if (isNaN(loanAmount) || isNaN(repaymentPeriod)) {
            dailyRepayment.textContent = '0';
            totalRepayment.textContent = '0';
            return;
        }
        const interestRate = 2.2;
        const dailyRepaymentAmount = (loanAmount + (loanAmount * (interestRate / 100) * repaymentPeriod)) / repaymentPeriod;
        const totalRepaymentAmount = dailyRepaymentAmount * repaymentPeriod;

        dailyRepayment.textContent = dailyRepaymentAmount.toFixed(2);
        totalRepayment.textContent = totalRepaymentAmount.toFixed(2);
    }

    syncInputAndRange(loanAmountInput, loanAmountRange);
    syncInputAndRange(repaymentPeriodInput, repaymentPeriodRange);

    calculateButton.addEventListener('click', calculateRepayment);

    // Виконайте початковий розрахунок при завантаженні сторінки
    validateInput();
});
