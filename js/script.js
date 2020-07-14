"use strict";

let startCalculation = document.getElementById('start')[0],
    budgetClass = document.getElementsByClassName('budget-value')[0],
    budgetOneDay = document.getElementsByClassName('daybudget-value')[0],
    mainIncomeLevel = document.getElementsByClassName('level-value')[0],
    needExpenses = document.getElementsByClassName('optionalexpenses-value')[0],
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
    savingQuestion = document.querySelector('#saving'),
    yearNow = document.querySelector('.year-value'),
    monthNow = document.querySelector('.month-value'),
    dayNow = document.querySelector('.day-value');


let money, time;

function start() {
    money = +prompt('Ваш бюджет на месяц?', '');
    time = prompt('Введите дату в формате YYYY-MM-DD', '');

    while(isNaN(money) || money == "" || money == null) {
        alert("Укажите обязательную информацию!");
        money = +prompt('Ваш бюджет на месяц?', '');
    }
}

start();

let appData = {
    theCash : money,
    theTime : time,
    expenses : {},
    optionalExpenses : {},
    income : [],
    savings : true,
    chooseExpenses: function() {
        for(let i = 0; i < 2; i++) {
            let qe1 = prompt('Введите обязательный расход в этом месяце', ''),
                qe2 = +prompt('Во сколько обойдется?', '');
        
            if ((typeof(qe1)) === 'string' && (typeof(qe1)) != null && 
                (typeof(qe2)) != null && qe1 != '' && qe2 != '' && qe1.length < 50){
                
                    appData.expenses[qe1] = qe2;
            } else {
                alert('Введите данные снова!');
                i--;
            }
        }
    },
    detectDayBudget: function() {
        appData.moneyPerDay = +(appData.theCash / 30).toFixed(2);
        alert('Ежедневный бюджет: ' + appData.moneyPerDay);
    },
    detectLevel: function() {
        if (appData.moneyPerDay < 100) {
            alert('Минимальный уровень достатка.');
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            alert('Средний уровень достатка.');
        } else if (appData.moneyPerDay > 2000) {
            alert('Высокий уровень достатка.');
        } else {
            alert('Ошибка.');
        }
    },
    checkSavings: function() {
        if(appData.savings == true) {
            let save = +prompt('Какова сумма накоплений?', ''),
                percent = +prompt('Под какой процент?', '');
               
            appData.monthInCome = save/100/12*percent;
            alert('Доход в месяц с вашего депозита: ' + appData.monthInCome);
        }
    },
    chooseOptExpenses: function() {
        for (let j = 0; j < 3; j++) {
            let qoe = prompt('Статья необязательных расходов', '');
            appData.optionalExpenses.j = qoe;
        }
    },
    chooseIncome: function() {
        let items = prompt('Что приносит дополнительный доход? (через запятую)', ''),
            k = 1;
        do {  
            if (typeof(items) != 'string' || typeof(items) == null || items == '') {
            alert('Вы ввели некоректные данные или вовсе не ввели их!');
            items = prompt('Что приносит дополнительный доход? (через запятую)', '');
            } else {
            k = k - 1;
            appData.income = items.split(', ');
            appData.income.push(prompt('Может еще что то?', ''));
            appData.income.sort();
            }
        } while (k == 1);

        appData.income.forEach(function (itemmassive, h) {
            alert('Способы доп заработка: ' + (h + 1) + ' - ' + itemmassive);
        });
    }, 
};

appData.chooseExpenses();
appData.chooseOptExpenses();
appData.detectDayBudget();
appData.detectLevel();
appData.checkSavings();
appData.chooseIncome();


for (let key in appData) {
    console.log("Наша программа включает следующие данные: " + key + " - " + appData[key]);
}

console.log(appData);
alert('?');