import { Token, TokenType } from "../lexer/LexerToken";
import { TokenStream } from "./TokenStream";

import { SyntaxFactory } from "./SyntaxFactory";

function isOperator(token: Token) {
  return (
    token.type === TokenType.Plus ||
    token.type === TokenType.Star ||
    token.type === TokenType.Minus ||
    token.type === TokenType.Slash
  );
}

function isNumberLiteral(token: Token) {
  return token.type === TokenType.NumberLiteral;
}

export const parse = (tokens: Token[]) => {
  const astRoot = SyntaxFactory.Program();
  const stream = new TokenStream(tokens);

  while (stream.canAdvance()) {
    const token = stream.current();

    // Binary operator
    if (isNumberLiteral(token)) {
      const left = SyntaxFactory.NumberLiteral(token.value);

      if (isOperator(stream.lookahead())) {
        const operator = SyntaxFactory.tokenToOperator(stream.advance());

        if (isNumberLiteral(stream.lookahead())) {
          const right = SyntaxFactory.NumberLiteral(stream.advance().value);

          const binaryOperator = SyntaxFactory.BinaryOperator(
            left,
            operator,
            right
          );

          astRoot.add(binaryOperator);
        }
      }
    }
  }

  return astRoot;
};
