/* Import dependencies */

    var Transaction = require('../models/TransactionModel.js');

    var csv = require('csv');
    var fs = require('fs');
    var moment = require('moment');

/* Index route */


    exports.index = function(req, res){

        /* Parse CSV file */

            csv().from.path(__dirname + '/paatili.csv', {delimiter: ';', escape: '"'}).to.array(function(data){

                /* What to do with each row */

                    function printDataRow(element, index, array){

                        /* For each row, check if there already is a transaction recipient with that name*/

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

                /* Loop through each row */

                    data.forEach(printDataRow);

            });

        /* Render the results */

            res.render('index', { title: 'Express' });
    
    };