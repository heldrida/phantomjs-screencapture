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

// solution
// http://stackoverflow.com/questions/26681464/looping-over-urls-to-do-the-same-thing/26681840#26681840

function handle_page(url, file){

    page.open(url, function (status) {

		console.log(status);

		if (status !== 'success') {
			console.log('Failed to load the url (' + url + ')!');
		}

		page.render('./screenshots/' + file.replace(".php", "") + '.jpg');

		next_page();

    });
}

function next_page (){

    var file = pages.shift();

    if (!file) {
        phantom.exit(0);
    }

	var url = 'http://magnolia/louboutin/pages/' + file;
    handle_page(url, file);
}

next_page();