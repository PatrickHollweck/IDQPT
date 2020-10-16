import { CompilationUnit } from "../shared/CompilationUnit";

import { Token, TokenFactory, TokenType } from "./LexerToken";
import { TokenLocation, SourceLocation } from "./SourceLocation";

import {
  combineMatchers,
  createRegexMatcher,
  createExactMatcher,
} from "./LexerMatchers";

export function lex(unit: CompilationUnit) {
  const source = unit.getSource();

  let tokens = new Array<Token>();
  let cursor = 0;

  while (true) {
    let couldMatch = false;

    for (const lexer of LexerDefinitions) {
      const result = lexer(source, cursor);

      if (result == null) {
        continue;
      }

      const [nextCursor, token] = result;

      if (unit.compilation.options.recordSourceLocation === true) {
        token.location = new TokenLocation(
          SourceLocation.fromSourceIndex(source, cursor),
          SourceLocation.fromSourceIndex(source, nextCursor)
        );
      }

      cursor = nextCursor;

      if (unit.compilation.options.ignoreWhitespace) {
        if (token.type === TokenType.Whitespace) {
          couldMatch = true;
          break;
        }
      }

      tokens.push(token);

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
  cursor: number
) => [number, Token] | null)[] = [
  // Whitespace
  (source, cursor) => {
    return combineMatchers(source, cursor, [
      createRegexMatcher(/^\s+/, (matches) => [
        matches[0].length,
        TokenFactory.Whitespace(matches[0]),
      ]),
    ]);
  },
  // Literals
  (source, cursor) => {
    return combineMatchers(source, cursor, [
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
      createExactMatcher("true", () => TokenFactory.BooleanLiteral(true)),
      createExactMatcher("false", () => TokenFactory.BooleanLiteral(false)),
    ]);
  },
  // Exact match tokens
  (source, cursor) => {
    return combineMatchers(source, cursor, [
      // Binary Operators
      createExactMatcher("=", () => TokenFactory.Equals()),
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
      // Variable keywords
      createExactMatcher("var", () => TokenFactory.Var()),
      // Statement keywords
      createExactMatcher("if", () => TokenFactory.If()),
      createExactMatcher("do", () => TokenFactory.Do()),
      createExactMatcher("for", () => TokenFactory.For()),
      createExactMatcher("while", () => TokenFactory.While()),
      createExactMatcher("return", () => TokenFactory.Return()),
      createExactMatcher("function", () => TokenFactory.Function()),
    ]);
  },
  // Identifier
  (source, cursor) => {
    return combineMatchers(source, cursor, [
      createRegexMatcher(/^\w+/, (matches) => [
        matches[0].length,
        TokenFactory.Identifier(matches[0]),
      ]),
    ]);
  },
];
