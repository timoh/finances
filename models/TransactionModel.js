var TransactionModel = function(){
    var mongoose = require('mongoose');
    var Schema = require('mongoose').Schema;

    /* Define the schema for transactions */
        var transactionSchema = new Schema({
            date: Date,
            recipient: String,
            sum: String
        });

    /* Private properties & methods */

        // Declaring a private model for internal methods
          //var _model = mongoose.model('Transaction', transactionSchema);
          // Creating a register method for convenience
          var _createNew = function(date, recipient, sum, callback){
            _model.create({ date: date, recipient: recipient, sum: sum }, function(e, doc){
              if(e) {
                fail(e);
              } else {
                callback(doc);
              }
            });
          };
          // Creating a findByEmail method for convenience
          var _findByRecipient = function(recipient, success, fail){
            _model.findOne({ recipient: recipient }, function(e, doc){
              if(e) {
                fail(e);
              } else {
                success(doc);
              }
            });
          }

    /* Public properties & methods */
        return {
            create: _createNew,
            schema: transactionSchema,
            //model: _model,
            findByRecipient: _findByRecipient,
            transactionSchema: transactionSchema
        }

}();

/* Export the Transaction model to be used in other contexts through module.exports */
    module.exports = TransactionModel;