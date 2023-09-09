import { Token } from 'src/model/token';
import {
    CARD_NUMBER_REGEX, 
    EMAIL_REGEX, 
    CVV_REGEX, 
    EXP_MONTH_REGEX, 
    EXP_YEAR_REGEX,
    TOKEN_REGEX
} from './constant'
import { CustomException } from './exception/CustomException';

export class Utils {

    private errors: string[] = [];

    validation(request: Token): void {
        this.validationEmail(request.email)
        this.validationCardNumber(request.card_number)
        this.validationCvv(request.cvv)
        this.validationExpYear(request.expiration_year)
        this.validationExpMonth(request.expiration_month)
        if(this.errors.length > 0) {
            throw new CustomException("QU0001_001","REQUEST INVALID",this.errors)
        }
    }

    private validationEmail(email: string): void {
        const emailRegex = EMAIL_REGEX;
        emailRegex.test(email) || this.errors.push("email failed format");
    }

    private validationCardNumber(cardNumber: number): void {
        const cardNumberRegex = CARD_NUMBER_REGEX
        cardNumberRegex.test(cardNumber.toString()) || this.errors.push("card number failed format");
    }

    private validationCvv(cvv: number): void {
        const cvvRegex = CVV_REGEX
        cvvRegex.test(cvv.toString()) || this.errors.push("cvv failed format");
    }

    private validationExpYear(yearExp: number):  void {
        const yearRegex = EXP_YEAR_REGEX
        yearRegex.test(yearExp.toString()) || this.errors.push("year failed format");
    }

    private validationExpMonth(monthExp: number):  void {
        const monthRegex = EXP_MONTH_REGEX
        monthRegex.test(monthExp.toString()) || this.errors.push("month failed format");
    }

    validatePk(primaryKey : string): void {
        if (!this.isValidPrimaryKey(primaryKey)) {
            throw new CustomException("QU0001_002","Pk invalid",["Error in primary key invalid"])
        }
    }

    validateToken(token: string){
        const tokenRegex = TOKEN_REGEX
        if(!tokenRegex.test(token)) {
            throw new CustomException("QU0001_004","REQUEST INVALID",["Token invalid"]);
        }
    }

    private isValidPrimaryKey(primaryKey: string | undefined): boolean {
        return primaryKey ===  'Bearer pk_test_0ae8dW2FpEAZlxlz';
    }

    generateToken() {
        const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let token = '';
        for (let i = 0; i < 16; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            token += characters.charAt(randomIndex);
        }
        return token;
    }
}