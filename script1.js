"use strict";

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
alert('lol');