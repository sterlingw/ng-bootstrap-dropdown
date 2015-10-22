describe('dropdown', function() {
    var $compile,
    $rootScope,
    $httpBackend,
    $timeout,
    scope;
    beforeEach(function(){
        module('ng-bootstrap-dropdown');
    });
    beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_, _$timeout_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $timeout = _$timeout_;
    }));
    beforeEach(function(){
        scope = $rootScope.$new();
        scope.testOptions = ['option 1', 'option 2', 'option 3'];
    });

    describe('init', function() {
        describe('when attribute options is undefined', function() {
            it('throws an error', function(){
                expect(function(){ 
                    $compile(angular.element('<dropdown></dropdown>'))(scope);
                    scope.$digest();
                }).toThrowError('Dropdown: missing `options` attribute.');
            });
        });
        describe('when attribute options is not an array', function() {
            it('throws an error', function(){
                expect(function(){
                    $compile(angular.element('<dropdown options="{}"></dropdown>'))(scope);
                    scope.$digest();
                }).toThrowError('Dropdown: attribute `options` must be an array.');
            });
        });
        describe('when attribute defaultSelection is undefined', function() {
            var element;
            beforeEach(function(){
                element = $compile(angular.element('<dropdown options="testOptions"></dropdown>'))(scope);
                scope.$digest();
            });
            it('sets property selectedOption as the first option in the option list', function() {
                expect(element.isolateScope().selectedOption).toBe(scope.testOptions[0]);
            });
        });
        describe('when the options list updates', function() {
            var element;
            var newScope;
            beforeEach(function(){
                newScope = scope;
                element = $compile(angular.element('<dropdown options="testOptions"></dropdown>'))(newScope);
                newScope.$digest();
            });
            it('calls selectOption', function() {
                var isolateScope = element.isolateScope();
                var newOptions = ['new option 1', 'new option 2'];

                scope.testOptions = newOptions;
                scope.$digest();

                expect(isolateScope.selectedOption).toBe(newOptions[0]);
            });
        });
        describe('#selectOption', function() {
            var element;
            beforeEach(function(){
                element = $compile(angular.element('<dropdown options="testOptions"></dropdown>'))(scope);
                scope.$digest();
            });
            it('updates selectedOption', function() {
                var option = scope.testOptions[0];

                element.isolateScope().selectOption(option);

                expect(element.isolateScope().selectedOption).toBe(option);    
            });
            it('updates the model', function() {
                var option = scope.testOptions[0];

                element.isolateScope().selectOption(option);

                expect(element.isolateScope().model).toBe(option);
            });
            describe('when attribute on-select is defined', function() {
                var element;
                beforeEach(function(){
                    element = $compile(angular.element('<dropdown options="testOptions" on-select="onSelect(option)"></dropdown>'))(scope);
                    scope.$digest();
                });
                it('calls the given function in a $timeout', function() {
                    var isolateScope = element.isolateScope();
                    var option = scope.testOptions[0];
                    spyOn(isolateScope, 'onSelect');

                    isolateScope.selectOption(option);
                    $timeout.flush();

                    expect(isolateScope.onSelect).toHaveBeenCalled();

                    $timeout.verifyNoPendingTasks();
                });
            });
        });
    });
});