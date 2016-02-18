"use strict";

var _ = require('lodash');
var jimp = require("jimp");
var fs = require('fs');
var imgCollection = [];

// files path
var path = './screenshots';

// set file collection
fs.readdir(path, function(err, items) {
	for (var i = 0; i < items.length; i++) {
		var file = items[i];
		if (file.indexOf('p-') > -1) {
			imgCollection.push(file);
		}
	}

	processImgs();

});


function processImgs() {

	var file = imgCollection.shift();

	var img = path + '/' + file;

	jimp.read(img).then(function (imgFile) {

		imgFile.crop(0, 0, 1440, 900)
		   .resize(1440 / 3, 900 / 3)
		   .write(img.replace(".jpg", "_cropped.jpg"));

		   processImgs();

	}).catch(function (err) {
		console.log(err);
	});

}