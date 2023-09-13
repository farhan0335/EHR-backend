import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { BlockchainService } from 'src/blockchain/blockchain.service';
// import { blockchain.makeHash, blockchain.makeSignature } from './utils';



@Injectable()
export class IntegrationService {
  constructor(
    private blockchain: BlockchainService,
  ) { }


  async addDiagnosis(ICD10Code: string, description: string): Promise<void> {
    // try {
    // const patientId = "0xabc";
    var currentTimestamp: number = 1694526932 + 30
    const patientId = ethers.utils.hashMessage("0x123");
    const signatures = await this.blockchain.makeSignatures(this.blockchain.adminsigner, patientId, currentTimestamp)
    const diagnosisPayload = {
      date: currentTimestamp,
      ICD10Code: ethers.utils.hexZeroPad(ethers.utils.hexlify(ethers.utils.toUtf8Bytes(ICD10Code)), 32),
      description: ethers.utils.hexZeroPad(ethers.utils.hexlify(ethers.utils.toUtf8Bytes(description)), 32),
    };
    await this.blockchain.contract.addMedicalDiagnosis(patientId, diagnosisPayload, currentTimestamp, signatures);
    // }
    // catch (error) {
    //   console.log(error);
    //   throw new Error('Error adding Diagnoses')
    // }
  }

  // async getdiagnosis(patientaddress: string) {
  //   try {
  //     const diagnoses = await this.blockchain.contract.getdiagnosis(patientaddress);
  //     return diagnoses;
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("An Error occurred while fetching diagnoses")
  //   }
  // }
  // it("should revert if an invalid signature is provided", async function () {
  //   const operation = {
  //     operationDate: 1631212800,
  //     operationCodeICD9CM: ethers.utils.formatBytes32String("E456"),
  //     techniqueName: ethers.utils.formatBytes32String("Surgery"),
  //     bleedingVolume: 50,
  //     bloodTransfusionVolume: 10,
  //     urineVolume: 100,
  //     operationNotes: ethers.utils.formatBytes32String("Successful operation."),
  //   };
  //   var currentTimestamp: number = (await ethers.provider.getBlock('latest')).timestamp
  //   const patientId = ethers.utils.hashMessage("0x123");
  //   const hash = makeHash(patient1.address, currentTimestamp, patientId)
  //   const signatures = await makeSignature([patient1], hash)
  //   await expect(ehr.connect(owner).addSurgicalOperation(patientId, currentTimestamp, operation, signatures))
  //     .to.be.revertedWith("Invalid signer");
  // });
  async addSurgicalOperation(operationDate : number, operationCodeICD9CM :string, techniqueName : string, bleedingVolume: number, 
    bloodTransfusionVolume: number, urineVolume: number, operationNotes: string ) : Promise<void>{
      

    }

  // //    set Physical Finding
  // async setphysicalFinding(adminprivateKey: string, date: number, value1: number, value2: number): Promise<void> {
  //   try {
  //     const adminsigner = new ethers.Wallet(adminprivateKey, this.blockchain.provider)
  //     const adminAddress = await adminsigner.getAddress();
  //     const doctor_role = await this.blockchain.contract.DOCTOR_ROLE()
  //     await this.blockchain.contract.grantRole(doctor_role, adminAddress);
  //     const hash = await this.blockchain.makeHash(adminAddress, date);
  //     const signatures = await this.blockchain.makeSignature([adminsigner], hash)
  //     await this.blockchain.contract.setPhysicalFinding(date, date, value1, value2, date, signatures)
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("Error Setting physical finding")
  //   }
  // }

  // //    get Physical Finding

  // async getPhysicalFinding(patientAddress: string) {
  //   try {
  //     const physicalFinding = await this.blockchain.contract.getPhysicalFinding(patientAddress);
  //     return physicalFinding;
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("Error getting physical finding");
  //   }
  // }


  // //        set Operation Record
  // async addOperationRecord(adminprivateKey: string, date: number, field1: string, field2: string): Promise<void> {
  //   try {
  //     const adminsigner = new ethers.Wallet(adminprivateKey, this.blockchain.provider)
  //     const adminAddress = await adminsigner.getAddress();
  //     const doctor_role = await this.blockchain.contract.DOCTOR_ROLE();
  //     await this.blockchain.contract.grantRole(doctor_role, adminAddress);
  //     const hash = await this.blockchain.makeHash(adminAddress, date)
  //     const signatures = await this.blockchain.makeSignature([adminsigner], hash)
  //     await this.blockchain.contract.addOperationRecord(date, field1, field2, date, signatures);
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error('Error adding operation record');
  //   }
  // }

