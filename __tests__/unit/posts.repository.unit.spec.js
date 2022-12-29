// __tests__/unit/posts.repository.unit.spec.js

const PostRepository = require("../../repositories/posts.repository.js");


// posts.repository.js 에서는 아래 5개의 Method만을 사용합니다.
let mockPostsModel = {
  findAll: jest.fn(),
  findByPk: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  destroy: jest.fn(),
}

let postRepository = new PostRepository(mockPostsModel);

describe('Layered Architecture Pattern Posts Repository Unit Test', () => {

  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  })

  test('Posts Repository findAllPost Method', async () => {
    mockPostsModel.findAll = jest.fn(() => {
      return "findAll Result"
    })

    const posts = await postRepository.findAllPost();

    // postsModel에 있는 findAll 메소드는 1번만 실행된다.
    expect(mockPostsModel.findAll).toHaveBeenCalledTimes(1);

    // postsModel에 있는 findall 메소드의 결과값이 바로 return 되어야 한다.
    expect(posts).toEqual("findAll Result")
  });

  test('Posts Repository createPost Method', async () => {
    mockPostsModel.create =jest.fn(() => {
      return "Hello Create Result"
    })

    // nickname, password, title, content
    const createPostParams = {
      nickname : "createPostNickname",
      password : "createPostPassword",
      title : "createPostTitle",
      content : "createPostContent"
    }

    const createPostData = await postRepository.createPost(
      createPostParams.nickname,
      createPostParams.password,
      createPostParams.title,
      createPostParams.content
    )

    // postModel.create 메소드의 결과값은 createPostData (메소드의 실행한 결과값) 변수와 일치한다.
    expect(createPostData).toEqual("Hello Create Result");
    
    // postModel.create 메소드는 1번 호출된다.
    expect(mockPostsModel.create).toHaveBeenCalledTimes(1);

    // postModel.create 메소드를 호출할 때, { nickname, password, title, content } 가 들어가는지 확인한다
    expect(mockPostsModel.create).toHaveBeenCalledWith({
      nickname : createPostParams.nickname,
      password : createPostParams.password,
      title : createPostParams.title,
      content : createPostParams.content
    })
  });

});