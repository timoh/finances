
/*
 * GET home page.
 */

var csv = require('csv');
var fs = require('fs');
var mongoose = require('mongoose');
var moment = require('moment');

    mongoose.connect('mongodb://localhost/financials_test');

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function callback () {
      console.log('DB connect successful!');
    });

var transactionSchema = mongoose.Schema({
    date: Date,
    recipient: String,
    sum: String
});

var Transaction = mongoose.model('Transaction', transactionSchema);


exports.index = function(req, res){

    csv().from.path(__dirname + '/paatili.csv', {delimiter: ';', escape: '"'}).to.array(function(data){

        function printDataRow(element, index, array){

            Transaction.find({name: element[1]}, function (err, transaction) {

                function handleError(err) {
                    console.log ("Error:", err);
                }

                if (err) return h

                function addNew() {
                    var newTrans = new Transaction({ date: moment(element[0]), recipient: element[1], sum: element[2]});

                    newTrans.save(function(err) {
                        if (err) return handleError(err);
                        console.log('Transaction for '+ element[1] + ' saved!');
                    })
                }

                if (transaction == element[1]){
                    console.log('Transaction with the recipient of '+ element[1] + ' found.');
                    // exists!

                    if (transaction.date == element[0] && transaction.sum == element[2]) {
                        // probably the same transaction, skip!
                    } else {
                        addNew();
                    }

                } else  {
                    // does not exist!
                    addNew();



                } 
            })
        }

        data.forEach(printDataRow);

    });


    res.render('index', { title: 'Express' });
};