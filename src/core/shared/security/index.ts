import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
@Injectable()
export class SecurityService {
    private saltOrRounds: number = 10;
    hash(input: string) {
        return bcrypt.hash(input, this.saltOrRounds);
    }

    compare(value: string, hashedValue: string) {
        return bcrypt.compareSync(value, hashedValue)
    }
}