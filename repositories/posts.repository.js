// repositories/posts.repository.js

const { Posts } = require("../models");

class PostRepository {
  constructor(postsModel) { // DB Mocking
    this.postsModel = postsModel // DB Mocking
  } // DB Mocking
  findAllPost = async () => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const posts = await this.postsModel.findAll();

    return posts;
  };

  createPost = async (nickname, password, title, content) => {
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const createPostData = await this.postsModel.create({
      nickname,
      password,
      title,
      content,
    });

    return createPostData;
  };

  findOnePost = async (postId) => {
    const post = await this.postsModel.findByPk(postId);

    return post;
  };

  modifyPost = async (modifyPost) => {
    await modifyPost.save();
  };

  deletePost = async (postInfo) => {
    await postInfo.destroy();
  };
}

module.exports = PostRepository;
