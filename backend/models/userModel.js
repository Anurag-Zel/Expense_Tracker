import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, 'UserName is required'],
        validate : [
            {
                validator : (val) => val.length >= 8,
                message : (props) => `Must be at least 8 letters, got ${props.value.length}`,
            },
            {
                validator : (val) => /^[a-zA-Z0-9_]+$/.test(val),
                message : (props) => 'UserName must only contain letters, numbers and underscores',
            }
        ]
    },
    fullname : {
        type : String,
        required : false,
        validate : {
            validator : (val) => /^[a-zA-Z ]+$/.test(val),
            message : (props) => 'UserName must only contain letters'
        }
    },
    email : {
        type : String,
        required : [true, 'Email is required'],
        unique : true,
        validate : {
            validator : (val) => /^\S+@\S+\.\S+$/.test(val),
            message : (props) => `${props.value} is not a proper email address`
        }
    },
    phone : {
        type : String,
        required : false,
        unique : true,
        validate : {
            validator : (val) => /^[1-9][0-9]{9}$/.test(val),
            message : (props) => `${props.value} not a valid Phone Number`
        }
    },
    profilePic : {
        type : String,
        required : false,
        validate : {
            validator : (val) => /^https?.\/\/.+.\.(jpg|jpeg|png|gif|webp)$/.test(val),
            message : (props) =>  `${props.value} not a valid image format`
        }
    },
    groupIds : [{
        type : mongoose.Types.ObjectId,
        required : false,
        ref : 'Group',
        validate : {
            validator : (arr) => arr.every(id => mongoose.Types.ObjectId.isValid(val)),
        }
    }],
},{timestamps : true});

const User = mongoose.model('User',userSchema);
export default User;