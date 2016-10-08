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
        }else if(type==='capital'){
            return 0;
        }else if(type==='dividends'){
            return $scope._sum($scope.game.assets.others, function(a){
                return a.income || 0;
            });
        }else if (type==='investments'){
            return $scope._sum($scope.game.assets.business, function(b){
                return b.income || 0;
            }) + $scope._sum($scope.game.assets.real_estate, function(re){
                return re.income || 0;
            });
        }else{
            console.log('Warning: unknown income type', type);
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
            sum += parseInt(cmp(e),10) || 0;
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
            if($scope.assetBuyPrice($scope.asset)>$scope.game.balance){
                alert('У Вас не достаточно денег');
            }else{
                $scope._payment($scope.assetBuyPrice($scope.asset));
                $scope.game.assets[$scope.asset.type].push(angular.copy($scope.asset));
                $scope.cancelAsset(origin);
            }
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

    $scope.assetPrice = function(asset){
        return asset.type==='shares' ? asset.item_price*asset.items_count : asset.price;
    };
    $scope.assetBuyPrice = function(asset){
        if (asset.type==='shares'){
            return asset.item_price*asset.items_count;
        }else if(asset.type==='real_estate' || asset.type==='business'){
            return asset.payment;
        }else{
            return asset.price;
        }
    };
    $scope.x2Shares = function(asset){
        asset.items_count *= 2;
        asset.item_price = asset.item_price/2;
        if(asset.item_price === 0){
            asset.item_price = 1;
        }
        $scope.cancelShareActions(asset);
    };
    $scope.div2Shares = function(asset){
        asset.items_count = Math.floor(asset.items_count/2);
        if (asset.items_count===0){
            asset.items_count = 1;
        }else{
            asset.item_price *= 2;
        }
        $scope.cancelShareActions(asset);
    };
    $scope.cancelShareActions = function(a){
        a.showActions =false;
        a.showSale =false;
        delete a._sale;
    };
    $scope.removeAsset = function(asset){
        var ind = $scope.game.assets[asset.type].indexOf(asset);
        if (ind !==-1){
            $scope.game.assets[asset.type].splice(ind, 1);
        }else{
            console.log('Warning: try to remove broken asset', asset);
        }
    };
    $scope.saleShares = function(asset){
        if (asset._sale.count > asset.items_count){
            alert('У вас нет столько акций');
        }else if (asset._sale.count>0){
            asset.items_count -= asset._sale.count;
            $scope._income(asset._sale.count*asset._sale.price);
            if(asset.items_count === 0){
                $scope.cancelShareActions(asset);
                $scope.removeAsset(asset);
            }else{
                $scope.cancelShareActions(asset);
            }
        }else{
            $scope.cancelShareActions(asset);
        }
    };
    $scope.saleAsset = function(asset){
        var price = parseInt(prompt('За сколько продаем?'),10);
        if (price>=0){
            if (asset.type=='others'){
                $scope._income(price);
                $scope.removeAsset(asset);
            }else{
                if (price<asset.mortgage){
                    if ($scope.game.balance < asset.mortgage - price){
                        alert('У вас нет денег что бы закрыть ету сделку');
                    }else if (confirm('Вы останетесь в убытке. Продолжить?')){
                        $scope._payment(asset.mortgage - price);
                        $scope.removeAsset(asset);
                    }else{
                        $scope.cancelShareActions(asset);
                    }
                }else{
                    $scope._income(price - asset.mortgage);
                    $scope.removeAsset(asset);
                }
            }
        }else{
            $scope.cancelShareActions(asset);
        }
    };

}]);
