import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { LocalAuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { ethers } from 'ethers';

@Controller('integration')
export class IntegrationController {
    constructor(private readonly integrationService: IntegrationService) { }

    @Get('getblock/:blocknumber')
    // @UseGuards(RoleGuard, LocalAuthGuard)
    async getBlockNumber(@Param('BlockNumber') blockNumber: number) {
        return this.integrationService.getBlockByNumber(blockNumber)

    }

    @Get('getDiagnoses/: address')
    async getdiagnoses(@Param('address') address: string) {
        return this.integrationService.getdiagnosis(address);
    }
    @Post('add-diagnoses')
    async addDiagnoses(@Body() requestBody: { adminprivateKey: string, diagnosescode: string }) {
        const { adminprivateKey, diagnosescode } = requestBody;
        const wallet = new ethers.Wallet(adminprivateKey, this.integrationService.getProvider())
        await this.integrationService.addDiagnosis(diagnosescode, adminprivateKey)
        return { message: 'Dianosis added successfilly' };
    }
    @Post('set-physical-finding')
    async setPhysical
}
