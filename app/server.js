var os              = require( "os" ),
    fs              = require( "fs" ),
    _               = require( "lodash" ),
    express         = require( "express" ),
    morgan          = require( "morgan" ),
    bodyParser      = require( "body-parser" ),
    methodOverride  = require( "method-override" ),
    Redisrm         = require( "./redisrm" ),
    routerData      = require( "./routers/data" ),
    routerExecQueue = require( "./routers/exec_queue" ),
    redisrm         = new Redisrm( {
	    "host"           : "redis",
	    "retry_strategy" : function ( options ) {
		    return 120 * 1000 * 1000;
	    }
    }, "angular_test" ),
    app             = express();

function _init() {
	"use strict";

	// Dump configuration info on startup
	console.dir( {
		"pwd"      : __dirname,
		"hostname" : os.hostname(),
		"arch"     : os.arch(),
		"mem"      : Math.round( os.freemem() / 1024 / 1024 ) + "MB",
		"network"  : _.chain( os.networkInterfaces() )
			.flatMap()
			.filter( { "family" : "IPv4" } )
			.map( function ( e ) {
				return e.address
			} )
			.value()
	} );

	// Configure
	app.use( express.static( __dirname + "/../public" ) );
	app.use( morgan( "dev" ) );
	app.use( bodyParser.urlencoded( { "extended" : true } ) );
	app.use( bodyParser.json() );
	app.use( methodOverride() );

}

function set_routes() {
	"use strict";

	app.use( "/data", routerData );
	app.use( "/exec_queue", routerExecQueue );

	app.get( "*", function ( req, res ) {
		res.sendfile( "../public/index.html" );
	} );
}

function listen() {
	"use strict";

	// Listen
	app.listen( 8000 );
	console.log( "Started and listening" );
}

_init();
set_routes();
listen();
