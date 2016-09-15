var os             = require( "os" ),
    _              = require( "lodash" ),
    express        = require( "express" ),
    redis          = require( "redis" ),
    morgan         = require( "morgan" ),
    bodyParser     = require( "body-parser" ),
    methodOverride = require( "method-override" ),
    Redisrm        = require( "./redisrm" ),
    redisClient    = redis.createClient( { "host" : "redis" } ),
    redisrm        = new Redisrm(),
    app            = express();

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

	// Connect ORM with store
	redisrm.init( redisClient, "exec_queue" );

	// Configure
	app.use( express.static( __dirname + "/../public" ) );
	app.use( morgan( "dev" ) );
	app.use( bodyParser.urlencoded( { "extended" : true } ) );
	app.use( bodyParser.json() );
	app.use( methodOverride() );

}

function set_routes() {
	"use strict";

	app.get( "/exec_queue/:queue_id", function ( req, res ) {
		res.json( redisrm.queue.get( req.params.queue_id ) );
	} );

	app.get( "/exec_queue/", function ( req, res ) {
		res.json( redisrm.queue.get() );
	} );

	app.post( "/exec_queue/", function ( req, res ) {
		res.json( redisrm.queue.add( req.params ) );
	} );

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
redisClient.on( "error", console.dir );
_init();
set_routes();
listen();
