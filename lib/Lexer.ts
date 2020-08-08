import { Token, TokenFactory } from "./LexerToken";

import { combineMatchers, createRegexMatcher } from "./LexerMatchers";

export function lex(source: string) {
  let tokens = [];
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
) => [number, Token[]] | undefined)[] = [
  // Whitespace
  (source, cursor, tokens) => {
    if (source[cursor].match(/\s/)) {
      // For now we just ignore whitespace.
      return [cursor + 1, tokens];
    }
  },
  // Number Literals
  (source, cursor, tokens) => {
    const matches = source.substr(cursor).match(/^\d+/);

    if (matches && matches.length === 1) {
      const num = parseInt(matches[0], 10);

      tokens.push(TokenFactory.NumberLiteral(num));

      return [cursor + num.toString().length, tokens];
    }
  },
  // String Literals
  (source, cursor, tokens) => {
    function pushString(content): [number, Token[]] {
      tokens.push(TokenFactory.StringLiteral(content));
      return [cursor + content.length, tokens];
    }

    const doubleQuotes = source.substr(cursor).match(/"(.*)"/);

    if (doubleQuotes && doubleQuotes.length === 2) {
      return pushString(doubleQuotes[0]);
    }

    const singleQuotes = source.substr(cursor).match(/'(.*)'/);

    if (singleQuotes && singleQuotes.length === 2) {
      return pushString(singleQuotes[0]);
    }
  },
  // Binary Math Operators
  (source, cursor, tokens) => {
    switch (source[cursor]) {
      case "+":
        tokens.push(TokenFactory.Plus());
        return [cursor + 1, tokens];
      case "-":
        tokens.push(TokenFactory.Minus());
        return [cursor + 1, tokens];
      case "*":
        tokens.push(TokenFactory.Star());
        return [cursor + 1, tokens];
      case "/":
        tokens.push(TokenFactory.Slash());
        return [cursor + 1, tokens];
    }
  },
  // Brackets
  (source, cursor, tokens) => {
    switch (source[cursor]) {
      case "(":
        tokens.push(TokenFactory.OpenRoundBracket());
        return [cursor + 1, tokens];
      case ")":
        tokens.push(TokenFactory.CloseRoundBracket());
        return [cursor + 1, tokens];
      case "{":
        tokens.push(TokenFactory.OpenCurlyBracket());
        return [cursor + 1, tokens];
      case "}":
        tokens.push(TokenFactory.CloseCurlyBracket());
        return [cursor + 1, tokens];
      case "[":
        tokens.push(TokenFactory.OpenSquareBracket());
        return [cursor + 1, tokens];
      case "]":
        tokens.push(TokenFactory.CloseSquareBracket());
        return [cursor + 1, tokens];
    }
  },
  // Punctuation
  (source, cursor, tokens) => {
    switch (source[cursor]) {
      case ".":
        tokens.push(TokenFactory.Dot());
        return [cursor + 1, tokens];
      case ",":
        tokens.push(TokenFactory.Comma());
        return [cursor + 1, tokens];
      case ";":
        tokens.push(TokenFactory.Semicolon());
        return [cursor + 1, tokens];
      case ":":
        tokens.push(TokenFactory.Colon());
        return [cursor + 1, tokens];
    }
  },
  // Keywords
  (source, cursor, tokens) => {
    return combineMatchers(source, cursor, tokens, [
      createRegexMatcher(/if/, () => {
        return [2, TokenFactory.If()];
      }),
      createRegexMatcher(/do/, () => {
        return [2, TokenFactory.Do()];
      }),
      createRegexMatcher(/for/, () => {
        return [3, TokenFactory.For()];
      }),
      createRegexMatcher(/while/, () => {
        return [5, TokenFactory.While()];
      }),
      createRegexMatcher(/return/, () => {
        return [6, TokenFactory.Return()];
      }),
      createRegexMatcher(/function/, () => {
        return [8, TokenFactory.Function()];
      }),
    ]);
  },
];
