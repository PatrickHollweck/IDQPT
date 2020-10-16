import { ExpressionNode, OperatorNode, SyntaxType } from "../SyntaxTree";

export class BinaryOperatorNode extends ExpressionNode {
  public readonly left: ExpressionNode;
  public readonly operator: OperatorNode;
  public readonly right: ExpressionNode;

  constructor(
    left: ExpressionNode,
    operator: OperatorNode,
    right: ExpressionNode
  ) {
    super(SyntaxType.BinaryOperator);

    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}
