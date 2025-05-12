const { Following, User } = require('../models');

const getAllFollowing = async (req, res) => {
    try {
        const { username } = req.params;
        
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        const user = await User.findOne({ where: { username } });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('Finding following for user:', { userId: user.id, username });

        const following = await Following.findAll({
            where: { followerId: user.id },
            include: [{
                model: User,
                as: 'followed',
                attributes: ['id', 'username', 'isAuthor']
            }]
        });

        console.log('Found following records:', following.length);

        const followedUsers = following.map(f => f.followed).filter(Boolean);
        res.json(followedUsers);
    } catch (error) {
        console.error('Error in getAllFollowing:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message
        });
    }
};

const followUser = async (req, res) => {
    try {
        const { username } = req.params;
        const { targetUsername } = req.body;
        
        if (!username || !targetUsername) {
            return res.status(400).json({ error: 'Both username and targetUsername are required' });
        }

        console.log('Follow request:', { username, targetUsername });
        
        const [follower, target] = await Promise.all([
            User.findOne({ where: { username } }),
            User.findOne({ where: { username: targetUsername } })
        ]);

        console.log('Found users:', { 
            follower: follower ? { id: follower.id, username: follower.username } : null,
            target: target ? { id: target.id, username: target.username } : null 
        });

        if (!follower || !target) {
            return res.status(404).json({ error: 'One or both users not found' });
        }

        if (follower.id === target.id) {
            return res.status(400).json({ error: 'Users cannot follow themselves' });
        }

        const [followRecord, created] = await Following.findOrCreate({
            where: {
                followerId: follower.id,
                followedId: target.id
            },
            defaults: {
                createdAt: new Date()
            }
        });

        if (!created) {
            return res.status(209).json({ info: 'Already following this user' });
        }

        console.log('Created new follow record:', followRecord);

        res.status(201).json({ 
            message: 'Successfully followed user',
            followRecord: {
                followerId: followRecord.followerId,
                followedId: followRecord.followedId,
                createdAt: followRecord.createdAt
            }
        });
    } catch (error) {
        console.error('Error in followUser:', error);
        console.error('Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message
        });
    }
};

const unfollowUser = async (req, res) => {
    try {
        const { username, targetUsername } = req.params;
        
        if (!username || !targetUsername) {
            return res.status(400).json({ error: 'Both username and targetUsername are required' });
        }

        console.log('Unfollow request:', { username, targetUsername });
        
        const [follower, target] = await Promise.all([
            User.findOne({ where: { username } }),
            User.findOne({ where: { username: targetUsername } })
        ]);

        if (!follower || !target) {
            return res.status(404).json({ error: 'One or both users not found' });
        }

        const deleted = await Following.destroy({
            where: {
                followerId: follower.id,
                followedId: target.id
            }
        });

        if (deleted === 0) {
            return res.status(404).json({ error: 'Follow relationship not found' });
        }

        res.status(200).json({ message: 'Successfully unfollowed user' });
    } catch (error) {
        console.error('Error in unfollowUser:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message
        });
    }
};

const getFollowerCount = async (req, res) => {
    try {
        const { username } = req.params;
        
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        const user = await User.findOne({ where: { username } });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const count = await Following.count({
            where: { followedId: user.id }
        });

        res.json({ count });
    } catch (error) {
        console.error('Error in getFollowerCount:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message
        });
    }
};

const getAllFollowers = async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ where: { username } });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        console.log('Finding followers for user:', { userId: user.id, username });

        const followers = await Following.findAll({
            where: { followedId: user.id },
            include: [{
                model: User,
                as: 'follower',
                attributes: ['id', 'username', 'isAuthor']
            }]
        });

        console.log('Found follower records:', followers.length);

        const followerUsers = followers.map(f => f.follower).filter(Boolean);
        res.json(followerUsers);
    } catch (error) {
        console.error('Error in getAllFollowers:', error);
        res.status(500).json({ 
            error: 'Internal server error',
            details: error.message
        });
    }
};

module.exports = { 
    unfollowUser, 
    getFollowerCount, 
    getAllFollowers, 
    followUser, 
    getAllFollowing
};
