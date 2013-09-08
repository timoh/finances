/* Import dependencies */
    var should = require('should');
    var moment = require('moment');
    var mongoose = require('mongoose');
    var clearDB = require('mocha-mongoose')('mongodb://localhost/finances_test');

    var TransactionModel = require('../models/TransactionModel');
    var Transaction;

/* Transaction Model Tests */    
    describe("Transactions", function(){
        
        /* Setup & teardown */

            /* Setup & connect to DB */
                var connection;
                before(function (done){
                    connection = mongoose.createConnection('mongodb://localhost/finances_test');

                    Transaction = connection.model('Transaction', TransactionModel.transactionSchema);
                    done();
                })

            /* Teardown & disconnect from DB */
                after (function(done){
                    connection.close(function(){
                        done();
                    })
                })

            /* Clear DB after each test case */
                beforeEach(function(done){
                    clearDB(done);
                })

        /* Start testing */
            /* Check for possibility to save & retrieve */
                it("has a name, recipient and sum", function(done){

                    Transaction.find(function(err, yolo){
                        console.log(yolo);    
                    })
                    

                    /* Create a transaction and save it */
                        aTransaction = Transaction.create({date: moment(), recipient: "Testiasiakas", sum: "100,0"}, function(err, testiasiakas){
                            if (err) return handleError(err);
                            console.log("saved!");
                        });

                    /* See if a transaction with this recipient is found in the DB */
                        Transaction.findOne(function(err, transaction){
                            if (err) return handleError(err);


                            console.log(transaction._id);
                            transaction._id.should.equal(aTransaction._id);
                        });

                        done();
                
                })

            /* Next up.. */

        /* End testing */
    })