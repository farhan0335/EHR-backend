import { Injectable } from '@nestjs/common';
import { Block, ethers, Provider, Wallet } from 'ethers';
import { makeHash, makeSignature } from './utils';
import contractAbi from './contract_abi.json';
import { log } from 'console';

@Injectable()
export class IntegrationService {
  getProvider(): ethers.Provider {
    throw new Error('Method not implemented.');
  }
  //   private provider: JsonRpcProvider;
  private providerUrl = "http://127.0.0.1:8545";
  private privatekey = "0x6f110a4c61ad015e638cd3cfd7e4df65daf2837ce66e4fcb30220c7b20523342";
  private provider = new ethers.JsonRpcProvider(this.providerUrl);
  private wallet = new ethers.Wallet(this.privatekey, this.provider)
  private contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  private abi = [{
    "_format": "hh-sol-artifact-1",
    "contractName": "EHR",
    "sourceName": "contracts/EHR.sol",
    "abi": [
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

  }
  ]
  private contract = new ethers.Contract(this.contractAddress, JSON.stringify(this.abi), this.wallet);
  async getBlockByNumber(blockNumber: number): Promise<Block | null> {
    console.log(this.contract);
    try {
      const block = await this.provider.getBlock(blockNumber);
      console.log(block, "Block number");
      return block;
    } catch (error) {
      console.error(error);
      throw new Error(`Error fetching block ${blockNumber}`);
    }
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
      await this.contract.grantRole(doctor_role, adminAddress)
      const hash = makeHash(adminAddress, timestamp);
      const signatures = await makeSignature([adminsigner], hash);
      await this.contract.addDiagnosis(diagnosesCode, timestamp, timestamp, signatures);
    }
    catch (error) {
      console.log(error);
      throw new Error('Error adding Diagnoses')
    }
  }
  async setphysicalFinding(adminprivateKey: string, date: number, value1: number, value2: number): Promise<void> {
    try {
      const adminsigner = new ethers.Wallet(adminprivateKey, this.provider)
      const adminAddress = await adminsigner.getAddress();
      const doctor_role = await this.contract.DOCTOR_ROLE()
      await this.contract.grantRole(doctor_role, adminAddress);
      const hash = makeHash(adminAddress, date);
      const signatures = await makeSignature([adminsigner], hash)
      await this.contract.setPhysicalFinding(date, date, value1, value2, date, signatures)
    } catch (error) {
      console.log(error);
      throw new Error("Error Setting physical finding")
    }
  }
  async addOperationRecord(adminprivateKey: string, date: number, field1: string, field2: string): Promise<void> {
    try {
      const adminsigner = new ethers.Wallet(adminprivateKey, this.provider)
      const adminAddress = await adminsigner.getAddress();
      const doctor_role = await this.contract.DOCTOR_ROLE();
      await this.contract.grantRole(doctor_role, adminAddress);
      const hash = makeHash(adminAddress, date)
      const signatures = await makeSignature([adminsigner], hash)
      await this.contract.addOperationRecord(date, field1, field2, date, signatures);
    } catch (error) {
      console.log(error);
      throw new Error('Error adding operation record');
    }
  }
  async addLaboratoryTest(adminprivateKey: string, date: number, testOrder: string, testCode: string, testName: string): Promise<void> {
    try {
      const adminsigner = new ethers.Wallet(adminprivateKey, this.provider)
      const adminAddress = await adminsigner.getAddress()
      const doctor_role = await this.contract.DOCTOR_ROLE();
      await this.contract.grantRole(doctor_role, adminAddress);
      const hash = makeHash(adminAddress, date)
      const signatures = await makeSignature([adminsigner], hash)
      await this.contract.addLaboratoryTest(date, testOrder, testCode, testName, date, signatures)
    } catch (error) {
      console.log(error);
      throw new Error("Error adding laboratory test")
    }
  }
  async addMedicationInjection(adminprivateKey: string, injectionType: number, date: number, medication: string, administered: boolean, timestamp: number): Promise<void> {
    try {
      const adminsigner = new ethers.Wallet(adminprivateKey, this.provider)
      const adminAddress = await adminsigner.getAddress();
      const doctor_role = await this.contract.DOCTOR_ROLE();
      await this.contract.grantRole(doctor_role, adminAddress)
      const hash = makeHash(adminAddress, timestamp)
      const signatures = makeSignature([adminAddress], hash);
      await this.contract.addMedicationInjection(injectionType, date, medication, administered, timestamp, signatures);
    } catch (error) {
      console.log(error);
      throw new Error('Error adding medication injection')
    }

  }
  async addOtherTreatment(request : any) : Promise<void> {
    try
    {
      const {privatekey, treatmentCategory, startDate, endDate} = request;
      const adminsigner = new ethers.Wallet(privatekey, this.provider)
      const adminAddress = await adminsigner.getAddress()
      const doctor_role = await this.contract.DOCTOR_ROLE();
      await this.contract.grantRole(doctor_role, adminAddress);
      const timestamp = Date.now();
      const hash = makeHash(adminAddress, timestamp)
      const signatures = makeSignature([adminAddress], hash)
      await this.contract.addOther

    }catch(error){}

  }
}

// import { Injectable } from '@nestjs/common';
// import { Block, ethers, JsonRpcProvider, } from 'ethers';

// @Injectable()
// export class IntegrationService {
//     private provider: JsonRpcProvider;
//     private providerUrl = "http://127.0.0.1:8545";
//     private privatekey = "chakwal1234Mureed1"
//       private provider = new ethers.JsonRpcProvider(this.providerUrl);



//     constructor() {
//         const providerUrl = 'http://127.0.0.1:8545'; // Update with your network's URL
//         this.provider = new ethers.JsonRpcProvider(providerUrl);

//     }

//     async getBlockByNumber(blockNumber: number): Promise<Block | null> {
//         try {
//             const block = await this.provider.getBlock(blockNumber);
//             console.log(block, "Block number");

//             return block;
//         } catch (error) {
//             console.error(error);
//             throw new Error(`Error fetching block ${blockNumber}`);
//         }
//     }

//     async addDiagnosis(diagnosesCode: string, date: number, timestamp: number, signatures: string[]): Promise<void> {
//         try {
//             await this.
//     }
//   }


// }
