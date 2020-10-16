import { Compilation } from "./Compilation";
import { Token } from "../lexer/LexerToken";

import { lex } from "../lexer/Lexer";
import { parse } from "../parser/Parser";

export abstract class CompilationUnit {
  public readonly compilation: Compilation;

  private tokenCache: Token[] | null;
  private ast: any | null;

  constructor(compilation: Compilation) {
    this.compilation = compilation;

    this.tokenCache = null;
    this.ast = null;
  }

  public abstract getSource(): string;
  public abstract getSourceLocation(): string;

  lex() {
    this.tokenCache = lex(this);

    return this.tokenCache;
  }

  parse() {
    this.ast = parse(this.tokenCache!);

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
