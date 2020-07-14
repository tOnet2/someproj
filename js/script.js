"use strict";

let startCalculation = document.getElementById('start'),
    budgetClass = document.getElementsByClassName('budget-value')[0],
    budgetOneDay = document.getElementsByClassName('daybudget-value')[0],
    mainIncomeLevel = document.getElementsByClassName('level-value')[0],
    needExpenses = document.getElementsByClassName('expenses-value')[0],
    opptExpenses = document.getElementsByClassName('optionalexpenses-value')[0],
    subIncomeLevel = document.getElementsByClassName('income-value')[0],
    incomeMonth = document.getElementsByClassName('monthsavings-value')[0],
    incomeYear = document.getElementsByClassName('yearsavings-value')[0];

let expensesItem = document.getElementsByClassName('expenses-item'),
    expensesButton = document.getElementsByTagName('button')[0],
    optionalExpensesButton = document.getElementsByTagName('button')[1],
    countButton = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    chooseSumm = document.querySelector('.choose-sum'),
    choosePercent = document.querySelector('.choose-percent'),
    savingQuestion = document.querySelector('#savings'),
    yearNow = document.querySelector('.year-value'),
    monthNow = document.querySelector('.month-value'),
    dayNow = document.querySelector('.day-value');

let money, time;
expensesButton.disabled = true;
optionalExpensesButton.disabled = true;
countButton.disabled = true;

startCalculation.addEventListener('click', function() {
    time = prompt('Введите дату в формате YYYY-MM-DD', '');
    money = +prompt('Ваш бюджет на месяц?', '');

    while(isNaN(money) || money == "" || money == null) {
        alert("Укажите обязательную информацию!");
        money = +prompt('Ваш бюджет на месяц?', '');
    }
    
    appData.theCash = money;
    appData.theTime = time;
    budgetClass.textContent = money.toFixed(2);
    yearNow.value = new Date(Date.parse(time)).getFullYear();
    monthNow.value = new Date(Date.parse(time)).getMonth() + 1;
    dayNow.value = new Date(Date.parse(time)).getDate();

    expensesButton.disabled = false;
    optionalExpensesButton.disabled = false;
    countButton.disabled = false;
});

expensesButton.addEventListener('click', function() {
    let sum = 0;

    for(let i = 0; i < expensesItem.length; i++) { // по количеству кнопок
        let qe1 = expensesItem[i].value,
            qe2 = expensesItem[++i].value;
    
        if ((typeof(qe1)) === 'string' && (typeof(qe1)) != null && 
            (typeof(qe2)) != null && qe1 != '' && qe2 != '' && qe1.length < 50){
            
                appData.expenses[qe1] = qe2;
                sum += +qe2;
        } else {
            alert('Введите данные снова!');
            i--;
        }
    }
    needExpenses.textContent = sum;
});

optionalExpensesButton.addEventListener('click', function() {
    for (let j = 0; j < optionalExpensesItem.length; j++) {
        let qoe = optionalExpensesItem[j].value;
        appData.optionalExpenses[j] = qoe;
        opptExpenses.textContent += appData.optionalExpenses[j] + ' ';
    }
});

countButton.addEventListener('click', function() {

    if (appData.theCash != undefined) {
        appData.moneyPerDay = ((appData.theCash - +needExpenses.textContent) / 30).toFixed(2);
        budgetOneDay.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            mainIncomeLevel.textContent = 'Минимальный уровень достатка.';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            mainIncomeLevel.textContent = 'Средний уровень достатка.';
        } else if (appData.moneyPerDay > 2000) {
            mainIncomeLevel.textContent = 'Высокий уровень достатка.';
        } else {
            mainIncomeLevel.textContent = 'Ошибка.';
        }
    } else {
        budgetOneDay.textContent = 'Ошибка. Нажмите Начать расчет!';
    }
 });

incomeItem.addEventListener('input', function() {
    let items = incomeItem.value;
    appData.income = items.split(', ');
    subIncomeLevel.textContent = appData.income;
});

savingQuestion.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

chooseSumm.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +chooseSumm.value,
            percent = +choosePercent.value;
            
        appData.monthInCome = sum/100/12*percent;    
        appData.yearInCome = sum/100*percent;
        
        incomeMonth.textContent = appData.monthInCome.toFixed(1);
        incomeYear.textContent = appData.yearInCome.toFixed(1);
    }
});

choosePercent.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +chooseSumm.value,
            percent = +choosePercent.value;
        
        appData.monthInCome = sum/100/12*percent;    
        appData.yearInCome = sum/100*percent;
    
        incomeMonth.textContent = appData.monthInCome.toFixed(1);
        incomeYear.textContent = appData.yearInCome.toFixed(1);  
    }
});

let appData = {
    theCash : money,
    theTime : time,
    expenses : {},
    optionalExpenses : {},
    income : [],
    savings : false,
};