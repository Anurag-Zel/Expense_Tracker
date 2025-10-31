import mongoose from "mongoose";

const groupSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Title is required'],
        validate : {
            validator : (val) => val.length <= 20,
            message : (props) => `Title must be 20 characters, found ${props.value.length}`
        }
    },
    description : {
        type : String,
        required : false,
        validate : {
            validator : (val) => val.length <= 30,
            message : (props) => `Description must be shorter, within 30 characters`
        }
    },
    createdBy : {
        type : String,
        ref : 'User',
        required : [true, 'Creator Id required'],
    },
    memberIds : {
        type : [mongoose.Types.ObjectId],
        ref : 'User',
        default : [],
        validate :{
            validator : (arr) => arr.every(id => mongoose.Types.ObjectId.isValid(id))
        }
    },
    expenseIds : {
        type : [mongoose.Types.ObjectId],
        ref : 'Expense',
        default : [],
        validate : {
            validator : (arr) => arr.every(id => mongoose.Types.ObjectId.isValid(id)) 
        }
    }
},{timestamps : true});

const Group = mongoose.model('Group', groupSchema);
export default Group;