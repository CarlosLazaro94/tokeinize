export class CustomException extends Error {
    code: string;
    description: string;
    exceptionDetails: { description: string }[];

    constructor(code: string, description: string, errors: string[]) {
        super(description);
        this.name = "CustomException";
        this.code = code;
        this.description = description;
        this.exceptionDetails = errors.map((error) => ({ description: error }));
    }
}