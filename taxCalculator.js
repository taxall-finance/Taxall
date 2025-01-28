function calculateTax() {
    const salary = parseFloat(document.getElementById('incomeFromSalary').value) || 0;
    const rental = parseFloat(document.getElementById('rentalIncome').value) || 0;
    const interest = parseFloat(document.getElementById('incomeFromInterest').value) || 0;
    const otherIncome = parseFloat(document.getElementById('incomeFromOtherSources').value) || 0;

    const exemptions = parseFloat(document.getElementById('exemptAllowances').value) || 0;

    const applyStandardDeduction = document.getElementById('applyStandardDeduction').value === 'yes';

    const basicDeductions = parseFloat(document.getElementById('basicDeductions').value) || 0;
    const medicalInsurance = parseFloat(document.getElementById('medicalInsurance').value) || 0;
    const donations = parseFloat(document.getElementById('donations').value) || 0;
    const homeLoanInterest = parseFloat(document.getElementById('homeLoanInterest').value) || 0;
    const otherDeductions = parseFloat(document.getElementById('otherDeductions').value) || 0;

    const totalA = salary + rental + interest + otherIncome;
    const totalB = exemptions;
    const totalC = basicDeductions + medicalInsurance + donations + homeLoanInterest + otherDeductions;

    const oldStandardDeduction = applyStandardDeduction ? 50000 : 0;
    const newStandardDeduction = applyStandardDeduction ? 75000 : 0;

    const oldTaxRebateUpto = 500000;
    const newTaxRebateUpto = 700000;

    /* Calculation of Taxable Income */
    let temp = 0;

    temp = totalA - oldStandardDeduction - totalB - totalC;
    const oldTaxableIncome = (temp > 0) ? temp : 0;

    temp = totalA - newStandardDeduction;
    const newTaxableIncome = (temp > 0) ? temp : 0;

    /* Calculation of Tax */
    const oldCalculatedTax = calculateOldRegimeTax(oldTaxableIncome);
    const newCalculatedTax = calculateNewRegimeTax(newTaxableIncome);

    /* Calculation of Tax Rebate */
    let oldTaxRebate = 0;
    let newTaxRebate = 0;

    if(oldTaxableIncome <= oldTaxRebateUpto) {
        oldTaxRebate = 0 - oldCalculatedTax;
    }

    if(newTaxableIncome <= newTaxRebateUpto) {
        newTaxRebate = 0 - newCalculatedTax;
    }

    /* Calculation of Tax after rebate */
    const oldTaxAfterRebate = oldCalculatedTax + oldTaxRebate;
    const newTaxAfterRebate = newCalculatedTax + newTaxRebate;

    /* Calculation of Tax after marginal Relief */
    temp = newTaxableIncome - newTaxRebateUpto > 0 ? newTaxableIncome - newTaxRebateUpto : 0;

    const newTaxAfterMarginalRelief = Math.min(temp, newTaxAfterRebate);

    /* Calculation of Health and Education cess (4%) */
    const oldHealtEducationCess = oldTaxAfterRebate * 0.04;
    const newHealtEducationCess = newTaxAfterMarginalRelief * 0.04;

    /* Calculation of Payable tax */
    const oldPayableTax = oldTaxAfterRebate + oldHealtEducationCess;
    const newPayableTax = newTaxAfterMarginalRelief + newHealtEducationCess;

    let message;
    if(oldPayableTax < newPayableTax) {
        message = "As per the calculation Old Tax Regime is better for you."
    } else if(oldPayableTax > newPayableTax) {
        message = "As per the calculation New Tax Regime is better for you."
    } else {
        message = "As per the calculation Tax payable in both Regime are equal."
    }

    document.getElementById('results').style.display = 'block';
    // document.getElementById('result').innerText = `Payable Tax old: ${oldPayableTax} \n Payble tax new: ${newPayableTax}`;

    document.getElementById('result').innerHTML = `
    <table>
    <tr>
        <th></th>
        <th>Old Regime</th>
        <th>New Regime</th>
    </tr>
    <tr>
        <td>Taxable Income</td>
        <td>₹${oldTaxableIncome.toFixed(2)}</td>
        <td>₹${newTaxableIncome.toFixed(2)}</td>
    </tr>
    <tr>
        <td>Calculated Tax</td>
        <td>₹${oldCalculatedTax.toFixed(2)}</td>
        <td>₹${newCalculatedTax.toFixed(2)}</td>
    </tr>
    <tr>
        <td>Tax Rebate</td>
        <td>₹${oldTaxRebate.toFixed(2)}</td>
        <td>₹${newTaxRebate.toFixed(2)}</td>
    </tr>
    <tr>
        <td>Calculated tax after rebate</td>
        <td>₹${oldTaxAfterRebate.toFixed(2)}</td>
        <td>₹${newTaxAfterRebate.toFixed(2)}</td>
    </tr>
    <tr>
        <td>Calculated Tax After Marginal Relief</td>
        <td>N/A</td>
        <td>₹${newTaxAfterMarginalRelief.toFixed(2)}</td>
    </tr>
    <tr>
        <td>Health and Education cess(4%)</td>
        <td>₹${oldHealtEducationCess.toFixed(2)}</td>
        <td>₹${newHealtEducationCess.toFixed(2)}</td>
    </tr>
    <tr>
        <th>Payable Tax</th>
        <th>₹${oldPayableTax.toFixed(2)}</th>
        <th>₹${newPayableTax.toFixed(2)}</th>
    </tr>
</table>
<p>${message}</p>
`;

    // document.getElementById('oldRegime').innerText = `Taxable Income: ₹${taxableOld.toFixed(2)}\nPayable Tax: ₹${oldTax.toFixed(2)}`;
    // document.getElementById('newRegime').innerText = `Taxable Income: ₹${taxableNew.toFixed(2)}\nPayable Tax: ₹${newTax.toFixed(2)}`;
}

function calculateOldRegimeTax(taxableIncome) {
    if (taxableIncome <= 250000) return 0;
    if (taxableIncome <= 500000) return (taxableIncome - 250000) * 0.05;
    if (taxableIncome <= 1000000) return (taxableIncome - 500000) * 0.2 + 12500;
    return (taxableIncome - 1000000) * 0.3 + 112500;
}

function calculateNewRegimeTax(taxableIncome) {
    if (taxableIncome <= 300000) return 0;
    if (taxableIncome <= 700000) return (taxableIncome - 300000) * 0.05;
    if (taxableIncome <= 1000000) return (taxableIncome - 700000) * 0.1 + 20000;
    if (taxableIncome <= 1200000) return (taxableIncome - 1000000) * 0.15 + 50000;
    if (taxableIncome <= 1500000) return (taxableIncome - 1200000) * 0.2 + 80000;
    return (taxableIncome - 1500000) * 0.3 + 140000;
}