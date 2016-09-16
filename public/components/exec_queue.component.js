angular
	.module( "masterApp" )
	.component( "execQueue", {
		"template"   : "<ul><li ng-repeat='exec_item in exec_queue'><span>exec_item.name</span></li></ul>",
		"controller" : function execQueueController( $scope, $http ) {
			$http.get( "/exec_queue" )
				.success( function ( data ) {
					$scope.exec_queue = data;
					console.dir( data );
				} )
				.error( function ( data ) {
					console.log( "Error getting execution list:" + data );
				} );
		}
	} );
