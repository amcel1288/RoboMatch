(function() {
        'use strict';

        angular
            .module('app')
            .controller('RoboMatchController', RoboMatchController);

        RoboMatchController.$inject = [
            'toastr',
            'numbersFactory',
            'robotFactory',
            '$q',
            'catFactory'
        ];

        /* @ngInject */
        function RoboMatchController(
            toastr,
            numbersFactory,
            robotFactory,
            $q,
            catFactory
        ) {

            var vm = this;
            vm.numberToString1 = numberToString1;
            vm.numberToString2 = numberToString2;
            vm.createNumber = createNumber;
            vm.buttonClick = buttonClick;
            vm.stringToNumber1 = stringToNumber1;
            vm.stringToNumber2 = stringToNumber2;
            vm.compareNumbers = compareNumbers;
            vm.getAvatar1 = getAvatar1;
            vm.getAvatar2 = getAvatar2;
            vm.hide = false;
            vm.catClick = catClick;
            vm.catHide = false;

            ////////////////
            function catClick() {
                catFactory
                    .getCat()
                    .then(function(response) {
                        vm.catImage = response.data;
                        vm.catHide = true;
                });
            }

            function buttonClick(name1, name2) {
                createNumber(name1, name2);
                vm.hide = true;
                console.log(vm.primary);
                console.log(vm.secondary);

                $q.all([
                    numberToString1(vm.primary),
                    numberToString2(vm.secondary)
                ])
                .then(function() {
                    return $q.all([
                    stringToNumber1(vm.text1),
                    stringToNumber2(vm.text2),
                    getAvatar1(vm.text1),
                    getAvatar2(vm.text2)
                ])
            })
                .then(function() {
                    console.log(vm.rating1);
                    console.log(vm.rating2);
                    compareNumbers(vm.rating1, vm.rating2);
                    console.log(vm.match);
                    console.log(vm.avatar1);
                    console.log(vm.avatar2);
                });
                  
            }

            function createNumber(name1, name2) {
            vm.lengthOfName1 = name1.length;
            vm.lengthOfName2 = name2.length;
            vm.multipliedLength = vm.lengthOfName1 * vm.lengthOfName2;

            if (name1.indexOf(0) < name2.indexOf(0)) {
                vm.secondary = 3*(vm.multipliedLength - vm.lengthOfName1);
                vm.primary = 3*vm.lengthOfName1;
            } else if (name1.indexOf(0) > name2.indexOf(0)) {
                vm.primary = 3*(vm.multipliedLength - vm.lengthOfName2);
                vm.secondary = 3*vm.lengthOfName2;
            } else if (name1.indexOf(1) < name2.indexOf(1)) {
                vm.secondary = 3*(vm.multipliedLength - vm.lengthOfName1);
                vm.primary = 3*vm.lengthOfName1;
            } else {
                vm.primary = 3*(vm.multipliedLength - vm.lengthOfName2);
                vm.secondary = 3*vm.lengthOfName2;
            }
        }
        

        function numberToString1(primary) {
            return numbersFactory
                .getString(primary)
                .then(function(response) {
                    vm.text1 = response.data;
                });
        }

        function numberToString2(secondary) {
            return numbersFactory
                .getString(secondary)
                .then(function(response) {
                    vm.text2 = response.data;
                });
        }
        function stringToNumber1(txt1) {
            vm.rating1 = 3*txt1.length;
        }
        function stringToNumber2(txt2) {
            vm.rating2 = 3*txt2.length;
        }
        function compareNumbers(rating1, rating2) {
        if (Math.abs(rating1 - rating2) <= 60) {
            vm.match = 'Two Robots made in the same Lab!';
        } else {
            vm.match = 'Robot Match = FAIL';
        }
        }
        function getAvatar1(tx1) {
            return robotFactory
                .getRoboPic(tx1)
                .then(function(response){
                    vm.avatar1 = response.data;
                });

        }
        function getAvatar2(tx2) {
            return robotFactory
                .getRoboPic(tx2)
                .then(function(response){
                    vm.avatar2 = response.data;
                });
                
        }


    }

})();
//imageUrl