import React, { useContext, useState } from "react";

import { GlobalState } from "../../GlobalState";

import { CSelect } from "@coreui/react";
import MainChartExample from "../charts/MainChartExample";
import Charts from "../charts/Charts";
import EmployeesList from "../Employee/EmployeesList";

import WidgetsDropdown from "../widgets/WidgetsDropdown.js";
import WidgetsBrand from "../widgets/WidgetsBrand.js";

import RecentEvents from "./Tables/RecentEvents";

const BranchAdminDashboard = () => {
  const state = useContext(GlobalState);
  const [user] = state.UserAPI.User;
  const [theYear, setTheYear] = useState(new Date().getFullYear());

  var workyears = [];

  const handleChange = (e) => {
    // console.log(" Done : "+ e.target.value)
    setTheYear(e.target.value);
    // console.log(" TheYear is : "+ JSON.stringify(theYear))
  };

  const getWorkYears = () => {
    for (let i = 2020; i <= new Date().getFullYear(); i++) {
      workyears.push(i);
    }
    console.log("the work years:" + workyears);
    return workyears;
  };
  return (
    <>
      <WidgetsDropdown branchId={user.branch} />
      <CSelect
        aria-label="Default select example"
        id="gender"
        name="theYear"
        onChange={handleChange}
        value={theYear}
        required
        className="mb-2"
      >
        <option value="" disabled>
          Select year to see report ...
        </option>
        {getWorkYears().map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </CSelect>

      <Charts branchId={user.branch} theYear={theYear} />

      <MainChartExample branchId={user.branch} theYear={theYear} />
      {/* <WidgetsBrand withCharts  branchId = {user.branch}/> */}
      <RecentEvents branchId={user.branch} />
      <EmployeesList />
    </>
  );
};

export default BranchAdminDashboard;
