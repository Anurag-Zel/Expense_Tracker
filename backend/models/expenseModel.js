import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    description : {
        type : String,
        required : false,
        validate : {
            validator : (val) => val.length <= 20,
            message : (props) => `Description must be shorter, withing 20 characters`
        }
    },
    amount : {
        type : Number,
        required : [true, 'Amount is required'],
        validate : {
            validator : (val) => typeof val === 'number' && !isNaN(val) && val > 0,
            message : (props) => `${props.value} not a valid Amount Format`
        }
    },
    createdOn : {
        type : Date,
        default : Date.now()
    },
    owedTo : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : [true, 'Owed To required'],
        validate : {
            validator : (val) => mongoose.Types.ObjectId.isValid(val)
        }
    },
    owedBy : [{
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : [true, 'Owed By required'],
        validate : {
            validator : (val) => mongoose.Types.ObjectId.isValid(val)
        }
    }]
})