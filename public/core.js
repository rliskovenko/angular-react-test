var masterApp = angular.module( "masterApp", [ "ngMaterial" ] );


masterApp.controller( "masterAppController", function ( $scope, $http ) {

	$scope.addExec = function () {
		$http.post( "/exec_queue/", $scope.formData )
			.success( function ( data ) {
				$scope.formData   = {};
				$scope.exec_queue = data;
				console.dir( data );
			} )
			.error( function ( data ) {
				console.log( "Error submitting execution task:" + data );
			} )
	}
} );
