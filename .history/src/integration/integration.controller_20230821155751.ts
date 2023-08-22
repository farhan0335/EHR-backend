import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { LocalAuthGuard } from 'src/auth/auth.guard';

@Controller('integration')
export class IntegrationController {
    constructor(private readonly integrationService :  IntegrationService ){}
    @UseGuards()
    @Get('getblock/:blocknumber')
    async getBlockNumber(@Param('BlockNumber') blockNumber : number){
        return this.integrationService.getBlockByNumber(blockNumber)

    }
}
