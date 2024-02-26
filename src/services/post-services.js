const prisma = require('../models/prisma');


const userFilter = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  mobile: true,
  profileImage: true,
  coverImage: true,
  createdAt: true,
  updatedAt: true
};

exports.findPostByUserId = async userId => {
     
    const posts = await prisma.post.findMany({
      where: {
        userId: {
          in: [userId]
        },
        deletedAt: null
      },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: userFilter
        },
        
      }
    });
  
    return posts;
  };
exports.createPost = data => prisma.post.create({ data });


