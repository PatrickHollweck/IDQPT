import { Token } from "../lexer/LexerToken";
import { Compilation } from "./Compilation";
import { SyntaxTreeNode } from "../parser/SyntaxTree";

import { lex } from "../lexer/Lexer";
import { parse } from "../parser/Parser";

export abstract class CompilationUnit {
  public readonly compilation: Compilation;

  private tokens: Token[] | null;
  private ast: SyntaxTreeNode | null;

  constructor(compilation: Compilation) {
    this.compilation = compilation;

    this.tokens = null;
    this.ast = null;
  }

  public abstract getSource(): string;
  public abstract getSourceLocation(): string;

  compile() {
    this.lex();
    this.parse();
  }

  lex() {
    this.tokens = lex(this);

    return this.tokens;
  }

  parse() {
    this.ast = parse(this.tokens!);

    return this.ast;
  }
}

export class SourceCompilationUnit extends CompilationUnit {
  protected source: string;

  constructor(compilation: Compilation, source: string) {
    super(compilation);

    this.source = source;
  }

  public getSource(): string {
    return this.source;
  }

  public getSourceLocation(): string {
    return "<internal>";
  }
}

export class FileCompilationUnit extends CompilationUnit {
  protected sourceFilePath: string;

  constructor(compilation: Compilation, sourceFilePath: string) {
    super(compilation);

    this.sourceFilePath = sourceFilePath;
  }

  public getSource(): string {
    throw new Error("Method not implemented.");
  }

  public getSourceLocation(): string {
    throw new Error("Method not implemented.");
  }
}
