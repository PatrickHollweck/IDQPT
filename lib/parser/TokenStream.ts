import { Token } from "../lexer/LexerToken";

export class TokenStream {
  private tokenSource: Token[];
  private cursor: number;

  constructor(tokenSource: Token[]) {
    this.tokenSource = tokenSource;
    this.cursor = 0;
  }

  public canAdvance() {
    return this.cursor < this.tokenSource.length - 1;
  }

  public canRetreat() {
    return this.cursor > 0;
  }

  public reset() {
    this.cursor = 0;
  }

  public current() {
    return this.tokenSource[this.cursor];
  }

  public advance() {
    if (!this.canAdvance()) {
      throw new Error("Tried to advance past the token source (EOF)");
    }

    this.cursor++;
    return this.current();
  }

  public retreat() {
    if (!this.canRetreat()) {
      throw new Error("Cannot retreat further than the first token! (EOF)");
    }

    this.cursor--;
    return this.current();
  }

  public lookahead() {
    const next = this.advance();
    this.retreat();

    return next;
  }

  public lookback() {
    const previous = this.retreat();
    this.advance();

    return previous;
  }
}
