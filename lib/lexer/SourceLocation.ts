export class SourceLocation {
  public line: number;
  public column: number;

  constructor(line: number, column: number) {
    this.line = line;
    this.column = column;
  }

  /**
   * Maps a given index into a string to its line and column number
   *
   * @param source The source where the index originates from
   * @param index The index in the given source
   */
  static fromSourceIndex(source: string, index: number): SourceLocation {
    const lines = source.substr(0, index).split("\n");

    return new SourceLocation(lines.length - 1, lines[lines.length - 1].length);
  }
}

export class TokenLocation {
  public start: SourceLocation;
  public end: SourceLocation;

  constructor(start: SourceLocation, end: SourceLocation) {
    this.start = start;
    this.end = end;
  }

  static create(
    startLine: number,
    startColumn: number,
    endLine: number,
    endColumn: number
  ) {
    return new TokenLocation(
      new SourceLocation(startLine, startColumn),
      new SourceLocation(endLine, endColumn)
    );
  }
}
