import { Compilation, CompilationOptions } from "./shared/Compilation";

import {
  CompilationUnit,
  SourceCompilationUnit,
} from "./shared/CompilationUnit";

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

  compile() {
    for (const unit of this.units) {
      unit.compile();
    }
  }
}
