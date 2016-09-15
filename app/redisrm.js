var bb      = require( "bluebird" ),
    uuid    = require( "uuid" ),
    redisrm = function () {
	    "use strict";

	    this._redis     = null;
	    this._namespace = "";
    };

redisrm.prototype = {
	init  : function ( redis, namespace ) {
		"use strict";

		this._redis = bb.promisifyAll( redis );
		if ( namespace ) {
			this._namespace = namespace;
		}

		return bb.resolve( this );
	},
	queue : {
		add    : function ( job ) {
			"use strict";


		},
		delete : function () {}
	}
};

module.exports = redisrm;