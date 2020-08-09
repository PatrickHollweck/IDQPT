import { lex } from "../lexer/Lexer";

export type CompilationOptions = {
  ignoreWhitespace?: boolean;
  recordSourceLocation?: boolean;
};

export class Compilation {
  public options: CompilationOptions;

  constructor(options: CompilationOptions) {
    this.options = options;
  }
}

export abstract class CompilationUnit {
  public readonly compilation: Compilation;

  constructor(compilation: Compilation) {
    this.compilation = compilation;
  }

  public abstract getSource(): string;
  public abstract getSourceLocation(): string;

  lex() {
    return lex(this);
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
