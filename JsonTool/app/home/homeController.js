app.controller('homeController',
    ['$scope', function ($scope) {

        $scope.inputText = "";

        $scope.demoPrettify = function () {
            $scope.inputText = '{"a":{"b":"c","d":["e","f"]}}';
        };
        $scope.demoEncodeAsString = function () {
            $scope.inputText = 'This string\nhas multiple lines\nand "quotes".';
        };
        $scope.demoDecodeString = function () {
            $scope.inputText = '"This string\\nwill have multiple lines\\nand \\"quotes\\"."';
        };

        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        })
    }]);

app.filter('prettifyJson', function () {
    return function (input) {
        try {
            var object = angular.fromJson(input);
            var prettified = JSON.stringify(object, undefined, 2);
            return prettified;
        } catch (e) { }
        return "Input is not a valid JSON object.\n\n" +
               "Try something like {\"a\":\"b\"}";
    };
});

app.filter('encodeAsString', function () {
    return function (input) {
        return JSON.stringify(input);
    };
});

app.filter('decodeString', function () {
    return function (input) {
        try {
            var object = angular.fromJson(input);
            if (typeof object == 'string' || object instanceof String) {
                return object;
            }
        } catch (e) { }
        return "Input is not a valid JSON string.\n\n" +
               "Try something like \"hello\"";
    };
});
