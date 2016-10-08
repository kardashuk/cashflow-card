'use strict';

/**
 * @ngdoc function
 * @name cashflowCardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cashflowCardApp
 */
angular.module('cashflowCardApp')
.controller('MainCtrl',
['$scope', 'localStorageService', 'ProfessionsService',
function ($scope, $storage, ProfessionsService) {
    $scope.app = {};
    $scope.asset_types = {
        shares: 'Акции',
        real_estate: 'Недвижимость',
        business: 'Бизнес',
        others: 'Другое'
    };
    $scope.professions = ProfessionsService.list;

    $storage.bind($scope, 'games', []);
    $storage.bind($scope, 'game_index', null);
    $scope.startNewGame = function () {
        var game = {};
        game.assets = {};
        angular.forEach($scope.asset_types, function(title, name){
            game.assets[name] = [];
        });
        game.income   = [
            {title:'Зароботок',             type:'salary'},
            {title:'Капиталовложения',      type:'capital'},
            {title:'Дивиденды',             type:'dividends'},
            {title:'Недвижимость/Бизнесс',  type:'investments'}
        ];
        game.expenses = [
            {title:'Налоги', type:'tax'},
            {title:'Детские расходы', type:'child'},
            {title:'Другие расходы', type:'other'}
        ];
        game.liabilities =[
            {title: 'Кредит банка', type: 'credit', price:0}
        ];
        $scope.games.push(game);
        $scope.player = {};
        $scope.startGame($scope.games.length-1);
    };
    $scope.removeGame = function(index){
        $scope.games.splice(index, 1);
    };
    $scope.game = $scope.game = $scope.games[$scope.game_index];
    $scope.startGame = function(index){
        $scope.game_index = index;
        $scope.game = $scope.games[index];
    };
    $scope.stopGame = function(){
        $scope.game_index = null;
        $scope.game = null;
    };
    $scope.applyProfession = function(player){
        $scope.player = ProfessionsService.applyProfession(player, player.profession);
        console.log($scope.player);
    };
    $scope.savePlayer = function(player){
        $scope.game.player = player;
        $scope.game.player.child_count = 0;
        $scope.game.balance = player.money;
        $scope.game.liabilities = player.liabilities.concat($scope.game.liabilities);
        $scope.getCheck();
    };

    $scope.total = function(){
        return $scope.incomeTotal() - $scope.expensesTotal();
    };
    $scope.netIncome = function(){
        return $scope.incomeTotal() - $scope.game.player.salary;
    };
    $scope.incomeTotal = function(){
        return $scope._sum($scope.game.income, function(i){
            return $scope.incomeByType(i.type);
        });
    };
    $scope.incomeByType = function(type){
        if (type === 'salary'){
            return $scope.game.player.salary;
        }else{
            console.log('Warning: unknown income type');
            return 0;
        }
    };
    $scope.expensesByType = function(type){
        if(type === 'tax'){
            return $scope.game.player.tax_expenses;
        }else if(type === 'other'){
            return $scope.game.player.other_expenses;
        }else if(type === 'child'){
            return $scope.game.player.child_expenses * $scope.game.player.child_count;
        }else{
            console.log('Warning: unknown expense type');
            return 0;
        }
    };

    $scope.expensesByLiability = function(l){
        if (l.type === 'custom'){
            return l.expenses;
        }else if (l.type === 'credit'){
            return l.price * .1;
        }else{
            console.log('Warning: unknown liability type');
            return 0;
        }
    };
    $scope.expensesTotal = function(){
        return $scope._sum($scope.game.expenses, function(e){
            return $scope.expensesByType(e.type);
        }) + $scope._sum($scope.game.liabilities, function(l){
            return $scope.expensesByLiability(l);
        });
    };
    $scope._sum = function(list, cmp){
        var sum = 0;
        angular.forEach(list, function(e){
            sum += cmp(e);
        });
        return sum;
    };

//actions
    $scope._income = function(amount){
        $scope.game.balance += amount;
    };
    $scope._payment = function(amount){
        $scope.game.balance -= amount;
    };
    $scope.unemploymentCounter = 0;
    $scope.unemployment = function(){
        if ($scope.unemploymentCounter){
            $scope.unemploymentCounter --;
        }else{
            $scope._payment( $scope.expensesTotal());
            $scope.unemploymentCounter = 1;
        }
    };
    $scope.newborn = function(){
        if($scope.game.player.child_count < 3){
            $scope.game.player.child_count++;
        }
    };
    $scope.payment = {
        amount: null
    };
    $scope.applyPayment = function(){
        if ($scope.payment.amount<0){
            if(confirm('Вам будут НАЧИСЛЕНЫ средства. Продолжить?')){
                $scope._payment($scope.payment.amount);
                $scope.cancelPayment();
            }
        }else if ($scope.game.balance < $scope.payment.amount){
            alert('Не хватает денег. Возьмите кредит или станьте банкротом');
        }else{
            $scope._payment($scope.payment.amount);
            $scope.cancelPayment();
        }
    };
    $scope.cancelPayment = function(){
        $scope.payment.amount = null;
        $scope.app.showPayment = false;
    };

    $scope.getCheck = function(){
        $scope.unemploymentCounter = 0;
        $scope._income($scope.total());
    };

    $scope.credit = {
        type: null,
        amount: null
    };
    $scope.cancelCredit = function(){
        $scope.credit.type = null;
        $scope.credit.amount = null;
        $scope.app.showCredit = false;
    };
    $scope.getCredit = function(credit){
        if($scope.credit.amount%1000 !== 0){
            alert('Сумма должна быть кратной 1000');
        }else{
            credit.price += $scope.credit.amount;
            $scope._income($scope.credit.amount);
            $scope.cancelCredit();
        }
    };
    $scope.payCredit = function(credit){
        if ($scope.game.balance < $scope.credit.amount){
            alert('У Вас не достаточно денег');
        }else if (credit.price < $scope.credit.amount){
            alert('Вы не можете оплать больше чем взяли');
        }else if($scope.credit.amount%1000 !== 0){
            alert('Сумма должна быть кратной 1000');
        }else{
            credit.price -= $scope.credit.amount;
            $scope._payment($scope.credit.amount);
            $scope.cancelCredit();
        }
    };

    $scope.asset = {};
    $scope.saveAsset = function(origin){
        if (origin){
            //@todo: add edit here
        }else{
            $scope.game.assets[$scope.asset.type].push($scope.asset);
            $scope.cancelAsset(origin);
        }
    };
    $scope.cancelAsset = function(origin){
        if (origin){
            //@todo: add edit here
        }else{
            $scope.asset = {};
            $scope.app.showNewAsset = false;

        }
    };
}]);
