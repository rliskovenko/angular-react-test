var express = require( "express" ),
    path    = require( "path" ),
    router  = express.Router();

router.get( "/rooms", function ( req, res ) {
	res.sendFile( path.join( __dirname, "..", "data", "room_data.json" ) );
} );

router.get( "/devices", function ( req, res ) {
	res.sendFile( path.join( __dirname, "..", "data", "device_data.json" ) );
} );

router.get( "/action", function ( req, res ) {
	res.sendFile( path.join( __dirname, "..", "data", "action_data.json" ) );
} );

module.exports = router;