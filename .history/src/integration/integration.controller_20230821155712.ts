import { Controller, Get, Param } from '@nestjs/common';
import { IntegrationService } from './integration.service';

@Controller('integration')
export class IntegrationController {
    constructor(private readonly integrationService :  IntegrationService ){}
    @Use
    @Get('getblock/:blocknumber')
    async getBlockNumber(@Param('BlockNumber') blockNumber : number){
        return this.integrationService.getBlockByNumber(blockNumber)

    }
}