  // // get Operation record
  // async getOperationRecord(patientAddress: string) {
  //   try {
  //     const operationRecord = await this.blockchain.contract.getOperationRecord(patientAddress);
  //     return operationRecord
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("Error getting operation record");
  //   }
  // }
  // //   
  // async addLaboratoryTest(adminprivateKey: string, date: number, testOrder: string, testCode: string, testName: string): Promise<void> {
  //   try {
  //     const adminsigner = new ethers.Wallet(adminprivateKey, this.blockchain.provider)
  //     const adminAddress = await adminsigner.getAddress()
  //     const doctor_role = await this.blockchain.contract.DOCTOR_ROLE();
  //     await this.blockchain.contract.grantRole(doctor_role, adminAddress);
  //     const hash = await this.blockchain.makeHash(adminAddress, date)
  //     const signatures = await this.blockchain.makeSignature([adminsigner], hash)
  //     await this.blockchain.contract.addLaboratoryTest(date, testOrder, testCode, testName, date, signatures)
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("Error adding laboratory test")
  //   }
  // }

  // //    Get Laboratory Test
  // async getLaboratoryTest(patientAddress: string) {
  //   try {
  //     const laboratoryTest = await this.blockchain.contract.getLaboratoryTest(patientAddress);
  //     return laboratoryTest
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("Error getting laboratory test");
  //   }
  // }

  // async addMedicationInjection(adminprivateKey: string, injectionType: number, date: number, medication: string, administered: boolean, timestamp: number): Promise<void> {
  //   try {
  //     const adminsigner = new ethers.Wallet(adminprivateKey, this.blockchain.provider)
  //     const adminAddress = await adminsigner.getAddress();
  //     const doctor_role = await this.blockchain.contract.DOCTOR_ROLE();
  //     await this.blockchain.contract.grantRole(doctor_role, adminAddress)
  //     const hash = await this.blockchain.makeHash(adminAddress, timestamp)
  //     const signatures = this.blockchain.makeSignature([adminAddress], hash);
  //     await this.blockchain.contract.addMedicationInjection(injectionType, date, medication, administered, timestamp, signatures);
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error('Error adding medication injection')
  //   }

  // }

  // async getMedicationInjection(patientAddress: string) {
  //   try {
  //     const injections = await this.blockchain.contract.getMedicationInjection(patientAddress)
  //     return injections;
  //   } catch (error) {

  //   }
  // }


  // //      set Other Treatment
  // async addOtherTreatment(adminprivateKey: string, treatmentCategory: string, startDate: number, endDate: number,): Promise<void> {
  //   // try {
  //   const adminsigner = new ethers.Wallet(adminprivateKey, this.blockchain.provider)
  //   const adminAddress = await adminsigner.getAddress()
  //   const doctor_role = await this.blockchain.contract.DOCTOR_ROLE();
  //   await this.blockchain.contract.grantRole(doctor_role, adminAddress);
  //   const timestamp = Date.now();
  //   const hash = await this.blockchain.makeHash(adminAddress, timestamp)
  //   const signatures = this.blockchain.makeSignature([adminAddress], hash)
  //   await this.blockchain.contract.addOtherTreatment(treatmentCategory, startDate, endDate, signatures, timestamp)

  //   // } catch (error) {
  //   //   console.log(error);
  //   //   throw new Error('Error adding other treatment');
  //   // }
  // }
  // //      Get Other Treatment
  // async getOtherTreatment(patientAddress: string) {
  //   try {
  //     const trearments = await this.blockchain.contract.getOtherTreatments(patientAddress)
  //     return trearments;
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error("Error getting other treatment");
  //   }
  // }
  // getBlockByNumber(blockNumber: number): any {
  //   console.log(this.blockchain.contract);
  //   try {
  //     // const block = await this.provider.getBlock(blockNumber);
  //     // console.log(block, "Block number");
  //     return 0;
  //   } catch (error) {
  //     console.error(error);
  //     throw new Error(`Error fetching block ${blockNumber}`);
  //   }
  // }
}

