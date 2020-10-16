import { Compilation, CompilationOptions } from "../lib/shared/Compilation";

import { TokenFactory } from "../lib/lexer/LexerToken";
import { TokenLocation } from "../lib/lexer/SourceLocation";
import { SourceCompilationUnit } from "../lib/shared/CompilationUnit";

function lex(source: string, options: CompilationOptions = {}) {
  const compilation = new Compilation({
    ignoreWhitespace: true,
    recordSourceLocation: false,
    ...options,
  });

  return new SourceCompilationUnit(compilation, source).lex();
}

function lexLocation(source: string, options: CompilationOptions = {}) {
  return lex(source, {
    recordSourceLocation: true,
    ...options,
  });
}

describe("The lexer", () => {
  it("can tokenize numbers", () => {
    expect(lex("123")).toEqual([TokenFactory.NumberLiteral(123)]);
  });

  it("can tokenize binary operators", () => {
    expect(lex("+")).toEqual([TokenFactory.Plus()]);
    expect(lex("-")).toEqual([TokenFactory.Minus()]);
    expect(lex("*")).toEqual([TokenFactory.Star()]);
    expect(lex("/")).toEqual([TokenFactory.Slash()]);
    expect(lex("=")).toEqual([TokenFactory.Equals()]);
  });

  it("can tokenize numbers in combination with operators", () => {
    expect(lex("123 + 987")).toEqual([
      TokenFactory.NumberLiteral(123),
      TokenFactory.Plus(),
      TokenFactory.NumberLiteral(987),
    ]);
  });

  it("can handle whitespace inbetween tokens", () => {
    expect(lex("123+987         /654")).toEqual([
      TokenFactory.NumberLiteral(123),
      TokenFactory.Plus(),
      TokenFactory.NumberLiteral(987),
      TokenFactory.Slash(),
      TokenFactory.NumberLiteral(654),
    ]);
  });

  it("can tokenize various bracket types", () => {
    expect(lex("(")).toEqual([TokenFactory.OpenRoundBracket()]);
    expect(lex(")")).toEqual([TokenFactory.CloseRoundBracket()]);
    expect(lex("{")).toEqual([TokenFactory.OpenCurlyBracket()]);
    expect(lex("}")).toEqual([TokenFactory.CloseCurlyBracket()]);
    expect(lex("[")).toEqual([TokenFactory.OpenSquareBracket()]);
    expect(lex("]")).toEqual([TokenFactory.CloseSquareBracket()]);
  });

  it("can tokenize brackets in conjunction with other tokens", () => {
    expect(lex("(123 + 321)")).toEqual([
      TokenFactory.OpenRoundBracket(),
      TokenFactory.NumberLiteral(123),
      TokenFactory.Plus(),
      TokenFactory.NumberLiteral(321),
      TokenFactory.CloseRoundBracket(),
    ]);

    expect(lex("(123+ 321   )*7")).toEqual([
      TokenFactory.OpenRoundBracket(),
      TokenFactory.NumberLiteral(123),
      TokenFactory.Plus(),
      TokenFactory.NumberLiteral(321),
      TokenFactory.CloseRoundBracket(),
      TokenFactory.Star(),
      TokenFactory.NumberLiteral(7),
    ]);
  });

  it("can tokenize punctuation", () => {
    expect(lex(",")).toEqual([TokenFactory.Comma()]);
    expect(lex(";")).toEqual([TokenFactory.Semicolon()]);
    expect(lex(".")).toEqual([TokenFactory.Dot()]);
    expect(lex(",")).toEqual([TokenFactory.Comma()]);
  });

  it("can tokenize string literals", () => {
    expect(lex('""')).toEqual([TokenFactory.StringLiteral('""')]);
    expect(lex("''")).toEqual([TokenFactory.StringLiteral("''")]);

    // Escape characters should be preserved.
    expect(lex('"\\n"')).toEqual([TokenFactory.StringLiteral(`"\\n"`)]);
    expect(lex('"\\u2665"')).toEqual([TokenFactory.StringLiteral(`"\\u2665"`)]);

    expect(lex('"Hello World"')).toEqual([
      TokenFactory.StringLiteral('"Hello World"'),
    ]);

    expect(lex('"123()  []"')).toEqual([
      TokenFactory.StringLiteral('"123()  []"'),
    ]);

    expect(lex("'123()  []'")).toEqual([
      TokenFactory.StringLiteral("'123()  []'"),
    ]);
  });

  it("can tokenize boolean literals", () => {
    expect(lex("true")).toEqual([TokenFactory.BooleanLiteral(true)]);
    expect(lex("false")).toEqual([TokenFactory.BooleanLiteral(false)]);
  });

  it("can tokenize keywords", () => {
    expect(lex("if()")).toEqual([
      TokenFactory.If(),
      TokenFactory.OpenRoundBracket(),
      TokenFactory.CloseRoundBracket(),
    ]);

    // Variables
    expect(lex("var")).toEqual([TokenFactory.Var()]);

    // Statement keywords
    expect(lex("do")).toEqual([TokenFactory.Do()]);
    expect(lex("for")).toEqual([TokenFactory.For()]);
    expect(lex("while")).toEqual([TokenFactory.While()]);
    expect(lex("return")).toEqual([TokenFactory.Return()]);
    expect(lex("function")).toEqual([TokenFactory.Function()]);
  });

  it("can parse identifier", () => {
    expect(lex("var hello;")).toEqual([
      TokenFactory.Var(),
      TokenFactory.Identifier("hello"),
      TokenFactory.Semicolon(),
    ]);

    expect(lex("var hello=0;")).toEqual([
      TokenFactory.Var(),
      TokenFactory.Identifier("hello"),
      TokenFactory.Equals(),
      TokenFactory.NumberLiteral(0),
      TokenFactory.Semicolon(),
    ]);

    expect(lex("function sayHello(a) {}")).toEqual([
      TokenFactory.Function(),
      TokenFactory.Identifier("sayHello"),
      TokenFactory.OpenRoundBracket(),
      TokenFactory.Identifier("a"),
      TokenFactory.CloseRoundBracket(),
      TokenFactory.OpenCurlyBracket(),
      TokenFactory.CloseCurlyBracket(),
    ]);
  });

  describe("Source location data collection", () => {
    it("should record token location", () => {
      expect(lexLocation("123")).toEqual([
        TokenFactory.NumberLiteral(123).setLocation(
          TokenLocation.create(0, 0, 0, 3)
        ),
      ]);

      expect(lexLocation("\n123\n")).toEqual([
        TokenFactory.NumberLiteral(123).setLocation(
          TokenLocation.create(1, 0, 1, 3)
        ),
      ]);

      expect(lexLocation("123\n+\n456")).toEqual([
        TokenFactory.NumberLiteral(123).setLocation(
          TokenLocation.create(0, 0, 0, 3)
        ),
        TokenFactory.Plus().setLocation(TokenLocation.create(1, 0, 1, 1)),
        TokenFactory.NumberLiteral(456).setLocation(
          TokenLocation.create(2, 0, 2, 3)
        ),
      ]);
    });
  });
});
