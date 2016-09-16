var express = require( "express" ),
    Redisrm = require( "../redisrm" ),
    redisrm = new Redisrm(),
    router  = express.Router();

router.get( "/:queue_id", function ( req, res ) {
	res.json( redisrm.queue.get( req.params.queue_id ) );
} );

router.get( "/", function ( req, res ) {
	res.json( redisrm.queue.get() );
} );

router.post( "/", function ( req, res ) {
	res.json( redisrm.queue.add( req.params ) );
} );

module.exports = router;