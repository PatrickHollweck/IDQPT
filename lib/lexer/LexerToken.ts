import { TokenLocation } from "./SourceLocation";

export enum TokenType {
  // Literals
  NumberLiteral = "T_NUMBER_LITERAL",
  StringLiteral = "T_STRING_LITERAL",
  BooleanLiteral = "T_BOOLEAN_LITERAL",
  // Whitespace
  Whitespace = "T_WHITESPACE",
  // Identifier
  Identifier = "T_IDENTIFIER",
  // Variable declarations
  Var = "T_VARIABLE_VAR",
  // Operators
  Equals = "T_EQUALS",
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
  // Statement Keywords
  If = "T_IF",
  Do = "T_DO",
  For = "T_FOR",
  While = "T_WHILE",
  Return = "T_RETURN",
  Function = "T_Function",
}

export class TokenFactory {
  public static NumberLiteral(value: number) {
    return new Token(TokenType.NumberLiteral, value);
  }

  public static StringLiteral(content: string) {
    return new Token(TokenType.StringLiteral, content);
  }

  public static Identifier(value: string) {
    return new Token(TokenType.Identifier, value);
  }

  public static Whitespace(text: string) {
    return new Token(TokenType.Whitespace, text);
  }

  public static BooleanLiteral(value: boolean) {
    return new Token(TokenType.BooleanLiteral, value);
  }

  public static Var() {
    return new Token(TokenType.Var, null);
  }

  public static Equals() {
    return new Token(TokenType.Equals, null);
  }

  public static Plus() {
    return new Token(TokenType.Plus, null);
  }

  public static Minus() {
    return new Token(TokenType.Minus, null);
  }

  public static Star() {
    return new Token(TokenType.Star, null);
  }

  public static Slash() {
    return new Token(TokenType.Slash, null);
  }

  public static OpenRoundBracket() {
    return new Token(TokenType.OpenRoundBracket, null);
  }

  public static CloseRoundBracket() {
    return new Token(TokenType.CloseRoundBracket, null);
  }

  public static OpenCurlyBracket() {
    return new Token(TokenType.OpenCurlyBracket, null);
  }

  public static CloseCurlyBracket() {
    return new Token(TokenType.CloseCurlyBracket, null);
  }

  public static OpenSquareBracket() {
    return new Token(TokenType.OpenSquareBracket, null);
  }

  public static CloseSquareBracket() {
    return new Token(TokenType.CloseSquareBracket, null);
  }

  public static Dot() {
    return new Token(TokenType.Dot, null);
  }

  public static Comma() {
    return new Token(TokenType.Comma, null);
  }

  public static Colon() {
    return new Token(TokenType.Colon, null);
  }

  public static Semicolon() {
    return new Token(TokenType.Semicolon, null);
  }

  public static If() {
    return new Token(TokenType.If, null);
  }

  public static Do() {
    return new Token(TokenType.Do, null);
  }

  public static For() {
    return new Token(TokenType.For, null);
  }

  public static While() {
    return new Token(TokenType.While, null);
  }

  public static Return() {
    return new Token(TokenType.Return, null);
  }

  public static Function() {
    return new Token(TokenType.Function, null);
  }
}

export class Token {
  public type: TokenType;
  public value: any;
  public location: TokenLocation | undefined;

  constructor(type: TokenType, value: any) {
    this.type = type;
    this.value = value;
  }

  setLocation(location: TokenLocation) {
    this.location = location;

    return this;
  }
}
