import mongoose, { model } from "mongoose";
import User from "../models/userModel.js";
import Group from "../models/groupModel.js";

// Add User
export const addUser = async(req, res) =>{
    try {
        if(!req.body && Object.keys(req.body).length === 0){
            return res.status(400).json({
                message : "Request body empty"
            })
        }

        const {auth0Id, username, fullname, email, phone, profilePic} = req.body;

        const existingUser = await User.findOne({
            $or : [{auth0Id}, {email} , {phone}],
        });

        if(existingUser){
            return res.status(400).json({
                message : "User already exists with those details"
            })
        }

        const user = new User({
            auth0Id : auth0Id,
            username : username,
            fullname : fullname,
            email : email,
            phone : phone,
            profilePic : profilePic,
        });

        await user.save();

        return res.status(201).json({
            message : "User created sucessfully",
            user : user,
        });

    } catch (error) {
        if(error.name === 'ValidationError'){
            return res.status(404).json({
                message : error.message
            });
        }

        return res.status(500).json({
            message : 'Internal Server Error'
        });
    }
}

// Get profile details
export const getDetails = async(req,res) => {
    try {
        if(!req.body && Object.keys(req.body).length === 0){
            return res.status(400).json({
                message : 'Request body empty'
            })
        }

        const {auth0Id} = req.body;
        
        const existingUser = await User.findOne({auth0Id : auth0Id});

        if(!existingUser){
            return res.status(404).json({
                message : 'User doesn\'t exist'
            })
        }


        return res.status(200).json({
            message : 'User details successfully fetched',
            user : existingUser
        });
    } catch (error) {
        return res.status(400).json({
            message : `${error.message}`
        });
    }
}

// Edit personal details
export const personalInfo = async (req,res) => {
    try {
        if(!req.body && Object.keys(req.body).length === 0){
            return res.status(400).json({
                message : 'Request body empty'
            })
        }

        const {auth0Id, ...details} = req.body;

        const anotherUser = await User.findOne({
            $or : [{auth0Id}, {email} , {phone}],
        });

        if(anotherUser){
            return res.status(400).json({
                message : 'User with this Email or Phone already exists'
            })
        }

        const existingUser = await User.findOne({auth0Id : auth0Id});

        if(!existingUser){
            return res.status(404).json({
                message : 'User doesn\'t exist'
            })
        }

        existingUser.username = details.username ||= existingUser.username;
        existingUser.fullname = details.fullname ||= existingUser.fullname;
        existingUser.email = details.email ||= existingUser.email;
        existingUser.phone = details.phone ||= existingUser.phone;
        existingUser.profilePic = details.profilePic ||= existingUser.profilePic;

        await existingUser.save();

        return res.status(201).json({
            message : 'User details successfully updates',
            user : existingUser
        });
    } catch (error) {
        if(error.name === 'ValidationError'){
            return res.status(400).json({
                message : error.message
            });
        }

        return res.status(500).json({
            message : 'Internal Server Error'
        });
    }
}

// Delete User
export const deleteUser = async(req,res) => {
    try {
        if(!req.body || Object.keys(req.body).length == 0){
            return res.status(400).json({
                message : 'Request body empty'
            });
        }

        const {auth0Id} = req.body;

        const existingUser = await User.findOne({auth0Id : auth0Id});

        if(!existingUser){
            return res.status(404).json({
                message : 'User doesn\'t exists'
            });
        }

        if(existingUser.groupIds.length !== 0){
            // To add yet
        }

        await existingUser.deleteOne();
        
        return res.status(201).json({
            message : "User deleted sucessfully",
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

