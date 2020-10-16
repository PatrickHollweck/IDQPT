import { TokenType } from "../lexer/LexerToken";

export enum SyntaxType {
  Program = "Program",
  Operator = "Operator",
  BinaryOperator = "BinaryOperator",
  NumberLiteral = "NumberLiteral",
}

export abstract class SyntaxTreeNode {
  public readonly type: SyntaxType;

  constructor(type: SyntaxType) {
    this.type = type;
  }
}

export class SyntaxNodeList extends SyntaxTreeNode {
  public children: SyntaxTreeNode[];

  constructor(type: SyntaxType, children: SyntaxTreeNode[]) {
    super(type);

    this.children = children;
  }

  public add(node: SyntaxTreeNode) {
    this.children.push(node);
  }
}

export abstract class StatementNode extends SyntaxTreeNode {}

export abstract class ExpressionNode extends SyntaxTreeNode {}

export abstract class PunctuationNode extends SyntaxTreeNode {
  public readonly value: TokenType;

  constructor(type: SyntaxType, value: TokenType) {
    super(type), (this.value = value);
  }
}

export class OperatorNode extends PunctuationNode {
  constructor(operator: TokenType) {
    super(SyntaxType.Operator, operator);
  }
}
