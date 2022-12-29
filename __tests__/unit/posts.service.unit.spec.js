const PostService = require("../../services/posts.service.js");

let mockPostsRepository = {
  findAllPost: jest.fn(),
  createPost: jest.fn(),
  findOnePost: jest.fn(),
  modifyPost: jest.fn(),
  deletePost: jest.fn(),
};

let postService = new PostService();
// postService의 Repository를 Mock Repository로 변경합니다.
postService.postRepository = mockPostsRepository;

describe("Layered Architecture Pattern Posts Service Unit Test", () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test("Posts Service findAllPost Method", async () => {
    const findAllPostReturnValue = [
      {
        postId: 1,
        nickname: "nickname_1",
        title: "title_1",
        createdAt: new Date("11 October 2022 00:00"),
        updatedAt: new Date("11 October 2022 00:00"),
      },
      {
        postId: 2,
        nickname: "nickname_2",
        title: "title_2",
        createdAt: new Date("12 October 2022 00:00"),
        updatedAt: new Date("12 October 2022 00:00"),
      },
    ];

    mockPostsRepository.findAllPost = jest.fn(() => {
      return findAllPostReturnValue;
    });

    const allPost = await postService.findAllPost();

    expect(allPost).toEqual(
      findAllPostReturnValue.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
    );

    expect(mockPostsRepository.findAllPost).toHaveBeenCalledTimes(1);
  });

  test("Posts Service deletePost Method By Success", async () => {
    const findOnePostReturnValue = {
      postId: 1,
      nickname: "nickname_1",
      title: "title_1",
      content: "content_1",
      password : "0000",
      createdAt: new Date("12 October 2022 00:00"),
      updatedAt: new Date("12 October 2022 00:00"),
    }

    mockPostsRepository.findOnePost = jest.fn(() => {
      return findOnePostReturnValue;
    })

    const deletePost = await postService.deletePost(1, "0000");

    // findOnePost 메소드를 1번 호출한다. 입력받는 인자는 postId이다.
    expect(mockPostsRepository.findOnePost).toHaveBeenCalledTimes(1);
    expect(mockPostsRepository.findOnePost).toHaveBeenCalledWith(1);

    // deletePost 메소드가 호출된다. 입력받는 인자는 findOnePost에서 return 받은 값이다.
    expect(mockPostsRepository.deletePost).toHaveBeenCalledTimes(1);
    expect(mockPostsRepository.deletePost).toHaveBeenCalledWith(findOnePostReturnValue);

    // deletePost가 반환 하는 값
    expect(deletePost).toEqual({ Message: "삭제 완료" })
  });

  test("Posts Service deletePost Method By Not Found Post Error", async () => {
    const findOnePostReturnValue = null;

    mockPostsRepository.findOnePost = jest.fn(() => {
      return findOnePostReturnValue
    });
    
    const deletePost = await postService.deletePost(1, "23423432");
    try {
      // postId를 입력한 findOnePost 메소드 실행, 1번 호출
      expect(mockPostsRepository.findOnePost).toHaveBeenCalledTimes(1);
      expect(mockPostsRepository.findOnePost).toHaveBeenCalledWith(90);
    } catch {
      // return 된 findOnePost의 결과가 존재하지 않을 때 에러 발생
      expect(deletePost).toEqual({errorMessage : "게시물이 존재하지 않습니다"})
    } 
  });
});
