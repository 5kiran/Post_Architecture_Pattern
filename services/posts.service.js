// services/posts.service.js

const PostRepository = require("../repositories/posts.repository");
const { Posts } = require("../models/index.js") // DB Mocking

class PostService {
  postRepository = new PostRepository(Posts); //MOCK

  findAllPost = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const allPost = await this.postRepository.findAllPost();

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return allPost.map((post) => {
      return {
        postId: post.postId,
        nickname: post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  createPost = async (nickname, password, title, content) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createPostData = await this.postRepository.createPost(
      nickname,
      password,
      title,
      content
    );

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      postId: createPostData.postId,
      nickname: createPostData.nickname,
      title: createPostData.title,
      content: createPostData.content,
      createdAt: createPostData.createdAt,
      updatedAt: createPostData.updatedAt,
    };
  };

  checkPost = async (postId, password) => {
    const postInfo = await this.postRepository.findOnePost(postId);
    if (!postInfo) {
      return {errorMessage : "게시물이 존재하지 않습니다"}
    }

    if (postInfo.password !== password) {
      return { errorMessage: "패스워드를 다시 확인해주세요." };
    }

    return postInfo;
  };

  modifyPost = async (postId, password, title, content) => {
    const postInfo = await this.checkPost(postId, password);
    if (postInfo.errorMessage) {
      return { errorMessage: postInfo.errorMessage };
    }
    const modifyPost = postInfo;

    modifyPost.title = title;
    modifyPost.content = content;

    await this.postRepository.modifyPost(modifyPost);

    return { Message: "수정 완료" };
  };

  deletePost = async (postId, password) => {
    const postInfo = await this.checkPost(postId, password);

    if (postInfo.errorMessage) {
      return { errorMessage: postInfo.errorMessage };
    }

    await this.postRepository.deletePost(postInfo);

    return { Message: "삭제 완료" };
  };

  findPost = async (postId) => {
    const postInfo = await this.postRepository.findOnePost(postId);

    if (!postInfo) {
      return { errorMessage : "존재하지 않는 게시글 입니다" }
    }

    return postInfo
  }
}

module.exports = PostService;
