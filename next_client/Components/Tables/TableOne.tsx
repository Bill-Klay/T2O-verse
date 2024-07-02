import { LOGS } from "@/types/Logs";
import Image from "next/image";

const logData: LOGS[] = [
  {
    id: 1,
    timestamp: "2024-07-01 06:33:02.262918",
    log_level: "INFO",
    message:
      "Before Request: POST http://localhost:5000/login - Client IP: 127.0.0.1 - User Agent: Thunder Client (https://www.thunderclient.com)",
    client_ip: "127.0.0.1",
    user_agent: "Thunder Client (https://www.thunderclient.com)",
  },
  {
    id: 2,
    timestamp: "2024-07-01 06:33:02.574180",
    log_level: "INFO",
    message:
      "Before Request: POST http://localhost:5000/login - Client IP: 127.0.0.1 - User Agent: Thunder Client (https://www.thunderclient.com)",
    client_ip: "127.0.0.1",
    user_agent: "Thunder Client (https://www.thunderclient.com)",
  },
  {
    id: 3,
    timestamp: "2024-07-01 06:33:02.726179",
    log_level: "INFO",
    message:
      "Before Request: POST http://localhost:5000/login - Client IP: 127.0.0.1 - User Agent: Thunder Client (https://www.thunderclient.com)",
    client_ip: "127.0.0.1",
    user_agent: "Thunder Client (https://www.thunderclient.com)",
  },
  {
    id: 4,
    timestamp: "2024-07-01 06:41:50.547266",
    log_level: "INFO",
    message:
      "After Request: POST http://localhost:5000/update_twofa - Client IP: 127.0.0.1 - User Agent: Thunder Client (https://www.thunderclient.com)",
    client_ip: "127.0.0.1",
    user_agent: "Thunder Client (https://www.thunderclient.com)",
  },
  {
    id: 5,
    timestamp: "2024-07-01 06:42:59.952625",
    log_level: "INFO",
    message:
      "After Request: POST http://localhost:5000/update_twofa - Client IP: 127.0.0.1 - User Agent: Thunder Client (https://www.thunderclient.com)",
    client_ip: "127.0.0.1",
    user_agent: "Thunder Client (https://www.thunderclient.com)",
  },
];

const TableOne = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-2 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Logs
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-6 rounded-sm bg-gray-2 dark:bg-meta-4">
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">ID</h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Timestamp
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Log Level
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Message
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Client IP
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              User Agent
            </h5>
          </div>
        </div>

        {logData.map((log, key) => (
          <div
            className={`grid grid-cols-6 ${
              key === logData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{log.id}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{log.timestamp}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{log.log_level}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-10">{log.message}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{log.client_ip}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-5">{log.user_agent}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
