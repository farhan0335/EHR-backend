import { Injectable } from '@nestjs/common';
import { log } from 'console';
import {  ethers } from 'ethers';
// import { makeHash, makeSignature } from './utils';



@Injectable()
export class IntegrationService {
  //   private provider: JsonRpcProvider;
  private providerUrl = "http://127.0.0.1:8545";
  private privatekey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  private provider = new ethers.providers.JsonRpcProvider(this.providerUrl);
  private wallet = new ethers.Wallet(this.privatekey, this.provider)

  private contractAddress = "5FbDB2315678afecb367f032d93F642f64180aa3"

  private abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "previousAdminRole",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "newAdminRole",
          "type": "bytes32"
        }
      ],
      "name": "RoleAdminChanged",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleGranted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "account",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "RoleRevoked",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "DEFAULT_ADMIN_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "DOCTOR_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "PATIENT_ROLE",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_diagnosesCode",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_date",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "bytes[]",
          "name": "signatures",
          "type": "bytes[]"
        }
      ],
      "name": "addDiagnosis",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_orderNumber",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_subCategory",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "bytes[]",
          "name": "signatures",
          "type": "bytes[]"
        }
      ],
      "name": "addDiagnosticStudy",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_testDate",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_testOrder",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_testCode",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_testName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "bytes[]",
          "name": "signatures",
          "type": "bytes[]"
        }
      ],
      "name": "addLaboratoryTest",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_orderNumber",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_date",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_drugName",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "_isMedication",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "bytes[]",
          "name": "signatures",
          "type": "bytes[]"
        }
      ],
      "name": "addMedicationInjection",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_operationDate",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_operationCode",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_techniqueCode",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "bytes[]",
          "name": "signatures",
          "type": "bytes[]"
        }
      ],
      "name": "addOperationRecord",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_orderNumber",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_treatmentCategory",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_date",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "bytes[]",
          "name": "signatures",
          "type": "bytes[]"
        }
      ],
      "name": "addOtherTreatment",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "usr",
          "type": "address"
        }
      ],
      "name": "addWhitelist",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "patient",
          "type": "address"
        }
      ],
      "name": "getDiagnoses",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "diagnosesCode",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "date",
              "type": "uint256"
            }
          ],
          "internalType": "struct EHR.Diagnoses[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "patient",
          "type": "address"
        }
      ],
      "name": "getDiagnosticStudies",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "orderNumber",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "subCategory",
              "type": "string"
            }
          ],
          "internalType": "struct EHR.DiagnosticStudy[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "patient",
          "type": "address"
        }
      ],
      "name": "getLaboratoryTests",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "testDate",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "testOrder",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "testCode",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "testName",
              "type": "string"
            }
          ],
          "internalType": "struct EHR.LaboratoryTest[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "patient",
          "type": "address"
        }
      ],
      "name": "getMedicationInjections",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "orderNumber",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "date",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "drugName",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isMedication",
              "type": "bool"
            }
          ],
          "internalType": "struct EHR.MedicationInjection[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "patient",
          "type": "address"
        }
      ],
      "name": "getOperationRecords",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "operationDate",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "operationCode",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "techniqueCode",
              "type": "string"
            }
          ],
          "internalType": "struct EHR.OperationRecord[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "patient",
          "type": "address"
        }
      ],
      "name": "getOtherTreatments",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "orderNumber",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "treatmentCategory",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "date",
              "type": "uint256"
            }
          ],
          "internalType": "struct EHR.OtherTreatments[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "patient",
          "type": "address"
        }
      ],
      "name": "getPhysicalFinding",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "measuredDate",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "measuredTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "height",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "weight",
              "type": "uint256"
            }
          ],
          "internalType": "struct EHR.PhysicalFindings",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        }
      ],
      "name": "getRoleAdmin",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "",
          "type": "bytes32"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "grantRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "hasRole",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes",
          "name": "",
          "type": "bytes"
        }
      ],
      "name": "isSignatureUsed",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "quorum",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "renounceRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "role",
          "type": "bytes32"
        },
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "revokeRole",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_measuredDate",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_measuredTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_height",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_weight",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        },
        {
          "internalType": "bytes[]",
          "name": "signatures",
          "type": "bytes[]"
        }
      ],
      "name": "setPhysicalFinding",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "quorum_",
          "type": "uint256"
        }
      ],
      "name": "setQuorum",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "whitelist",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  private contract = new ethers.Contract(this.contractAddress, JSON.stringify(this.abi), this.wallet);


  async makeHash(recipient: any, timestamp: any) {
    let concatenatedArgs = ethers.utils.solidityPack(["address", "uint256"], [
      recipient,
      timestamp
    ])
    const messageHashe = ethers.utils.keccak256(concatenatedArgs);
    return messageHashe;
  }

  async makeSignature(signers: any, messageHash: string) {
    const signatures: any[] = await Promise.all(signers.map(async (wallet: any) => {
      const bytesMessageHash = messageHash
      let signature = wallet.signMessage(ethers.utils.arrayify(bytesMessageHash));
      return signature;
    }));
    return signatures;
  }

  async addDiagnosesStudy(privatekey: string, orderNumber: number, subCategory: string) {
    // try
    // {

    const adminsigner = new ethers.Wallet(privatekey, this.provider)

    const adminAddress = await adminsigner.getAddress();

    const doctor_role = await this.contract.DOCTOR_ROLE();
    const timestamp = 1692941118860;
    const hash = await this.makeHash(adminAddress, timestamp);
    const signatures = await this.makeSignature([adminsigner], hash)
    const DEFAULT_ADMIN_ROLE = await this.contract.DEFAULT_ADMIN_ROLE();
    const DOCTOR_ROLE = await this.contract.DOCTOR_ROLE();
    const data_ = await this.contract.hasRole(DOCTOR_ROLE, adminsigner.address)
    console.log(await this.wallet.getAddress(), "data_data_data_");
    const data = await this.contract.addDiagnosticStudy(orderNumber, subCategory, timestamp,
      signatures
    )
    return data
    // }catch(error){ 
    //   console.log(error);
    //   throw new Error("Error adding diagnoses study:");

  }
