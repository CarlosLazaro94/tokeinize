import { CustomException } from "./CustomException";

export class UtilsException {
    getException(code: number, error: any){
        if (error instanceof CustomException) {
            return {
                statusCode: code,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: error.code,
                    message: error.description,
                    details: error.exceptionDetails,
                }),
            };
        } else {
            return {
                statusCode: 500,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: "Error interno del servidor",
                }),
            };
        }
    }
}