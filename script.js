document.addEventListener('DOMContentLoaded', () => {
    const loanAmountInput = document.getElementById('loanAmount');
    const loanAmountRange = document.getElementById('loanAmountRange');
    const repaymentPeriodInput = document.getElementById('repaymentPeriod');
    const repaymentPeriodRange = document.getElementById('repaymentPeriodRange');
    const calculateButton = document.getElementById('calculateButton');
    const dailyRepayment = document.getElementById('dailyRepayment');
    const totalRepayment = document.getElementById('totalRepayment');

    function syncInputAndRange(input, range) {
        input.addEventListener('input', () => {
            range.value = input.value;
            calculateRepayment();
        });
        range.addEventListener('input', () => {
            input.value = range.value;
            calculateRepayment();
        });
    }

    function calculateRepayment() {
        const loanAmount = parseFloat(loanAmountInput.value);
        const repaymentPeriod = parseFloat(repaymentPeriodInput.value);
        const interestRate = 2.2;
        const dailyRepaymentAmount = (loanAmount + (loanAmount * (interestRate / 100) * repaymentPeriod)) / repaymentPeriod;
        const totalRepaymentAmount = dailyRepaymentAmount * repaymentPeriod;

        dailyRepayment.textContent = dailyRepaymentAmount.toFixed(2);
        totalRepayment.textContent = totalRepaymentAmount.toFixed(2);
    }

    syncInputAndRange(loanAmountInput, loanAmountRange);
    syncInputAndRange(repaymentPeriodInput, repaymentPeriodRange);

    calculateButton.addEventListener('click', calculateRepayment);
});
