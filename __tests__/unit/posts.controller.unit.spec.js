// __tests__/unit/posts.controller.unit.spec.js

const PostsController = require("../../controllers/posts.controller");


// posts.service.js 에서는 아래 5개의 Method만을 사용합니다.
let mockPostService = {
  findAllPost: jest.fn(),
  findPostById: jest.fn(),
  createPost: jest.fn(),
  updatePost: jest.fn(),
  deletePost: jest.fn(),
}

let mockRequest = {
  body: jest.fn(),
};

let mockResponse = {
  status: jest.fn(),
  json: jest.fn(),
};

let postsController = new PostsController();
// postsController의 Service를 Mock Service로 변경합니다.
postsController.postService = mockPostService;

describe('Layered Architecture Pattern Posts Controller Unit Test', () => {

  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.

    // mockResponse.status의 경우 메서드 체이닝으로 인해 반환값이 Response(자신: this)로 설정되어야합니다.
    mockResponse.status = jest.fn(() => {
      return mockResponse
    });
  })

  test('Posts Controller getPosts Method by Success', async () => {
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
      }
    ]

    mockPostService.findAllPost = jest.fn(() => {
      return findAllPostReturnValue;
    })

    await postsController.getPosts(mockRequest, mockResponse);

    // findAllPost 메소드가 1번 호출 되었는가
    expect(mockPostService.findAllPost).toHaveBeenCalledTimes(1);
    
    // Response.status가 200으로 정상 전달 되었는가
    expect(mockResponse.status).toHaveBeenCalledTimes(1)
    expect(mockResponse.status).toHaveBeenCalledWith(200)

    // Response.json이 { data: posts }의 형태로 정상 전달 되었는가
    expect(mockResponse.json).toHaveBeenCalledWith({ data : findAllPostReturnValue})
  });

  test('Posts Controller createPost Method by Success', async () => {
    const createPostBodyParams = {
      nickname : "nickname1",
      password : "password",
      title : "title1",
      content : "content1"
    }

    mockRequest.body = createPostBodyParams;

    const createPostReturnValue = {
      postId : "1",
      nickname : "nickname1",
      title : "title1",
      content : "content1",
      createdAt : new Date().toString(),
      updatedAt : new Date().toString()
    }

    mockPostService.createPost = jest.fn(() => {
      return createPostReturnValue
    })

    await postsController.createPost(mockRequest, mockResponse);

    // 리퀘스트에 있는 body 데이터가 정상적으로 createPost에 전달 되었는가
    expect(mockPostService.createPost).toHaveBeenCalledTimes(1)
    expect(mockPostService.createPost).toHaveBeenCalledWith(
      createPostBodyParams.nickname,
      createPostBodyParams.password,
      createPostBodyParams.title,
      createPostBodyParams.content,
    )

    // mockResponse.json을 호출하는데 createPost의 return value가 맞는가
    expect(mockResponse.json).toHaveBeenCalledTimes(1);

    //{ data: createPostData }
    expect(mockResponse.json).toHaveBeenCalledWith({ data:createPostReturnValue });

    // mockResponse.status는 201로 정상 전달 되었는지 검증한다.
    expect(mockResponse.status).toHaveBeenCalledWith(201)
  });

  test('Posts Controller createPost Method by Invalid Params Error', async () => {
    mockRequest.body = {};

    await postsController.createPost(mockRequest, mockResponse);
    
    // mockResponse의 status가 400 번인지
    expect(mockResponse.status).toHaveBeenCalledWith(400);

    // mockResponse의 json이 {errorMessage : "내용을 입력해주세요"} 맞는지
    expect(mockResponse.json).toHaveBeenCalledWith({errorMessage : "내용을 입력해주세요"})
  });
});