async getDiagnosticStudies(patientaddress : string){
  // try{

    const result = await this.contract.getDiagnosticStudies(patientaddress)
    console.log(result, "Result");
    
    return result;
  // } catch(error) {
  //   throw new Error('An error occurred while fetching diagnostic studies.');
  // }
}

 
  async getdiagnosis(patientaddress: string) {
    try {
      const diagnoses = await this.contract.getdiagnosis(patientaddress);
      return diagnoses;
    } catch (error) {
      console.log(error);
      throw new Error("An Error occurred while fetching diagnoses")
    }
  }
  async addDiagnosis(diagnosesCode: string, adminsigner: any): Promise<void> {
    try {
      const adminAddress = await adminsigner.getaddress();
      const timestamp = Date.now()
      const doctor_role = await this.contract.DOCTOR_ROLE();
      await this.contract.grarantRole(doctor_role, adminAddress)
      const hash = await this.makeHash(adminAddress, timestamp);
      const signatures = await this.makeSignature([adminsigner], hash);
      await this.contract.addDiagnosis(diagnosesCode, timestamp, timestamp, signatures);
    }
    catch (error) {
      console.log(error);
      throw new Error('Error adding Diagnoses')
    }
  }

  //    set Physical Finding
  async setphysicalFinding(adminprivateKey: string, date: number, value1: number, value2: number): Promise<void> {
    try {
      const adminsigner = new ethers.Wallet(adminprivateKey, this.provider)
      const adminAddress = await adminsigner.getAddress();
      const doctor_role = await this.contract.DOCTOR_ROLE()
      await this.contract.grantRole(doctor_role, adminAddress);
      const hash = await this.makeHash(adminAddress, date);
      const signatures = await this.makeSignature([adminsigner], hash)
      await this.contract.setPhysicalFinding(date, date, value1, value2, date, signatures)
    } catch (error) {
      console.log(error);
      throw new Error("Error Setting physical finding")
    }
  }

  //    get Physical Finding

  async getPhysicalFinding(date: number): Promise<{ value1: number, value2: number }> {
    try {
      const physicalFinding = await this.contract.getPhysicalFinding(date);
      return {
        value1: physicalFinding.value1.toNumber(),
        value2: physicalFinding.value2.toNumber(),
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error getting physical finding");
    }
  }


  //        set Operation Record
  async addOperationRecord(adminprivateKey: string, date: number, field1: string, field2: string): Promise<void> {
    try {
      const adminsigner = new ethers.Wallet(adminprivateKey, this.provider)
      const adminAddress = await adminsigner.getAddress();
      const doctor_role = await this.contract.DOCTOR_ROLE();
      await this.contract.grantRole(doctor_role, adminAddress);
      const hash = await this.makeHash(adminAddress, date)
      const signatures = await this.makeSignature([adminsigner], hash)
      await this.contract.addOperationRecord(date, field1, field2, date, signatures);
    } catch (error) {
      console.log(error);
      throw new Error('Error adding operation record');
    }
  }

  // get Operation record
  async getOperationRecord(date: number): Promise<{ field1: string; field2: string }> {
    try {
      const operationRecord = await this.contract.getOperationRecord(date);
      return {
        field1: operationRecord.field1,
        field2: operationRecord.field2,
      };
    } catch (error) {
      console.log(error);
      throw new Error("Error getting operation record");
    }
  }
  //   
  async addLaboratoryTest(adminprivateKey: string, date: number, testOrder: string, testCode: string, testName: string): Promise<void> {
    try {
      const adminsigner = new ethers.Wallet(adminprivateKey, this.provider)
      const adminAddress = await adminsigner.getAddress()
      const doctor_role = await this.contract.DOCTOR_ROLE();
      await this.contract.grantRole(doctor_role, adminAddress);
      const hash = await this.makeHash(adminAddress, date)
      const signatures = await this.makeSignature([adminsigner], hash)
      await this.contract.addLaboratoryTest(date, testOrder, testCode, testName, date, signatures)
    } catch (error) {
      console.log(error);
      throw new Error("Error adding laboratory test")
    }
  }

  //    Get Laboratory Test
  async getLaboratoryTest(patientAddress: number){
    try {
      const laboratoryTest = await this.contract.getLaboratoryTest(patientAddress);
      return l
    } catch (error) {
      console.log(error);
      throw new Error("Error getting laboratory test");
    }
  }

  async addMedicationInjection(adminprivateKey: string, injectionType: number, date: number, medication: string, administered: boolean, timestamp: number): Promise<void> {
    try {
      const adminsigner = new ethers.Wallet(adminprivateKey, this.provider)
      const adminAddress = await adminsigner.getAddress();
      const doctor_role = await this.contract.DOCTOR_ROLE();
      await this.contract.grantRole(doctor_role, adminAddress)
      const hash = await this.makeHash(adminAddress, timestamp)
      const signatures = this.makeSignature([adminAddress], hash);
      await this.contract.addMedicationInjection(injectionType, date, medication, administered, timestamp, signatures);
    } catch (error) {
      console.log(error);
      throw new Error('Error adding medication injection')
    }

  }

  async getMedicationInjection(patientAddress : string){
    try{
      const injections = await this.contract.getMedicationInjection(patientAddress)
      return injections;
    }catch(error){

    }
  }

  
//      set Other Treatment
  async addOtherTreatment(adminprivateKey: string, treatmentCategory: string, startDate: number, endDate: number, timestamp: number): Promise<void> {
    try {
      const adminsigner = new ethers.Wallet(adminprivateKey, this.provider)
      const adminAddress = await adminsigner.getAddress()
      const doctor_role = await this.contract.DOCTOR_ROLE();
      await this.contract.grantRole(doctor_role, adminAddress);
      const timestamp = Date.now();
      const hash = await this.makeHash(adminAddress, timestamp)
      const signatures = this.makeSignature([adminAddress], hash)
      await this.contract.addOtherTreatment(treatmentCategory, startDate, endDate, signatures, timestamp)

    } catch (error) {
      console.log(error);
      throw new Error('Error adding other treatment');
    }
  }
//      Get Other Treatment
  async getOtherTreatment(patientAddress : string) {
    try{
      const trearments = await this.contract.getOtherTreatments(patientAddress)
      return trearments;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting other treatment");
    }
  }




  getBlockByNumber(blockNumber: number): any {
    console.log(this.contract);
    try {
      // const block = await this.provider.getBlock(blockNumber);
      // console.log(block, "Block number");
      return 0;
    } catch (error) {
      console.error(error);
      throw new Error(`Error fetching block ${blockNumber}`);
    }
  }
}

