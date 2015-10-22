if (typeof $ == 'undefined') {
    throw new Error('Missing jQuery. jQuery must be included for bootstrap and ng-bootstrap-dropdown.');
}

if (typeof $.fn.dropdown == 'undefined') {
    throw new Error('Missing bootstrap. Bootstrap must be included before ng-boostrap-dropdown.');
}

if (typeof angular == 'undefined') {
    throw new Error('Missing angular. Angular must be included before ng-bootsrap-dropdown.');
}

angular.module('ng-bootstrap-dropdown', [])
.directive('dropdown', function($templateCache, $timeout) {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            options: '=',
            model: '=selectedModel',
            selectedFirst: '@',
            onSelect: '&'
        },
        templateUrl: '/src/dropdown.html',
        link: function(scope, element, attrs){
            if (angular.isUndefined(attrs.options)) {
                throw new Error('Dropdown: missing `options` attribute.');
            }

            if (!angular.isArray(scope.options)) {
                throw new Error('Dropdown: ' + scope.options + ' is not an array.');
            }

            /**
             *
             */
            scope.selectOption = function(option){
                scope.selectedOption = option;
                scope.model = option;

                if (!angular.isUndefined(scope.onSelect)) {
                    $timeout(function(){
                        scope.onSelect({option: option});
                    });
                }
            };

            scope.$watch('options', function(newOptions, oldOptions){
                if (newOptions !== oldOptions) {
                    scope.selectOption(newOptions[0]);
                }
            });

            if (angular.isUndefined(attrs.selectedFirst)) {
                // Set the first option as selected
                scope.selectedOption = scope.options[0];
            } else {
                scope.selectedOption = attrs.selectedFirst;
            }
        }
    };
});