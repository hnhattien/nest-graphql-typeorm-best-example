import { CustomScalar } from "@nestjs/graphql";
import { GraphQLScalarValueParser, GraphQLScalarSerializer, GraphQLScalarLiteralParser, ValueNode, Kind } from "graphql";

export class DateScalar implements CustomScalar<number, Date> {
    description?: string = "Date custom scalar";
    parseValue(value: number) : Date {
        return new Date(value)
    };
    serialize(value: Date): number {
        return value.getTime();
    };
    parseLiteral(ast: ValueNode) {
        if (ast.kind === Kind.INT) {
            return new Date(ast.value)
        }
        return null;
    };
    
}