"use client";

import { LOGS } from "@/types/Logs";
import { useState, useEffect } from "react";
import { getLogsAction } from "@/Actions/Log_Actions";
import Table from "@/Components/Tables/LogTable/PagionationCmp";
import { Logs } from "@/Components/Tables/LogTable/LogsCmp";

const LogTablePage = () => {
  const [logs, setLogs] = useState<LOGS[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [logOffset, setLogOffset] = useState(0);
  const logsPerPage = 10;

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
    <Table handlePageClick={handlePageClick} total_pages={totalPages}>
      <Logs currentLogs={currentLogs} />
    </Table>
  );
};

export default LogTablePage;
