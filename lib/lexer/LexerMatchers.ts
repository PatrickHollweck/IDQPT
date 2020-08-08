import { Token } from "./LexerToken";

export type LexerMatcher = (
  source: string,
  cursor: number,
  tokens: Token[]
) => [number, Token[]] | null;

export const combineMatchers = (
  source: string,
  cursor: number,
  tokens: Token[],
  lexers: LexerMatcher[]
) => {
  for (const lexer of lexers) {
    const token = lexer(source, cursor, tokens);

    if (token == null) {
      continue;
    }

    return token;
  }

  return null;
};

export const createExactMatcher = (
  match: string,
  toToken: () => Token
): LexerMatcher => {
  return (source, cursor, tokens) => {
    if (source.substr(cursor, match.length) === match) {
      tokens.push(toToken());

      return [cursor + match.length, tokens];
    }

    return null;
  };
};

export const createRegexMatcher = (
  regex: RegExp,
  toToken: (match: RegExpMatchArray) => [number, Token]
): LexerMatcher => {
  return (source, cursor, tokens) => {
    const current = source.substr(cursor);

    if (regex.test(current)) {
      const matches = current.match(regex);

      if (matches == null) {
        return null;
      }

      const [length, token] = toToken(matches);

      tokens.push(token);

      return [cursor + length, tokens];
    }

    return null;
  };
};
