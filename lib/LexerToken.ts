export enum TokenType {
  // Literals
  NumberLiteral = "T_NumberLiteral",
  // Operators
  Plus = "T_PLUS",
  Minus = "T_MINUS",
  Star = "T_STAR",
  Slash = "T_SLASH",
  // Brackets
  OpenRoundBracket = "T_OPEN_ROUND_BRACKET",
  CloseRoundBracket = "T_CLOSE_ROUND_BRACKET",
  OpenCurlyBracket = "T_OPEN_CURLY_BRACKET",
  CloseCurlyBracket = "T_CLOSE_CURLY_BRACKET",
  OpenSquareBracket = "T_OPEN_SQUARE_BRACKET",
  CloseSquareBracket = "T_CLOSE_SQUARE_BRACKET",
  // Punctuation
  Dot = "T_DOT",
  Colon = "T_COLON",
  Comma = "T_COMMA",
  Semicolon = "T_SEMICOLON",
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

  public static OpenRoundBracket() {
    return Token.create(TokenType.OpenRoundBracket, null);
  }

  public static CloseRoundBracket() {
    return Token.create(TokenType.CloseRoundBracket, null);
  }

  public static OpenCurlyBracket() {
    return Token.create(TokenType.OpenCurlyBracket, null);
  }

  public static CloseCurlyBracket() {
    return Token.create(TokenType.CloseCurlyBracket, null);
  }

  public static OpenSquareBracket() {
    return Token.create(TokenType.OpenSquareBracket, null);
  }

  public static CloseSquareBracket() {
    return Token.create(TokenType.CloseSquareBracket, null);
  }

  public static Dot() {
    return Token.create(TokenType.Dot, null);
  }

  public static Comma() {
    return Token.create(TokenType.Comma, null);
  }

  public static Colon() {
    return Token.create(TokenType.Colon, null);
  }

  public static Semicolon() {
    return Token.create(TokenType.Semicolon, null);
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
