import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { LocalAuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('integration')
export class IntegrationController {
    constructor(private readonly integrationService :  IntegrationService ){}
    
    @Get('getblock/:blocknumber')
    // @UseGuards(RoleGuard, LocalAuthGuard)
    async getBlockNumber(@Param('BlockNumber') blockNumber : number){
        return this.integrationService.getBlockByNumber(blockNumber)

    }
    async getdiagnoses(@Param('address'), address : string){
        return this 
    }
}
