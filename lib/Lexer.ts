import { Token, TokenFactory } from "./LexerToken";

export function lex(source: string) {
    let tokens = [];
    let cursor = 0;

    const lexers = LexerDefinitions;
    
    while (true) {
        let couldMatch = false;

        for (const lexer of lexers) {
            const result = lexer(source, cursor, tokens);

            if (result == null) {
                continue;
            }

            [cursor, tokens] = result;
            couldMatch = true;
            break;
        }

        if (!couldMatch) {
            throw new Error(`Could not lex token "${source[cursor]}" (Position: ${cursor})`)
        }

        if (cursor >= source.length) {
            break;
        }
    }

    return tokens;
}

const LexerDefinitions:
    ((source: string, cursor: number, tokens: Token[]) => [number, Token[]] | undefined)[]
= [
    (source, cursor, tokens) => {
        if (source[cursor].match(/\s/)) {
            // For now we just ignore whitespace.
            return [cursor + 1, tokens];
        }
    },
    (source, cursor, tokens) => {
        const matches = source.substr(cursor).match(/^\d+/);

        if (matches && matches.length === 1) {
            const num = parseInt(matches[0], 10);

            tokens.push(
                TokenFactory.NumberLiteral(num)
            );

            return [cursor + num.toString().length, tokens];
        }
    },
    (source, cursor, tokens) => {
        switch (source[cursor]) {
            case "+":
                tokens.push(TokenFactory.Plus());
                return [cursor + 1, tokens];
            case "-":
                tokens.push(TokenFactory.Minus());
                return [cursor + 1, tokens];
            case "*":
                tokens.push(TokenFactory.Star());
                return [cursor + 1, tokens];
            case "/":
                tokens.push(TokenFactory.Slash());
                return [cursor + 1, tokens];
        }
    }
]