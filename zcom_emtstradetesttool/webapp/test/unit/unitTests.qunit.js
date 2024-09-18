/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zcom_emtstradetesttool/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
