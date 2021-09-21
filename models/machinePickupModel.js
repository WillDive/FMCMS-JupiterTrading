const mongoose = require("mongoose");
const ObjectID = mongoose.Schema.Types.ObjectID;

const machinePickupModel = new mongoose.Schema(
  {
    branchId: {
      type: ObjectID,
      required: true,
    },
    salesId: {
      type: ObjectID,
      required: true,
    },
    businessId: {
      type: ObjectID,
      required: true,
    },
    machineId: {
      type: ObjectID,
      required: true,
    },
    memoryKey: {
      type: Boolean,
    },
    drawer: {
      type: Boolean,
    },
    paper: {
      type: Boolean,
    },
    terminal: {
      type: Boolean,
    },
    terminalAdapte: {
      type: Boolean,
    },
    machine: {
      type: Boolean,
    },
    SBookTerminal: {
      type: Boolean,
    },
    SbookMachine: {
      type: Boolean,
    },
    paperRoller: {
      type: Boolean,
    },
    paperCover: {
      type: Boolean,
    },
    machineAdapter: {
      type: Boolean,
    },
    FDForm: {
      type: Boolean,
    },
    sealNumber: {
      type: Boolean,
    },
    MRCNumber: {
      type: Boolean,
    },
    category: {
      type: String, // annual/incident/return/waiting
      required: true,
    },
    subCategory: {
      type: String, // osite/onfron/inside/
    },
    clientReportedIssue: {
      type: String,
    },
    technicianReportedIssue: {
      type: String,
    },
    returnReason: {
      type: String,
    },
    returnCertificate: {
      type: String,
    },
    operationDate: {
      type: Date, //  the operation complated date
    },
    annualNextMaintenanceDate: {
      type: Date,
    },
    waitingDuration: {
      type: String,
    },
    waitingCostPerMonth: {
      type: String,
    },
    pickedupBy: {
      type: String,
    },
    status: {
      type: String,
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MachinePickups", machinePickupModel);
