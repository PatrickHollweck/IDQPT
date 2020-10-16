import { SyntaxFactory } from "../lib/parser/SyntaxFactory";
import { Compilation } from "../lib/shared/Compilation";
import { SourceCompilationUnit } from "../lib/shared/CompilationUnit";

function parse(source: string) {
  const compilation = new Compilation({});
  const unit = new SourceCompilationUnit(compilation, source);

  unit.lex();

  return unit.parse();
}

describe("The parser", () => {
  it("works", () => {
    expect(parse("1+1")).toEqual(
      SyntaxFactory.Program(
        SyntaxFactory.BinaryOperator(
          SyntaxFactory.NumberLiteral(1),
          SyntaxFactory.PlusOperator(),
          SyntaxFactory.NumberLiteral(1)
        )
      )
    );
  });
});
