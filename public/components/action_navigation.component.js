function getRooms( $http, $scope ) {
	return new Promise( function ( resolve, reject ) {
		$http.get( "/data/rooms" )
			.success( function ( data ) {
				$scope.roomData = data;
				resolve();
			} )
			.error( reject );
	} );
}

function getDevices( $http, $scope ) {
	return new Promise( function ( resolve, reject ) {
		$http.get( "/data/devices" )
			.success( function ( data ) {
				$scope.deviceData = data;
				resolve();
			} )
			.error( reject );
	} )
}


angular
	.module( "masterApp" )
	.component( "actionNavigation", {
		"template"   : "<ul><li ng-repeat='action_item in action_structure'><span>action_item.name</span></li></ul>",
		"controller" : function actionNavigationController( $scope, $http ) {
			Promise
				.all( [ getDevices( $http, $scope ), getRooms( $http, $scope ) ] )
				.then( function () {console.dir( $scope );} )
				.catch( function () {
					console.error( "Unable to fetch data" );
				} );
		}
	} );