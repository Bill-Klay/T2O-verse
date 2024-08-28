"use client";

import { LOGS } from "@/types/Logs";
import { useEffect, useState } from "react";

type LogProps = {
  currentLogs: LOGS[];
};

export const Logs = ({ currentLogs }: LogProps) => {
  const [filterType, setFilterType] = useState("All");
  const [filterEmail, setFilterEmail] = useState("All");
  const [filteredLogs, setFilteredLogs] = useState<LOGS[]>([]);

  useEffect(() => {
    if (filterType === "All" && filterEmail === "All") {
      setFilteredLogs(currentLogs);
    } else if (filterType !== "All" && filterEmail === "All") {
      const filteredByLogLevel = currentLogs.filter(
        (log) => log.log_level === filterType
      );
      setFilteredLogs(filteredByLogLevel);
    } else if (filterType === "All" && filterEmail !== "All") {
      const filteredByEmail = currentLogs.filter(
        (log) => log.user_email === filterEmail
      );
      setFilteredLogs(filteredByEmail);
    } else {
      const filtered = currentLogs.filter(
        (log) => log.log_level === filterType && log.user_email === filterEmail
      );
      setFilteredLogs(filtered);
    }
  }, [filterType, filterEmail, currentLogs]);

  return (
    <table className="table-auto">
      <thead className="bg-gray-2 dark:bg-meta-4 rounded-sm">
        <tr>
          <th className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">ID</h5>
          </th>
          <th className="p-1 text-center xl:p-2">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Log Level
            </h5>
            <select
              onChange={(event) => {
                setFilterType(event.target.value);
              }}
              value={filterType}
              className="w-full font-thin text-xs rounded-sm border border-strokedark bg-transparent text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option key={0} value={"All"}>
                All
              </option>
              <option key={1} value={"TRACE"}>
                TRACE
              </option>
              <option key={2} value={"DEBUG"}>
                DEBUG
              </option>
              <option key={3} value={"INFO"}>
                INFO
              </option>
              <option key={4} value={"WARN"}>
                WARN
              </option>
              <option key={5} value={"ERROR"}>
                ERROR
              </option>
              <option key={6} value={"FATAL"}>
                FATAL
              </option>
            </select>
          </th>
          <th className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Client IP
            </h5>
          </th>
          <th className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              User Email
            </h5>
            <select
              onChange={(event) => {
                setFilterEmail(event.target.value);
              }}
              value={filterEmail}
              className="w-full font-thin text-xs rounded-sm border border-strokedark bg-transparent text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-stroborder-strokedarkdark dark:bg-form-input dark:text-white dark:focus:border-primary"
            >
              <option key={0} value={"All"}>
                All
              </option>
              {currentLogs
                // .filter((item, index, self) => self.indexOf(item) === index)
                .map((log) => (
                  <option key={log.id} value={log.user_email}>
                    {log.user_email}
                  </option>
                ))}
            </select>
          </th>
          <th className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Timestamp
            </h5>
          </th>
          <th className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Message
            </h5>
          </th>
          <th className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              User Agent
            </h5>
          </th>
        </tr>
      </thead>
      <tbody className={`border-b border-stroke dark:border-strokedark`}>
        {filteredLogs?.map((log: LOGS) => (
          <tr key={log.id}>
            <td className="text-center p-1 xl:p-2">
              <p className="text-black dark:text-white">{log.id}</p>
            </td>
            <td className="text-center p-1 xl:p-2">
              <p className="text-black dark:text-white">{log.log_level}</p>
            </td>
            <td className="text-center p-1 xl:p-2">
              <p className="text-black dark:text-white">{log.client_ip}</p>
            </td>
            <td className="text-center p-1 xl:p-2">
              <p className="text-black dark:text-white">{log.user_email}</p>
            </td>
            <td className="text-center p-1 xl:p-2">
              <p className="text-black dark:text-white">{log.timestamp}</p>
            </td>
            <td className="text-start p-1 xl:p-2">
              <p className="text-meta-10">{log.message}</p>
            </td>
            <td className="text-center p-1 xl:p-2">
              <p className="text-meta-5">{log.user_agent}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
