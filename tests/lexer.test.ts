import { lex } from "../lib/Lexer";
import { TokenFactory, Token } from "../lib/LexerToken";

describe("The lexer", () => {
    it("can parse numbers", () => {
        expect(lex("123")).toEqual([
            TokenFactory.NumberLiteral(123)
        ]);
    });

    it("can parse simple math operators", () => {
        expect(lex("+")).toEqual([
            TokenFactory.Plus()
        ]);

        expect(lex("-")).toEqual([
            TokenFactory.Minus()
        ]);

        expect(lex("*")).toEqual([
            TokenFactory.Star()
        ]);

        expect(lex("/")).toEqual([
            TokenFactory.Slash()
        ]);
    });

    it("can parse numbers in combination with operators", () => {
        expect(lex("123 + 987")).toEqual([
            TokenFactory.NumberLiteral(123),
            TokenFactory.Plus(),
            TokenFactory.NumberLiteral(987),
        ])
    });

    it("can handle whitespace inbetween tokens", () => {
        expect(lex("123+987         /654")).toEqual([
            TokenFactory.NumberLiteral(123),
            TokenFactory.Plus(),
            TokenFactory.NumberLiteral(987),
            TokenFactory.Slash(),
            TokenFactory.NumberLiteral(654),
        ])
    });
});