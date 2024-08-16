import { Dispatch, SetStateAction } from "react";
import QRCode from "react-qr-code";
import OTPInput from "react-otp-input";
import { setTwoFA } from "@/Actions/TwoFA_Actions";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";

type ModalProps = {
  showModal: boolean;
  // modalStyle: object;
  uri: string;
  token: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setToken: Dispatch<SetStateAction<string>>;
};

const TwoFA_Modal = ({
  showModal,
  // modalStyle,
  uri,
  token,
  setShowModal,
  setToken,
}: ModalProps) => {
  const { auth, setAuth }: any = useAuth();
  return (
    <>
      {showModal ? (
        <>
          <div
            className="fixed z-50 outline-none focus:outline-none "
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              position: "fixed", // Ensure the modal is positioned relative to the viewport
              zIndex: 50, // Ensure the modal is on top of other content
            }}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl  ">
              {/*content*/}
              <div className=" rounded-sm border border-stroke shadow-default relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                {!auth.twofa_enabled ? (
                  <>
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                      <h3 className="text-3xl font-semibold">Scan QR Code</h3>
                    </div>
                    <div className="relative p-6 flex-auto">
                      {uri?.length > 0 ? (
                        <QRCode
                          size={100}
                          style={{
                            height: "auto",
                            maxWidth: "100%",
                            width: "100%",
                          }}
                          value={uri}
                        />
                      ) : null}
                    </div>
                  </>
                ) : (
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-3xl font-semibold">Enter Token</h3>
                  </div>
                )}
                <div className="relative w-full flex flex-col justify-center items-center mt-2">
                  <span className="mb-2">Confirmation</span>
                  <OTPInput
                    value={token}
                    onChange={setToken}
                    numInputs={6}
                    renderInput={(props) => (
                      <input
                        {...props}
                        className="w-full mx-1 rounded-md border border-strokedark bg-transparent py-1 text-center text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    )}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-around p-6 rounded-b">
                  {auth.twofa_enabled ? (
                    <button
                      className=" cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90 disabled:bg-strokedark disabled:border-strokedark"
                      type="button"
                      disabled={token.length < 6}
                      onClick={async () => {
                        const res = await setTwoFA(false, token);
                        if (res.success) {
                          toast.success(`${res.message}`, {
                            position: "bottom-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          });
                        } else if (!res.success) {
                          toast.error(`${res.message}`, {
                            position: "bottom-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          });
                        }
                        setAuth((prev: any) => ({
                          ...prev,
                          twofa_enabled: false,
                        }));
                        setShowModal(false);
                      }}
                    >
                      Disable
                    </button>
                  ) : (
                    <button
                      className=" cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90 disabled:bg-strokedark disabled:border-strokedark"
                      type="button"
                      disabled={token.length < 6}
                      onClick={async () => {
                        const res = await setTwoFA(true, token);
                        console.log("Res:....", res.status);
                        if (res.success) {
                          toast.success(`${res.message}`, {
                            position: "bottom-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          });
                        } else if (!res.success) {
                          toast.error(`${res.message}`, {
                            position: "bottom-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          });
                        }
                        setAuth((prev: any) => ({
                          ...prev,
                          twofa_enabled: true,
                        }));
                        setShowModal(false);
                      }}
                    >
                      Enable
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setShowModal(false);
                    }}
                    className="cursor-pointer rounded-lg border border-meta-1 bg-meta-1 p-2 text-white transition hover:bg-opacity-90 disabled:bg-strokedark disabled:border-strokedark"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default TwoFA_Modal;
