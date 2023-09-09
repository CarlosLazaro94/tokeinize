import { handler } from '../src/index';
import { TokenizationService } from '../src/service/tokenization.service'
import { describe, expect, it, jest } from '@jest/globals';
import redis from 'redis-mock';
import sinon from 'sinon';
import { TokenRepository } from '../src/repository/tokenization.repository';
import { RedisConfig } from '../src/config/RedisConfig';
import { Utils } from "../src/utils/utils";

const redisClient = redis.createClient({});
sinon.stub(redis, 'createClient').returns(redisClient);

jest.mock('../src/config/RedisConfig')
jest.mock('../src/repository/tokenization.repository')
jest.mock('../src/utils/utils');

const tokenizationService = new TokenizationService();
const tokenizationServiceStubPost = sinon.stub(tokenizationService, 'post');
tokenizationServiceStubPost.resolves({
  statusCode: 200,
  headers: {
    "Content-Type": 'application/json',
  },
  body: "{\"message\":{\"status\":\"OK\",\"key\":\"hEcrp0snCdQhzHh6\"}}",
});

const tokenizationServicesStubGet = sinon.stub(tokenizationService, 'get');
tokenizationServicesStubGet.resolves({
  statusCode: 200,
  headers: {
    "Content-Type": 'application/json',
  },
  body: "{\"message\":{\"status\":\"OK\",\"key\":\"hEcrp0snCdQhzHh6\"}}",
})

const tokenizeRepository = new TokenRepository();
const tokenizationRepositoryStubSaveData = sinon.stub(tokenizeRepository, 'saveData');
tokenizationRepositoryStubSaveData.resolves('OK')

const utilsService = new Utils();
const generateTokenSpy = sinon.stub(utilsService, 'generateToken');
generateTokenSpy.returns("hEcrp0snCdQhzHh6");


describe('Handler', () => {

  it('should return a 200 OK response for a POST request', async () => {

    const redisConfigInstance = new RedisConfig();
    const connectionStub = sinon.stub(redisConfigInstance, 'connection').resolves(redisClient);

    (RedisConfig as jest.Mock).mockReturnValue(redisConfigInstance);

    const event = {
      body: '{\r\n' +
        '    "email": "carlos@gmail.com",\r\n' +
        '    "card_number": "1111111111111",\r\n' +
        '    "cvv": "123",\r\n' +
        '    "expiration_year": "2023",\r\n' +
        '    "expiration_month": "09"\r\n' +
        '}',
      cookies: [],
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer pk_test_0ae8dW2FpEAZlxlz',
        'user-agent': 'PostmanRuntime/7.32.3',
        accept: '*/*',
        'postman-token': '1f0bd2e4-80ed-402d-bff1-068ae35e72de',
        host: 'localhost:3000',
        'accept-encoding': 'gzip, deflate, br',
        connection: 'keep-alive',
        'content-length': '156'
      },
      isBase64Encoded: false,
      pathParameters: null,
      queryStringParameters: null,
      rawPath: '/tokens',
      rawQueryString: '',
      requestContext: {
        accountId: 'offlineContext_accountId',
        apiId: 'offlineContext_apiId',
        authorizer: { jwt: [Object] },
        domainName: 'offlineContext_domainName',
        domainPrefix: 'offlineContext_domainPrefix',
        http: {
          method: 'POST',
          path: '/tokens',
          protocol: 'HTTP/1.1',
          sourceIp: '::1',
          userAgent: 'PostmanRuntime/7.32.3'
        },
        operationName: undefined,
        requestId: 'offlineContext_resourceId',
        routeKey: 'POST /tokens',
        stage: '$default',
        time: '08/Sep/2023:10:06:37 -0500',
        timeEpoch: 1694185597764
      },
      routeKey: 'POST /tokens',
      stageVariables: null,
      version: '2.0'
    }
    
    const result = await handler(event);
    connectionStub.restore();
    tokenizationServiceStubPost.restore();
    generateTokenSpy.restore();

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual("{\"message\":{}}")

  });

  it('should return a 204 Not Found response for a GET request with an invalid token', async () => {
    const redisConfigInstance = new RedisConfig();
    const connectionStub = sinon.stub(redisConfigInstance, 'connection').resolves(redisClient);

    (RedisConfig as jest.Mock).mockReturnValue(redisConfigInstance);


    const event = {
      body: null,
      cookies: [],
      headers: {
        authorization: 'Bearer pk_test_0ae8dW2FpEAZlxlz',
        'user-agent': 'PostmanRuntime/7.32.3',
        accept: '*/*',
        'postman-token': '835105e2-c552-454b-8935-eb04c8fa5349',
        host: 'localhost:3000',
        'accept-encoding': 'gzip, deflate, br',
        connection: 'keep-alive'
      },
      isBase64Encoded: false,
      pathParameters: null,
      queryStringParameters: { token: 'xGSA3Q3tuLPyxCFS' },
      rawPath: '/tokens',
      rawQueryString: 'token=xGSA3Q3tuLPyxCFS',
      requestContext: {
        accountId: 'offlineContext_accountId',
        apiId: 'offlineContext_apiId',
        authorizer: { jwt: [Object] },
        domainName: 'offlineContext_domainName',
        domainPrefix: 'offlineContext_domainPrefix',
        http: {
          method: 'GET',
          path: '/tokens',
          protocol: 'HTTP/1.1',
          sourceIp: '::1',
          userAgent: 'PostmanRuntime/7.32.3'
        },
        operationName: undefined,
        requestId: 'offlineContext_resourceId',
        routeKey: 'GET /tokens',
        stage: '$default',
        time: '08/Sep/2023:10:12:14 -0500',
        timeEpoch: 1694185934616
      },
      routeKey: 'GET /tokens',
      stageVariables: null,
      version: '2.0'
    };


    const result = await handler(event);
    connectionStub.restore();
    tokenizationServicesStubGet.restore();


    expect(result.statusCode).toBe(204);
  });

  
});