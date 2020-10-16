import { ExpressionNode, SyntaxType } from "../SyntaxTree";

export class NumberLiteral extends ExpressionNode {
  public readonly value: number;

  constructor(value: number) {
    super(SyntaxType.NumberLiteral);

    this.value = value;
  }
}
