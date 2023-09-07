import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { LocalAuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
@Controller('EHR')
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
        await this.integrationService.addDiagnosis(diagnosescode, adminprivateKey)
        return { message: 'Dianosis added successfilly' };
    }
    @Post('set-physical-finding')
    async setPhysicalFinding(@Body() requestBody: any) {
        try {
            const { adminprivateKey, date, value1, value2 } = requestBody;
            await this.integrationService.setphysicalFinding(adminprivateKey, date, value1, value2);
            return { message: 'Physical finding set successfully' };
        } catch (error) {
            console.log(error);
            throw new Error("Error setting physical finding");
        }
    }
    @Post('add-operation-record')
    async addOperationRecord(@Body() requestBody: any) {
        try {
            const { adminprivateKey, date, field1, field2 } = requestBody;
            await this.integrationService.addOperationRecord(adminprivateKey, date, field1, field2);
            return { message: 'Operation record added successfully' }
        } catch (error) {
            console.log(error);
            throw new Error('Error adding Operation Record')
        }
    }
    //  http://localhost:3000/ehr/physical-finding/:date
    @Get('operation/:date')
    async getOperationRecord(@Param('date') date: number): Promise<{ field1: string; field2: string }> {
        return this.integrationService.getOperationRecord(date);
    }
    @Post('add-laboratory-test')
    async addLaboratoryTest(@Body() requestBoby: any) {
        try {
            const { adminprivateKey, date, testOrder, testCode, testName } = requestBoby;
            await this.integrationService.addLaboratoryTest(adminprivateKey, date, testOrder, testCode, testName);
            return { message: 'Laboratory test Added successfully' }
        } catch (error) {
            console.log(error);
            throw new Error("Error adding Laboratory test");
        }
    }
    @Get('laboratory/:date')
    async getLaboratoryTest(@Param('date') date: number): Promise<{ testOrder: string; testCode: string; testName: string }> {
        return this.integrationService.getLaboratoryTest(date);
    }
    @Post('add-medication-injection')
    async addMedicationInjection(@Body() requestBody: any) {
        try {
            const { adminprivateKey, injectionType, date, medication, administered, timestamp } = requestBody;
            await this.integrationService.addMedicationInjection(adminprivateKey, injectionType, date, medication, administered, timestamp)
            return { message: "Medication injection added successfully" };

        } catch (error) {
            console.log(error);
            throw new Error("Error adding medication injection  ");
        }
    }
    @Get('medication-injection/:date')
    async getMedicationInjection(@Param('date') date: number): Promise<{ injectionType: number, medication: string, administered: boolean; timestamp: number }> {
        return this.integrationService.getMedicationInjection(date);
    }
    @Post('add-other-treatment')
    async addOtherTreatment(@Body() requestBody: any) {
        try {
            const { adminprivateKey, treatmentCategory, startDate, endDate, timestamp } = requestBody
            await this.integrationService.addOtherTreatment(adminprivateKey, treatmentCategory, startDate, endDate, timestamp)
            return { message: "Other trearment added sucessfully" }

        } catch (error) {
            console.log(error);
            throw new Error('Error adding other trearment');
        }
    }
    @Get('other-treatment/:startDate')
    async getOtherTreatment(@Param('startDate') startDate: number): Promise<{ treatmentCategory: string, endDate: number; timestamp: number }> {
        return this.integrationService.getOtherTreatment(startDate);
    }
    @Post('add-diagnostic-study')
    async addDiagnosesStudy(@Body() requestBoby: any) {
        // try {
        const { adminprivateKey, orderNumber, subCategory } = requestBoby;
        await this.integrationService.addDiagnosesStudy(adminprivateKey, orderNumber, subCategory)
        return { message: 'Diagnoses study added sucessfully' };
        // } catch (error) {
        //     throw new Error('Error adding diagnoses study')
        // }
    }
    @Get('diagnostic-study/:patientAddress')
    async getDianosticStudy(@Param("PatientAddress") patientAddres: string) {
        return this.integrationService.getDiagnosticStudies(patientAddres, "p")
    }
}
