import bcrypt from 'bcryptjs';
import User from '../models/UserModel.js'
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js';
import mongoose from 'mongoose';

const getUserProfile = async (req, res) => {
    // query will either be username or userId
    const { query } = req.params;
    try {
        let user;
        if (mongoose.Types.ObjectId.isValid(query)) {
            user = await User.findOne({ _id: query }).select('-password').select('-updatedAt').select('-isFrozen');
        }
        else {
            user = await User.findOne({ username: query }).select('-password').select('-updatedAt').select('-isFrozen');
        }
        if (!user) return res.status(400).json({ error: 'User not found' });
        res.status(200).json(user)
    } catch (error) {
        console.log("Error in getUserProfile controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const getUsers = async (req, res) => {
    // query will either be username or userId
    try {
        let user;
        user = await User.find().select('-password').select('-updatedAt').select('-isFrozen');

        if (!user) return res.status(400).json({ error: 'No users found' });
        res.status(200).json(user)
    } catch (error) {
        console.log("Error in getUsers controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const signupUser = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;

		const user = await User.findOne({ $or: [{ email }, { username }] });
		if (user) {
            console.log(user)
			return res.status(400).json({ error: "User already exists" });
		}
        if (password.length < 4) return res.status(400).json({ error: "Password must have at least 4 characters" });

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			name,
			email,
			username,
			password: hashedPassword,
            role: 'local',
		});
		await newUser.save();

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                profilePic: newUser.profilePic,
                watchlists: [],
                portfolios: []
            })
        } else {
            res.status(400).json({ error: 'Invalid user data'});
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log('Error in sinupUser: ', error.message)
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: 'Invalid username or password'})
        }
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role,
            profilePic: user.profilePic,
            watchlists: user.watchlists,
            portfolios: user.portfolios
        });

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log('Error in loginUser: ', error.message)
    }
}

const logoutUser = (req, res) => {
    try {
        res.cookie('jwt', '', {maxAge: 1})
        res.status(200).json({message: 'Logged out successfully'})
    } catch (error) {
        console.log("Error in logout controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

const updateUser = async (req, res) => {
    const { name, username, email, password, profilePic } = req.body;
    const userId = req.user._id;
    try {
        let user = await User.findById(userId);
        if (!user) return res.status(400).json({error: "User not found"});
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }
        user.name = name || user.name;
        user.username = username || user.username;
        user.email = email || user.email;
        user.profilePic = profilePic || user.profilePic;

        user = await user.save();

        // Find all posts that this user replied and update username and userProfilePic fields
		
        /* await Post.updateMany(
			{ "replies.userId": userId },
			{
				$set: {
					"replies.$[reply].username": user.username,
					"replies.$[reply].userProfilePic": user.profilePic,
				},
			},
			{ arrayFilters: [{ "reply.userId": userId }] }
		); */

        console.log("User updated successfully", user)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            bio: user.bio,
            profilePic: user.profilePic
        });
        
    } catch (error) {
        console.log("Error in updateUser controller", error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

export { signupUser, loginUser, logoutUser, updateUser, getUserProfile, getUsers };