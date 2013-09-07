
/*
 * GET home page.
 */

var csv = require('csv');
var fs = require('fs');

exports.index = function(req, res){

    csv().from.path(__dirname + '/paatili.csv', {delimiter: ';', escape: '"'}).to.array(function(data){

        var tyypit = {};

        function printDataRow(element, index, array){

            var nimi = element[1];
            var summa = element[2];
            tyypit[nimi] = tyypit[nimi]+1 || 1;
            tyypit[nimi]["Summa"] = tyypit[nimi]["Summa"]+summa || summa;

            //console.log(element[1]);
        }

        data.forEach(printDataRow);

        console.log(tyypit);

    });


    res.render('index', { title: 'Express' });
};