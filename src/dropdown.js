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

.run(function($templateCache){
    $templateCache.put('/src/dropdown.html', '<div><div class="dropdown" role="group"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{selectedOption}} <span class="caret"></span></button><ul class="dropdown-menu"><li ng-repeat="item in options" ng-click="selectOption(item)"><a href="#">{{item}}</a></li></ul></div></div>');
})

.directive('dropdown', function($templateCache, $timeout) {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            options: '=',
            model: '=selectedModel',
            defaultSelection: '@',
            onSelect: '&'
        },
        template: $templateCache.get('/src/dropdown.html'),
        link: function(scope, element, attrs){
            if (angular.isUndefined(attrs.options)) {
                throw new Error('Dropdown: missing `options` attribute.');
            }

            if (!angular.isArray(scope.options)) {
                throw new Error('Dropdown: attribute `options` must be an array.');
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

            if (angular.isUndefined(attrs.defaultSelection)) {
                // Set the first option as selected
                scope.selectedOption = scope.options[0];
            } else {
                scope.selectedOption = attrs.defaultSelection;
            }
        }
    };
});