export enum TokenType {
    NumberLiteral = "T_NumberLiteral",
    Plus = "T_PLUS",
    Minus = "T_MINUS",
    Star = "T_STAR",
    Slash = "T_SLASH",
}

export class TokenFactory {
    public static NumberLiteral(value: number) {
        return Token.create(TokenType.NumberLiteral, value);
    }

    public static Plus() {
        return Token.create(TokenType.Plus, null);
    }

    public static Minus() {
        return Token.create(TokenType.Minus, null);
    }

    public static Star() {
        return Token.create(TokenType.Star, null);
    }

    public static Slash() {
        return Token.create(TokenType.Slash, null);
    }
}

export class Token {
    public type: TokenType;
    public value: any;

    constructor(type: TokenType, value: any) {
        this.type = type;
        this.value = value;
    }

    static create(type: TokenType, value: any) {
        return new Token(type, value);
    }
}
