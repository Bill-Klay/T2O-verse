import { LOGS } from "@/types/Logs";

type LogProps = {
  currentLogs: LOGS[];
};

export const Logs = ({ currentLogs }: LogProps) => {
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
