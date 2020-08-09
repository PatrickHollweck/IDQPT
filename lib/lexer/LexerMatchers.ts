import { Token } from "./LexerToken";

export type LexerMatcher = (
  source: string,
  cursor: number
) => [number, Token] | null;

export const combineMatchers = (
  source: string,
  cursor: number,
  lexers: LexerMatcher[]
) => {
  for (const lexer of lexers) {
    const token = lexer(source, cursor);

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
  return (source, cursor) => {
    if (source.substr(cursor, match.length) === match) {
      return [cursor + match.length, toToken()];
    }

    return null;
  };
};

export const createRegexMatcher = (
  regex: RegExp,
  toToken: (match: RegExpMatchArray) => [number, Token]
): LexerMatcher => {
  return (source, cursor) => {
    const current = source.substr(cursor);

    if (regex.test(current)) {
      const matches = current.match(regex);

      if (matches == null) {
        return null;
      }

      const [length, token] = toToken(matches);

      return [cursor + length, token];
    }

    return null;
  };
};
