import { Handler } from 'aws-lambda';
import { TokenizationService } from './service/tokenization.service'
import { Token } from './model/token';

export const handler = async (event:any) => {
  try {
    const tokenizationService = new TokenizationService();
    const authorizationHeader = event.headers['authorization']
    switch (event.requestContext.http.method) {
      case 'POST':
        const requestBody = JSON.parse(event.body || "")
        tokenizationService.validatePrimaryKey(authorizationHeader || "")
        return await tokenizationService.post(requestBody as Token)
      case 'GET':
        return await tokenizationService.get(event.queryStringParameters.token || "")
      default:
        return {
          statusCode: 404,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "Resource no found"
          }),
        };
    }
  } catch (error: any) {
    console.log("🚀 ~ file: index.ts:28 ~ handler ~ error:", error)
    return error;
  }
};
