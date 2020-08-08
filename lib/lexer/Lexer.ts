import { Token, TokenFactory } from "./LexerToken";

import {
  combineMatchers,
  createRegexMatcher,
  createExactMatcher,
} from "./LexerMatchers";

export function lex(source: string) {
  let tokens = new Array<Token>();
  let cursor = 0;

  const lexers = LexerDefinitions;

  while (true) {
    let couldMatch = false;

    for (const lexer of lexers) {
      const result = lexer(source, cursor, tokens);

      if (result == null) {
        continue;
      }

      [cursor, tokens] = result;
      couldMatch = true;
      break;
    }

    if (!couldMatch) {
      throw new Error(
        `Could not lex token "${source[cursor]}" (Position: ${cursor})`
      );
    }

    if (cursor >= source.length) {
      break;
    }
  }

  return tokens;
}

const LexerDefinitions: ((
  source: string,
  cursor: number,
  tokens: Token[]
) => [number, Token[]] | null)[] = [
  // Whitespace
  (source, cursor, tokens) => {
    if (source[cursor].match(/\s/)) {
      // For now we just ignore whitespace.
      return [cursor + 1, tokens];
    }

    return null;
  },
  // Literals
  (source, cursor, tokens) => {
    return combineMatchers(source, cursor, tokens, [
      createRegexMatcher(/^\d+/, (matches) => {
        const num = parseInt(matches[0], 10);

        return [num.toString().length, TokenFactory.NumberLiteral(num)];
      }),
      // String literals
      createRegexMatcher(/"(.*)"/, (matches) => {
        return [matches[0].length, TokenFactory.StringLiteral(matches[0])];
      }),
      createRegexMatcher(/'(.*)'/, (matches) => {
        return [matches[0].length, TokenFactory.StringLiteral(matches[0])];
      }),
    ]);
  },
  // Exact match tokens
  (source, cursor, tokens) => {
    return combineMatchers(source, cursor, tokens, [
      // Binary Math Operators
      createExactMatcher("+", () => TokenFactory.Plus()),
      createExactMatcher("-", () => TokenFactory.Minus()),
      createExactMatcher("*", () => TokenFactory.Star()),
      createExactMatcher("/", () => TokenFactory.Slash()),
      // Brackets
      createExactMatcher("(", () => TokenFactory.OpenRoundBracket()),
      createExactMatcher(")", () => TokenFactory.CloseRoundBracket()),
      createExactMatcher("{", () => TokenFactory.OpenCurlyBracket()),
      createExactMatcher("}", () => TokenFactory.CloseCurlyBracket()),
      createExactMatcher("[", () => TokenFactory.OpenSquareBracket()),
      createExactMatcher("]", () => TokenFactory.CloseSquareBracket()),
      // Punctuation
      createExactMatcher(".", () => TokenFactory.Dot()),
      createExactMatcher(",", () => TokenFactory.Comma()),
      createExactMatcher(":", () => TokenFactory.Colon()),
      createExactMatcher(";", () => TokenFactory.Semicolon()),
      // Keywords
      createExactMatcher("if", () => TokenFactory.If()),
      createExactMatcher("do", () => TokenFactory.Do()),
      createExactMatcher("for", () => TokenFactory.For()),
      createExactMatcher("while", () => TokenFactory.While()),
      createExactMatcher("return", () => TokenFactory.Return()),
      createExactMatcher("function", () => TokenFactory.Function()),
    ]);
  },
];
