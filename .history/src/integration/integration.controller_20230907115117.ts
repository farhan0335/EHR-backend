import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { LocalAuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import {multerConfige} from './../multer-config'
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
    //  http://localhost:3000/ehr/physical-finding/:patientAddress
    @Get('operation/:date')
    async getOperationRecord(@Param('date') patientAddress: string) {
        return this.integrationService.getOperationRecord(patientAddress);
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
    @Get('laboratory/:patientAddress')
    async getLaboratoryTest(@Param('date') patientAddress : string) {
        return this.integrationService.getLaboratoryTest(patientAddress);
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
    @Get('getMedicationInjections/:patientAddress')
    async getMedicationInjections(@Param('patientAddress') patientAddress: string) {
        return this.integrationService.getMedicationInjection(patientAddress);
    }
    @Post('add-other-treatment')
    async addOtherTreatment(@Body() requestBody: any) {
        // try {
            const { adminprivateKey, treatmentCategory, startDate, endDate, } = requestBody
            await this.integrationService.addOtherTreatment(adminprivateKey, treatmentCategory, startDate, endDate)
            return { message: "Other trearment added sucessfully" }

        // } catch (error) {
        //     console.log(error);
        //     throw new Error('Error adding other trearment');
        // }
    }
    @Get('getOtherTreatments/:patientAddress')
    async getOtherTreatments(@Param('patientAddress') patientAddress: string) {
        const data = this.integrationService.getOtherTreatment(patientAddress);
        console.log(data, "data..................");
        return data
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
        const data = this.integrationService.getDiagnosticStudies(patientAddres)
        console.log(data, "data_data_data.................");
        return data
    }

    @Post('file_upload')
    async uploadFile(@UploadedFile() file : Express.Multer,Fe) {
        return {filename : file.filename}
    }


