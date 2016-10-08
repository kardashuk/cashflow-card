'use strict';

/**
 * @ngdoc service
 * @name cashflowCardApp.ProfessionsService
 * @description
 * # ProfessionsService
 * Service in the cashflowCardApp.
 */
angular.module('cashflowCardApp')
.service('ProfessionsService', function () {
    var professions = {
        manager: {
            title:'Офис менеджер',
            salary:4600,
            money: 400,
            tax_expenses:910,
            other_expenses:1000,
            child_expenses:240,
            liabilities:[
                {title: 'Закладная на дом', type:'custom', price: 75000, expenses:700},
                {title: 'Кредит на образование', type:'custom', price: 12000, expenses:60},
                {title: 'Кредит на авто', type:'custom', price: 6000, expenses:120},
                {title: 'Кредитные карты', type:'custom', price: 3000, expenses:90},
                {title: 'Розничные расходы', type:'custom', price: 1000, expenses:50}
            ]
        },
        policeman: {
            title:'Офицер полиции',
            salary:3000,
            tax_expenses:580,
            other_expenses:690,
            child_expenses:160,
            money: 520,
            liabilities:[
                {title: 'Закладная на дом',     type:'custom',  price: 46000, expenses:400},
                {title: 'Кредит на образование', type:'custom', price: 0, expenses:0},
                {title: 'Кредит на авто', type:'custom',        price: 5000, expenses:100},
                {title: 'Кредитные карты', type:'custom',       price: 2000, expenses:60},
                {title: 'Розничные расходы', type:'custom',     price: 1000, expenses:50}
            ]
        },
        doctor: {
            title:'Врач',
            salary:13200,
            tax_expenses:3420,
            other_expenses:2880,
            child_expenses:640,
            money: 400,
            liabilities:[
                {title: 'Закладная на дом', type:'custom',      price: 202000, expenses:1900},
                {title: 'Кредит на образование', type:'custom', price: 150000, expenses:750},
                {title: 'Кредит на авто', type:'custom',        price: 19000, expenses:380},
                {title: 'Кредитные карты', type:'custom',       price: 9000, expenses:270},
                {title: 'Розничные расходы', type:'custom',     price: 1000, expenses:50}
            ]
        },
        lawyer: {
            title:'Адвокат',
            salary:7500,
            tax_expenses:1830,
            other_expenses:1650,
            child_expenses:640,
            money: 400,
            liabilities:[
                {title: 'Закладная на дом', type:'custom',      price: 115000, expenses:1100},
                {title: 'Кредит на образование', type:'custom', price: 78000, expenses:390},
                {title: 'Кредит на авто', type:'custom',        price: 11000, expenses:220},
                {title: 'Кредитные карты', type:'custom',       price: 6000, expenses:180},
                {title: 'Розничные расходы', type:'custom',     price: 1000, expenses:50}
            ]
        },
        pilot:{
            title:'Пилот',
            salary:9500,
            tax_expenses:2350,
            other_expenses:2210,
            child_expenses:480,
            money: 400,
            liabilities:[
                {title: 'Закладная на дом', type:'custom',      price: 143000, expenses:1330},
                {title: 'Кредит на образование', type:'custom', price: 0, expenses:0},
                {title: 'Кредит на авто', type:'custom',        price: 15000, expenses:300},
                {title: 'Кредитные карты', type:'custom',       price: 22000, expenses:660},
                {title: 'Розничные расходы', type:'custom',     price: 1000, expenses:50}
            ]
        },
        constructor: {
            title:'Конструктор',
            salary:4900,
            tax_expenses:1050,
            other_expenses:1090,
            child_expenses:250,
            money: 400,
            liabilities:[
                {title: 'Закладная на дом', type:'custom',      price: 75000, expenses:700},
                {title: 'Кредит на образование', type:'custom', price: 12000, expenses:60},
                {title: 'Кредит на авто', type:'custom',        price: 7000, expenses:140},
                {title: 'Кредитные карты', type:'custom',       price: 4000, expenses:120},
                {title: 'Розничные расходы', type:'custom',     price: 1000, expenses:50}
            ]
        },
        driver: {
            title:'Водитель грузовика',
            salary:2500,
            tax_expenses:460,
            other_expenses:570,
            child_expenses:140,
            money: 750,
            liabilities:[
                {title: 'Закладная на дом', type:'custom',      price: 38000, expenses:400},
                {title: 'Кредит на образование', type:'custom', price: 0, expenses:0},
                {title: 'Кредит на авто', type:'custom',        price: 4000, expenses:80},
                {title: 'Кредитные карты', type:'custom',       price: 2000, expenses:60},
                {title: 'Розничные расходы', type:'custom',     price: 1000, expenses:50}
            ]
        },
        nurse: {
            title:'Медсестра',
            salary:3100,
            tax_expenses:600,
            other_expenses:710,
            child_expenses:170,
            money: 480,
            liabilities:[
                {title: 'Закладная на дом', type:'custom',      price: 47000, expenses:400},
                {title: 'Кредит на образование', type:'custom', price: 6000, expenses:30},
                {title: 'Кредит на авто', type:'custom',        price: 5000, expenses:100},
                {title: 'Кредитные карты', type:'custom',       price: 3000, expenses:90},
                {title: 'Розничные расходы', type:'custom',     price: 1000, expenses:50}
            ]
        },
        mechanic: {
            title:'Механик',
            salary:2000,
            tax_expenses:360,
            other_expenses:450,
            child_expenses:110,
            money: 670,
            liabilities:[
                {title: 'Закладная на дом', type:'custom',      price: 31000, expenses:300},
                {title: 'Кредит на образование', type:'custom', price: 0, expenses:0},
                {title: 'Кредит на авто', type:'custom',        price: 3000, expenses:60},
                {title: 'Кредитные карты', type:'custom',       price: 2000, expenses:60},
                {title: 'Розничные расходы', type:'custom',     price: 1000, expenses:50}
            ]
        },
        porter: {
            title:'Швейцар',
            salary:1600,
            tax_expenses:280,
            other_expenses:300,
            child_expenses:70,
            money: 400,
            liabilities:[
                {title: 'Закладная на дом', type:'custom',      price: 202000, expenses:200},
                {title: 'Кредит на образование', type:'custom', price: 150000, expenses:0},
                {title: 'Кредит на авто', type:'custom',        price: 19000, expenses:60},
                {title: 'Кредитные карты', type:'custom',       price: 9000, expenses:60},
                {title: 'Розничные расходы', type:'custom',     price: 1000, expenses:50}
            ]
        },
        secretary: {
            title:'Секретарь',
            salary:2500,
            tax_expenses:460,
            other_expenses:570,
            child_expenses:140,
            money: 710,
            liabilities:[
                {title: 'Закладная на дом', type:'custom',      price: 38000, expenses:400},
                {title: 'Кредит на образование', type:'custom', price: 0, expenses:0},
                {title: 'Кредит на авто', type:'custom',        price: 4000, expenses:80},
                {title: 'Кредитные карты', type:'custom',       price: 2000, expenses:60},
                {title: 'Розничные расходы', type:'custom',     price: 1000, expenses:50}
            ]
        },
        teacher: {
            title:'Учитель',
            salary:3300,
            tax_expenses:630,
            other_expenses:760,
            child_expenses:180,
            money: 400,
            liabilities:[
                {title: 'Закладная на дом', type:'custom',      price: 50000, expenses:500},
                {title: 'Кредит на образование', type:'custom', price: 12000, expenses:60},
                {title: 'Кредит на авто', type:'custom',        price: 5000, expenses:100},
                {title: 'Кредитные карты', type:'custom',       price: 3000, expenses:90},
                {title: 'Розничные расходы', type:'custom',     price: 1000, expenses:50}
            ]
        },
        custom: {
            title:'Создать вручную',
            salary:0,
            tax_expenses:0,
            other_expenses:0,
            child_expenses:0,
            money: 0,
            liabilities:[
                {title: 'Закладная на дом', type:'custom',      price: 0, expenses:0},
                {title: 'Кредит на образование', type:'custom', price: 0, expenses:0},
                {title: 'Кредит на авто', type:'custom',        price: 0, expenses:0},
                {title: 'Кредитные карты', type:'custom',       price: 0, expenses:0},
                {title: 'Розничные расходы', type:'custom',     price: 0, expenses:0}
            ]
        }
    };
    return {
        list: professions,
        applyProfession: function(player, professionName){
            var profession = professions[professionName];
            angular.forEach(profession, function(value, key){
                if (key === 'title'){
                    player.job = value;
                }else{
                    player[key] = value;
                }
            });
            return player;
        }
    }
});
