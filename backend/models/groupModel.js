import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Title is required'],
        validate : {
            validator : (val) => val.length <= 20,
            message : (props) => `Title must be 20 chracters, found ${props.value.length}`
        }
    },
    description : {
        type : String,
        required : false,
        validate : {
            validator : (val) => val.length <= 30,
            message : (props) => `Description must be shorter, withing 30 characters`
        }
    },
    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        require : [true, 'Creator Id required'],
        validate : {
            validator : (val) => mongoose.Types.ObjectId.isValid(val),
        }
    },
    memberIds : [{
        type : mongoose.Types.ObjectId,
        ref : 'User',
        unique : true,
        validate : {
            validator : (arr) => arr.every(id => mongoose.Types.ObjectId.isValid(id))
        }
    }],
    expenseIds : [{
        type : mongoose.Types.ObjectId,
        ref : 'Expense',
        unique : true,
        validate : {
            validator : (arr) => arr.every(id => mongoose.Types.ObjectId.isValid(id)) 
        }
    }]
},{timestamps : true});

const Group = mongoose.model('Group', groupSchema);