// controllers/posts.controller.js

const PostService = require("../services/posts.service");

// Post의 컨트롤러(Controller)역할을 하는 클래스
class PostsController {
  postService = new PostService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getPosts = async (req, res, next) => {
    // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
    const posts = await this.postService.findAllPost(); //  1개

    res.status(200).json({ data: posts });
  };

  createPost = async (req, res, next) => {
    const { nickname, password, title, content } = req.body;

    // 서비스 계층에 구현된 createPost 로직을 실행합니다.
    const createPostData = await this.postService.createPost(
      nickname,
      password,
      title,
      content
    );

    res.status(201).json({ data: createPostData });
  };

  modifyPost = async (req, res, next) => {
    const { password, title, content } = req.body;
    const { postId } = req.params;

    const modifyPostData = await this.postService.modifyPost(
      postId,
      password,
      title,
      content
    );

    if (modifyPostData.Message) {
      return res.json({ Message: modifyPostData.Message });
    } else {
      return res
        .status(412)
        .json({ errorMessage: modifyPostData.errorMessage });
    }
  };

  deletePost = async (req, res, next) => {
    const { password } = req.body;
    const { postId } = req.params;

    const deletePostData = await this.postService.deletePost(postId, password);

    if (deletePostData.Message) {
      return res.json({ Message: deletePostData.Message });
    } else {
      return res
        .status(412)
        .json({ errorMessage: deletePostData.errorMessage });
    }
  };

  findPost = async (req, res, next) => {
    const { postId } = req.params;

    const postInfo = await this.postService.findPost(postId);
    
    if (postInfo.errorMessage) {
      return res.status(412).json({ errorMessage : postInfo.errorMessage})
    } else {
      return res.json({postInfo})
    }
  }
}

module.exports = PostsController;
