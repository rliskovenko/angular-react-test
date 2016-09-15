var exec_queue = angular.module( "execQueue", [] );

function mainController( $scope, $http ) {
	"use strict";

	$scope.formData = {};

	$http.get( "/exec_queue" )
		.success( function ( data ) {
			$scope.exec_queue = data;
			console.dir( data );
		} )
		.error( function ( data ) {
			console.log( "Error getting execution list:" + data );
		} );

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
}
