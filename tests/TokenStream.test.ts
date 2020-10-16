import { TokenStream } from "../lib/parser/TokenStream";
import { Token, TokenFactory } from "../lib/lexer/LexerToken";

const createStream = (...tokens: Token[]) => {
  return new TokenStream(tokens);
};

describe("The TokenStream", () => {
  it("should advance", () => {
    const stream = createStream(
      TokenFactory.NumberLiteral(123),
      TokenFactory.Plus(),
      TokenFactory.NumberLiteral(456)
    );

    expect(stream.current()).toEqual(TokenFactory.NumberLiteral(123));
    expect(stream.advance()).toEqual(TokenFactory.Plus());
    expect(stream.advance()).toEqual(TokenFactory.NumberLiteral(456));

    expect(() => stream.advance()).toThrowError();
  });

  it("should reset", () => {
    const stream = createStream(
      TokenFactory.NumberLiteral(123),
      TokenFactory.Plus(),
      TokenFactory.NumberLiteral(456)
    );

    stream.advance();
    stream.advance();
    stream.reset();

    expect(stream.current()).toEqual(TokenFactory.NumberLiteral(123));
  });

  it("should advance", () => {
    const stream = createStream(
      TokenFactory.NumberLiteral(123),
      TokenFactory.Plus(),
      TokenFactory.NumberLiteral(456)
    );

    stream.advance();
    expect(stream.retreat()).toEqual(TokenFactory.NumberLiteral(123));

    stream.advance();
    stream.advance();
    expect(stream.retreat()).toEqual(TokenFactory.Plus());
    stream.reset();

    expect(() => stream.retreat()).toThrowError();
  });

  it("should lookahead", () => {
    const stream = createStream(
      TokenFactory.NumberLiteral(123),
      TokenFactory.Plus(),
      TokenFactory.NumberLiteral(456)
    );

    expect(stream.lookahead()).toEqual(TokenFactory.Plus());
    expect(stream.current()).toEqual(TokenFactory.NumberLiteral(123));
  });

  it("should lookback", () => {
    const stream = createStream(
      TokenFactory.NumberLiteral(123),
      TokenFactory.Plus(),
      TokenFactory.NumberLiteral(456)
    );

    stream.advance();
    expect(stream.lookback()).toEqual(TokenFactory.NumberLiteral(123));
    expect(stream.current()).toEqual(TokenFactory.Plus());
  });
});
