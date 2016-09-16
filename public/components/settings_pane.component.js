angular
	.module( "masterApp" )
	.component( "settingsPane", {
		"template"   : "<md-button flex='50' class='md-fab md-primary md-hue-2' aria-label='Settings' ng-click='showSettingsPane()'>"
		               + "<md-icon md-svg-src='icons/actions/turn_knob.svg'></md-icon>"
		               + "</md-button>",
		"controller" : function () {

		}
	} );
