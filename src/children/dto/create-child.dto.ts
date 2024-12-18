import { IsBoolean, IsString } from "class-validator";

export class CreateChildDto {
    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsBoolean()
    wasGood: boolean;

    @IsString()
    wantedGame?: string;
}
