describe('dropdown', function() {
    var $compile,
    $rootScope,
    $httpBackend,
    scope;
    beforeEach(function(){
        module('ng-bootstrap-dropdown');
    });
    beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        scope = $rootScope.$new();
    }));

    describe('init', function() {
        describe('when attribute options is undefined', function() {
            it('throws an error', function(){
                expect(function(){ 
                    $compile(angular.element('<dropdown></dropdown>'))(scope);
                    scope.$digest();
                }).toThrowError('Dropdown: missing `options` attribute.');
            });
        });
    });
});