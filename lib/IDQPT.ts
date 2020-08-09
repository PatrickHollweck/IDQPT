import {
  Compilation,
  CompilationOptions,
  CompilationUnit,
  SourceCompilationUnit,
} from "./shared/Compilation";

export class IDQPT {
  public compilation: Compilation;
  public units: CompilationUnit[];

  constructor(options: CompilationOptions) {
    this.units = [];
    this.compilation = new Compilation(options);
  }

  static fromString(source: string, options: CompilationOptions = {}) {
    const compiler = new IDQPT(options);

    compiler.units.push(
      new SourceCompilationUnit(compiler.compilation, source)
    );

    return compiler;
  }

  lex() {
    const tokens = [];

    // For now we just concat all files. This wont work in the long run obviously.
    for (const unit of this.units) {
      tokens.push(...unit.lex());
    }

    return tokens;
  }
}
