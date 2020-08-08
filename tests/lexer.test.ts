import { lex } from "../lib/Lexer";
import { TokenFactory, Token } from "../lib/LexerToken";

describe("The lexer", () => {
  it("can tokenize numbers", () => {
    expect(lex("123")).toEqual([TokenFactory.NumberLiteral(123)]);
  });

  it("can tokenize simple math operators", () => {
    expect(lex("+")).toEqual([TokenFactory.Plus()]);

    expect(lex("-")).toEqual([TokenFactory.Minus()]);

    expect(lex("*")).toEqual([TokenFactory.Star()]);

    expect(lex("/")).toEqual([TokenFactory.Slash()]);
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

  it("can tokenize keywords", () => {
    expect(lex("if()")).toEqual([
      TokenFactory.If(),
      TokenFactory.OpenRoundBracket(),
      TokenFactory.CloseRoundBracket(),
    ]);

    expect(lex("do")).toEqual([TokenFactory.Do()]);
    expect(lex("for")).toEqual([TokenFactory.For()]);
    expect(lex("while")).toEqual([TokenFactory.While()]);
    expect(lex("return")).toEqual([TokenFactory.Return()]);
    expect(lex("function")).toEqual([TokenFactory.Function()]);
  });
});
