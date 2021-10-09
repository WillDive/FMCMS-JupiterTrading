import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import CIcon from "@coreui/icons-react";
import Swal from "sweetalert2";
import {
  CForm,
  CButton,
  CCard,
  CCardBody,
  CImg,
  CRow,
  CCol,
  CSelect,
  CFormGroup,
  CInput,
  CLink,
  CTooltip,
} from "@coreui/react";
function MachineReturnigPickup({ user, salesDetail, pickupType, pickupId }) {
  const pickupDetail = {
    branchId: user.branch,
    salesId: salesDetail.saleId,
    businessId: salesDetail.businessId,
    machineId: salesDetail.machineId,
    memoryKey: false,
    drawer: false,
    paper: false,
    terminal: false,
    terminalAdapte: false,
    machineMaterial: false,
    SBookTerminal: false,
    SbookMachine: false,
    paperRoller: false,
    paperCover: false,
    machineAdapter: false,
    FDForm: false,
    sealNumber: false,
    MRCNumber: false,
    category: "",
    subCategory: "",
    clientReportedProblems: "",
    technicianReportedProblems: "",
    infoChange: [],
    issueDate: "",
    annualNextMaintenanceDate: "",
    returnReason: "",
    returnCertificate: "",
    waitingDuration: "",
    waitingCostPerMonth: "",
    pickedupBy: user._id,
  };
  const InfoChangeItemFields = {
    description: "",
    partNo: "",
    price: 1,
    quantity: 1,
    unitPrice: 0.0,
  };

  const state = useContext(GlobalState);
  const [maintenances] = state.MachinePickUpAPI.machinePickups;
  const [onEdit, setOnEdit] = useState(false);
  const [pickup, setPickup] = useState(pickupDetail);
  const [infoChangeItem, setInfoChangeItem] = useState(InfoChangeItemFields);
  const [callbackMachinePickup, setCallbackMachinePickup] =
    state.MachinePickUpAPI.callback;

  useEffect(() => {
    if (pickupId != "undefined") {
      maintenances.forEach((pickupItem) => {
        if (pickupItem._id === pickupId) {
          setPickup(pickupItem);
          setOnEdit(true);
        }
      });
    } else {
      setOnEdit(false);
      setPickup(pickupDetail);
    }
  }, [pickupId, maintenances]);

  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;
    if (value === "false" || value === false) {
      setPickup({ ...pickup, [name]: true });
    } else if (value === "true" || value === true) {
      setPickup({ ...pickup, [name]: false });
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPickup({ ...pickup, [name]: value });
    // console.log(pickup);
  };
  const handleInfoChangeItem = (e) => {
    const { name, value } = e.target;
    setInfoChangeItem({ ...infoChangeItem, [name]: value });
    // console.log(infoChangeItem);
  };
  const pushInfoChangeitem = () => {
    pickup.infoChange.unshift(infoChangeItem);
    // pickup.infoChange.push(infoChangeItem);
    setInfoChangeItem(pickup);
    setInfoChangeItem(InfoChangeItemFields);
    // console.log(pickup);
  };
  // console.log(pickup)
  const sweetAlert = (type, text) => {
    Swal.fire({
      position: "center",
      background: "#EBEDEF", // 2EB85C success // E55353 danger // 1E263C sidebar
      icon: type,
      text: text,
      confirmButtonColor: "#3C4B64",
      showConfirmButton: true,
      // timer: 1500,
    });
  };

  const onSubmitSavePickupDetail = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(`/pickup/edit/${pickupId}`, { ...pickup });
        sweetAlert("success", res.data.msg);
        setCallbackMachinePickup(!callbackMachinePickup);
      } else {
        const res = await axios.post("/pickup/machine", {
          ...pickup,
        });
        setCallbackMachinePickup(!callbackMachinePickup);
        sweetAlert("success", res.data.msg);
      }
    } catch (error) {
      sweetAlert("error", error.response.data.msg);
    }
  };

  const cleaeAllTheDetail = (e) => {
    e.preventDefault();
    setPickup(pickupDetail);
    setInfoChangeItem(InfoChangeItemFields);
  };
  const removeInfoChangeItem = (index) => {
    pickup.infoChange.splice(index, 1);
    setInfoChangeItem(pickup);
    setInfoChangeItem(InfoChangeItemFields);
    console.log(pickup);
  };
  const findTotalPrice = (infoChange) => {
    var total = 0.0;
    infoChange.forEach((item) => {
      const price = item.price * item.quantity;
      total = total + price;
    });
    return total;
  };
  const findVAT = (infoChange) => {
    return (findTotalPrice(infoChange) * 1.5) / 100;
  };
  const findGTotal = (infoChange) => {
    return (findVAT(infoChange) + findTotalPrice(infoChange) + 0.0).toFixed(1);
  };
  return (
    <div
      className="rounded "
      style={{ minWidth: "900px", border: "solid 10px #D8DBE0" }}
    >
      <CForm onSubmit={onSubmitSavePickupDetail}>
        <CCard className="w-100 border-0">
          <CCardBody>
            <CRow>
              <CCol className="d-flex justify-content-center" lg="12">
                <CImg height="50px" src="/logo/fulllogo.png" />
              </CCol>
              <CCol className="col-12 mt-4  border-bottom">
                <h3 className="text-center text-muted bold">
                  Machine withdrawal receiving form
                </h3>
              </CCol>

              <CCol className="col-12 mt-4 d-flex justify-content-end">
                <p>
                  <span className="">Date : </span>
                  <span className="border-bottom">
                    {new Date().toLocaleDateString()}
                  </span>
                  <br />
                  <span className="">Branch :</span>
                  <b className="border-bottom"> {salesDetail.branchName}</b>
                </p>
              </CCol>

              <CCol className="col-12 mt-4">
                <CRow>
                  <CCol>
                    <h4 className="text-decoration-underline">
                      Customer Detail
                    </h4>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>Campany :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail.tradeName}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>Owner :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail.companyName}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>TIN :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail.TIN}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>VAT :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail.VAT}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>Tel :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail.telephone}</h6>
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol>
                    <h4 className="text-decoration-underline">
                      Machine Detail
                    </h4>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6> Brand : </h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail.machineBrand}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>Model :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail.machineModel}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>SER No :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail.machineSerialNumber}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>MRC :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail.machineMRC}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>SIM :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{salesDetail.machineSIM}</h6>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </CCol>

              <CCol className="col-12 mt-4">
                <h4 className="text-center">
                  Materials checkup during receiving
                </h4>
                <CRow className="mt-3">
                  <CCol>
                    <CRow className="mb-2">
                      <CCol className="col-8">
                        <h6>* Memory Key :</h6>
                      </CCol>
                      <CCol className="col-3 text-center ">
                        <input
                          // style={{
                          //   position: "absolute",
                          //   top: 0,
                          //   left: 0,
                          //   height: "30px",
                          //   width: "100px",
                          //   backgroundColor: "#eee",
                          //   paddingX: "5px",
                          // }}
                          id="memoryKey"
                          name="memoryKey"
                          value={pickup.memoryKey}
                          className="p-3"
                          type="checkbox"
                          checked={pickup.memoryKey}
                          onChange={handleCheckboxChange}
                          // disabled
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-8">
                        <h6>* Drawer :</h6>
                      </CCol>
                      <CCol className="col-3 text-center">
                        <input
                          id="drawer"
                          name="drawer"
                          value={pickup.drawer}
                          className="p-3"
                          type="checkbox"
                          checked={pickup.drawer}
                          onChange={handleCheckboxChange}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-8">
                        <h6>* Paper :</h6>
                      </CCol>
                      <CCol className="col-3 text-center">
                        <input
                          id="paper"
                          name="paper"
                          value={pickup.paper}
                          className="p-3"
                          type="checkbox"
                          checked={pickup.paper}
                          onChange={handleCheckboxChange}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-8">
                        <h6>* Terminal :</h6>
                      </CCol>
                      <CCol className="col-3 text-center">
                        <input
                          id="terminal"
                          name="terminal"
                          value={pickup.terminal}
                          className="p-3"
                          type="checkbox"
                          checked={pickup.terminal}
                          onChange={handleCheckboxChange}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol>
                    <CRow className="mb-2">
                      <CCol className="col-8">
                        <h6>* Terminal Adapter :</h6>
                      </CCol>
                      <CCol className="col-3 text-center">
                        <input
                          id="terminalAdapte"
                          name="terminalAdapte"
                          value={pickup.terminalAdapte}
                          className="p-3"
                          type="checkbox"
                          checked={pickup.terminalAdapte}
                          onChange={handleCheckboxChange}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-8">
                        <h6>* Machine :</h6>
                      </CCol>
                      <CCol className="col-3 text-center">
                        <input
                          id="machineMaterial"
                          name="machineMaterial"
                          value={pickup.machineMaterial}
                          className="p-3"
                          type="checkbox"
                          checked={pickup.machineMaterial}
                          onChange={handleCheckboxChange}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-8">
                        <h6>* S. Book Terminal :</h6>
                      </CCol>
                      <CCol className="col-3 text-center">
                        <input
                          id="SBookTerminal"
                          name="SBookTerminal"
                          value={pickup.SBookTerminal}
                          className="p-3"
                          type="checkbox"
                          checked={pickup.SBookTerminal}
                          onChange={handleCheckboxChange}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-8">
                        <h6>* S. Book Machine :</h6>
                      </CCol>
                      <CCol className="col-3 text-center">
                        <input
                          id="SbookMachine"
                          name="SbookMachine"
                          value={pickup.SbookMachine}
                          className="p-3"
                          type="checkbox"
                          checked={pickup.SbookMachine}
                          onChange={handleCheckboxChange}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol>
                    <CRow className="mb-2">
                      <CCol className="col-8">
                        <h6>* Paper Roller :</h6>
                      </CCol>
                      <CCol className="col-3 text-center">
                        <input
                          id="paperRoller"
                          name="paperRoller"
                          value={pickup.paperRoller}
                          className="p-3"
                          type="checkbox"
                          checked={pickup.paperRoller}
                          onChange={handleCheckboxChange}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-8">
                        <h6>* Paper Cover :</h6>
                      </CCol>
                      <CCol className="col-3 text-center">
                        <input
                          id="paperCover"
                          name="paperCover"
                          value={pickup.paperCover}
                          className="p-3"
                          type="checkbox"
                          checked={pickup.paperCover}
                          onChange={handleCheckboxChange}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-8">
                        <h6>* Machine Adapter :</h6>
                      </CCol>
                      <CCol className="col-3 text-center">
                        <input
                          id="machineAdapter"
                          name="machineAdapter"
                          value={pickup.machineAdapter}
                          className="p-3"
                          type="checkbox"
                          checked={pickup.machineAdapter}
                          onChange={handleCheckboxChange}
                        />
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-8">
                        <h6>* FD Form :</h6>
                      </CCol>
                      <CCol className="col-3 text-center">
                        <input
                          id="FDForm"
                          name="FDForm"
                          value={pickup.FDForm}
                          className="p-3"
                          type="checkbox"
                          checked={pickup.FDForm}
                          onChange={handleCheckboxChange}
                        />
                      </CCol>
                    </CRow>
                  </CCol>
                  <CCol className="col-12 mt-1">
                    <h5> Status Check :</h5>
                    <CRow className="mb-2">
                      <CCol className="col-3 d-flex justify-content-between">
                        <h6>* Seal Number</h6>
                        <input
                          id="sealNumber"
                          name="sealNumber"
                          value={pickup.sealNumber}
                          className="p-3"
                          type="checkbox"
                          checked={pickup.sealNumber}
                          onChange={handleCheckboxChange}
                        />
                      </CCol>
                      <CCol className="col-3 d-flex justify-content-between">
                        <h6>* MRC OK</h6>
                        <input
                          id="MRCNumber"
                          name="MRCNumber"
                          value={pickup.MRCNumber}
                          className="p-3"
                          type="checkbox"
                          checked={pickup.MRCNumber}
                          onChange={handleCheckboxChange}
                        />
                      </CCol>
                      <CCol className="d-flex justify-content-between">
                        <h6> Receiving Reason </h6>
                        <CSelect
                          aria-label="Default select example"
                          id="category"
                          name="category"
                          onChange={handleInputChange}
                          value={pickup.category}
                          required
                          style={{
                            border: "0px",
                            borderBottom: "solid 1px #D8DBE0",
                          }}
                        >
                          <option value="">
                            Select machine Withdrawal reason...
                          </option>
                          <option value="withdrawal">Withdrawal Machine</option>
                          <option value="temporarly_store">
                            Temporarly Store
                          </option>
                        </CSelect>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </CCol>
              {pickup.category === "withdrawal" && (
                <CCol className="col-12 mt-4">
                  <CRow className="border rounded mx-1 py-4">
                    <CCol>
                      <CRow className="mb-2">
                        <CCol className="col-2">
                          <h6>Machine Withdrawal reason </h6>
                        </CCol>
                        <CCol className="col-10">
                          <textarea
                            className="w-100 form-control"
                            style={{
                              border: "0px",
                              borderBottom: "solid 1px #D8DBE0",
                            }}
                            id="returnReason"
                            name="returnReason"
                            value={pickup.returnReason}
                            onChange={handleInputChange}
                            rows="1"
                            required
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol className="col-2">
                          <h6>Upload withdrawal cetificate </h6>
                        </CCol>
                        <CCol className="col-10">
                          <input
                            className="w-100 form-control"
                            style={{
                              border: "0px",
                              borderBottom: "solid 1px #D8DBE0",
                            }}
                            type="file"
                            id="returnCertificate"
                            name="returnCertificate"
                            value={pickup.returnCertificate}
                            onChange={handleInputChange}
                            rows="1"
                            required
                          />
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                </CCol>
              )}
              {pickup.category === "temporarly_store" && (
                <CCol className="col-12">
                  <CRow className="border rounded mx-1 py-4">
                    <CCol className="col-6">
                      <CRow className="mb-2">
                        <CCol className="col-4">
                          <h6>Time duration of temporarily store </h6>
                        </CCol>
                        <CCol className="col-8">
                          <input
                            className="w-100 form-control"
                            style={{
                              border: "0px",
                              borderBottom: "solid 1px #D8DBE0",
                            }}
                            id="waitingDuration"
                            name="waitingDuration"
                            value={pickup.waitingDuration}
                            onChange={handleInputChange}
                            type="date"
                            required
                          />
                        </CCol>
                      </CRow>
                    </CCol>
                    <CCol className="col-6">
                      <CRow className="mb-2">
                        <CCol className="col-4">
                          <h6>Temporarly store cost per month(ETB) </h6>
                        </CCol>
                        <CCol className="col-8">
                          <input
                            className="w-100 form-control"
                            style={{
                              border: "0px",
                              borderBottom: "solid 1px #D8DBE0",
                            }}
                            type="number"
                            id="waitingCostPerMonth"
                            name="waitingCostPerMonth"
                            value={pickup.waitingCostPerMonth}
                            onChange={handleInputChange}
                            rows="1"
                            required
                          />
                        </CCol>
                      </CRow>
                    </CCol>
                  </CRow>
                </CCol>
              )}
              <CCol className="col-12 mt-4">
                <h4 className="text-decoration-underline">receiving Summery</h4>
                <h6 className="border-bottom " style={{ lineHeight: "1.6" }}>
                  The machine with <b> 1000949382773</b> serial number is
                  assigned to the company
                  <b> Edna Mall privated Limited Company</b> and fiscalized with
                  MRC of <b> CLC10008768 </b>
                  and SIM <b> 0987664321 </b> in
                  <b> {salesDetail.branchName}</b>, and receiving for{" "}
                  {pickup.category}
                  {pickup.category === "annual" ||
                  pickup.category === "incident"
                    ? " maintenance "
                    : pickup.category === "withdrawal"
                    ? " machine "
                    : pickup.category === ""
                    ? " _______ "
                    : ""}{" "}
                  on {new Date().toLocaleString()}.
                </h6>
              </CCol>
              <CCol className="col-12">
                <CRow className="border rounded mx-1 py-4">
                  <CCol className="col-12">
                    <h5>Internal Use</h5>
                  </CCol>
                  <CCol>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>Received by :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom">
                        <h6>{user.fName + " " + user.mName}</h6>
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol className="col-3">
                        <h6>Signature :</h6>
                      </CCol>
                      <CCol className="col-8 border-bottom"></CCol>
                    </CRow>
                  </CCol>
                  <CCol>
                    <CRow className="mb-2">
                      <CCol className="col-4">
                        <h6>Fiscalization Date :</h6>
                      </CCol>
                      <CCol className="col-7 border-bottom">
                        <h6>Monday 12/20/2021</h6>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>

        <div className="d-flex justify-content-end">
          <div>
            <CButton type="submit" className="my-1 mr-1" size="sm" color="dark">
              <CIcon name="cil-save"></CIcon> Save
              {onEdit ? " all changes" : " this receiving detail"}!
            </CButton>
            {!onEdit && (
              <CButton
                className="my-1"
                size="sm"
                color="danger"
                onClick={cleaeAllTheDetail}
              >
                <CIcon name="cil-x"></CIcon> Clear this receiving detail!
              </CButton>
            )}
          </div>
        </div>
      </CForm>
    </div>
  );
}

export default MachineReturnigPickup;
