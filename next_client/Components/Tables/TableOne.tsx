"use client";

import { LOGS } from "@/types/Logs";
import { useState, useEffect } from "react";
import { getLogsAction } from "@/Actions/Log_Actions";
import ReactPaginate from "react-paginate";

type LogProps = {
  currentLogs: LOGS[];
};

const Logs = ({ currentLogs }: LogProps) => {
  return (
    <>
      {currentLogs?.map((log: LOGS) => (
        <div
          className={`grid grid-cols-6 ${
            log.id === currentLogs.length - 1
              ? ""
              : "border-b border-stroke dark:border-strokedark"
          }`}
          key={log.id}
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
    </>
  );
};

const TableOne = ({ logsPerPage }: any) => {
  const [logs, setLogs] = useState<LOGS[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [logOffset, setLogOffset] = useState(0);

  const endOffset = logOffset + logsPerPage;
  const currentLogs = logs.slice(logOffset, endOffset);
  // const pageCount = Math.ceil(logs.length / logsPerPage);

  const handlePageClick = async (event: any) => {
    const data = await getLogsAction({
      page: event.selected + 1,
      per_page: 10,
    });
    setTotalPages(data.total_pages);
    setLogs(data.logs);
    const newOffset = (event.selected * logsPerPage) % logs.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setLogOffset(newOffset);
  };

  useEffect(() => {
    (async () => {
      const data = await getLogsAction({ page: 1, per_page: 10 });
      console.log("Total-Pages: ", data.total_pages);
      setTotalPages(data.total_pages);
      setLogs(data.logs);
    })();
  }, []);

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
        <Logs currentLogs={currentLogs} />
        <div className="flex justify-center mt-4">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next ->"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={totalPages}
            previousLabel="<- Previous"
            renderOnZeroPageCount={null}
            containerClassName="flex justify-center space-x-2"
            pageClassName="px-3 py-1 border border-gray-300 rounded"
            pageLinkClassName="text-black"
            previousClassName="px-3 py-1 border border-gray-300 rounded"
            previousLinkClassName="text-black"
            nextClassName="px-3 py-1 border border-gray-300 rounded"
            nextLinkClassName="text-black"
            breakClassName="px-3 py-1 border border-gray-300 rounded"
            breakLinkClassName="text-black"
            activeClassName="bg-meta-10 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default TableOne;
