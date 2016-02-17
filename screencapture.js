"use strict";

var pages = [];

// the file system module
var fs = require('fs');

// the webpage module
var page = require('webpage').create();

// properties
var path = '../../louboutin/pages/';
var list = fs.list(path);

// list files
for (var x = 0; x < list.length; x++) {

	var file = path + list[x];

	// check if file has condition prefix `p-`
	if (fs.isFile(file) && file.indexOf('p-') > -1) {
		pages.push(file.replace(path, ""));
	}

}

// save screenshots
for (var i = 0; i < 10; i++) {

	(function (file) {

		var url = 'http://magnolia/louboutin/pages/' + file;

		page.open(url, function() {
			page.render('./screenshots/' + file.replace("php", "") + '.png');
			phantom.exit();
		});

	}(pages[i]));

}