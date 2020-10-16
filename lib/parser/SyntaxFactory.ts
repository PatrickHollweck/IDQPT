import { Token, TokenType } from "../lexer/LexerToken";

import {
  SyntaxType,
  SyntaxTreeNode,
  ExpressionNode,
  PunctuationNode,
  OperatorNode,
  SyntaxNodeList,
} from "./SyntaxTree";

import { BinaryOperatorNode } from "./syntax/BinaryOperator";
import { NumberLiteral } from "./syntax/NumberLiteral";

export class SyntaxFactory {
  static tokenToOperator(token: Token): PunctuationNode {
    switch (token.type) {
      case TokenType.Plus:
        return new OperatorNode(TokenType.Plus);
      case TokenType.Minus:
        return new OperatorNode(TokenType.Minus);
    }

    throw new Error("Could not convert node to punctuation!");
  }

  static Program(...nodes: SyntaxTreeNode[]) {
    return new SyntaxNodeList(SyntaxType.Program, nodes);
  }

  static NumberLiteral(value: number) {
    return new NumberLiteral(value);
  }

  static PlusOperator() {
    return new OperatorNode(TokenType.Plus);
  }

  static BinaryOperator(
    left: ExpressionNode,
    operator: PunctuationNode,
    right: ExpressionNode
  ) {
    return new BinaryOperatorNode(left, operator, right);
  }
}
