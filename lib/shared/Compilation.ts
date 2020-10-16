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
