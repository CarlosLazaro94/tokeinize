import { Token } from "src/model/token";
import { Utils } from "../utils/utils";
import { UtilsException } from "../utils/exception/utilsException";
import { TokenRepository } from "../repository/tokenization.repository";
import { Card } from "src/model/card";

export class TokenizationService {

    util        = new Utils();
    exceptions  = new UtilsException();
    repository  = new TokenRepository();
    errorList   = [];

    async post(request: Token) {
        try {
            const key = this.util.generateToken();
            this.util.validation(request);
            const res = await this.repository.saveData(key, request);
            return {
                statusCode: 200,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: {
                        status: res,
                        key: key
                    }
                }),
            };
        } catch (error: any) {
            throw this.exceptions.getException(400, error)
        }
    }

    async get(token: string) {
        try {
            this.util.validateToken(token); 
            const res = await this.repository.getData(token);
            if (res !== null && res !== undefined) { 
                return {
                    statusCode: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message: {
                            pan: res?.card_number
                        } as Card
                    }),
                };
            } else {
                return {
                    statusCode: 204,
                    headers: {
                        "Content-Type": "application/json",
                    }
                };
            }
        } catch (error: any) {
            throw this.exceptions.getException(400, error)
        }
    }

    validatePrimaryKey(authorization: string) {
        try {
            this.util.validatePk(authorization);
        } catch (error: any) {
            throw this.exceptions.getException(400, error)
        }
        
    }
}