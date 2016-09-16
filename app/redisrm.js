var P       = require( "bluebird" ),
    redis   = P.promisifyAll( require( "redis" ) ),
    uuid    = require( "uuid" ),
    redisrm = function ( redis_options, namespace ) {
	    "use strict";

	    // Initialize at first invocation
	    if ( !this._redis && ( redis_options || namespace ) ) {
		    this._redis = redis.createClient( redis_options );
		    this._redis.on( "error", console.error );
		    this._namespace = namespace || "";
	    }
    };

redisrm.prototype = {
	getName : function ( name ) {
		return this._namespace + ":" + name;
	},

	queue : {
		add : function ( job ) {
			"use strict";


		},

		delete : function () {},

		get : function () {}
	}
};

module.exports = redisrm;