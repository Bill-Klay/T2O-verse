"use client";

import React, { useRef, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Breadcrumb from "@/Components/Breadcrumbs/Breadcrumb";
import QRCode from "react-qr-code";
import { getURI } from "@/Actions/getUriAction";
import OTPInput from "react-otp-input";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const { auth }: any = useAuth();
  const profileRef = useRef<HTMLDivElement>(null);
  const [modalStyle, setModalStyle] = useState({});
  const [uri, setURI] = useState("");
  const [token, setToken] = useState("");

  const handleClick = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (showModal && profileRef.current) {
      const rect = profileRef.current.getBoundingClientRect();
      setModalStyle({
        top: rect.top + window.scrollY + rect.height / 2,
        left: rect.left + window.scrollX + rect.width / 2,
        transform: "translate(-50%, 20%)",
      });
    }
  }, [showModal]);

  return (
    <>
      {/* MODAL */}
      {showModal ? (
        <>
          <div
            className="fixed z-50 outline-none focus:outline-none "
            style={modalStyle}
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl  ">
              {/*content*/}
              <div className=" rounded-sm border border-stroke shadow-default relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
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
                <div className="relative w-full flex flex-col justify-center items-center">
                  <span>Confirmation</span>
                  <OTPInput
                    value={token}
                    onChange={setToken}
                    numInputs={6}
                    renderSeparator={<span>--</span>}
                    renderInput={(props) => (
                      <input
                        {...props}
                        className="w-full rounded-md border border-strokedark bg-transparent py-1 text-center text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    )}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 rounded-b">
                  <button
                    className=" cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90 disabled:bg-strokedark disabled:border-strokedark"
                    type="button"
                    disabled={token === ""}
                    onClick={() => setShowModal(false)}
                  >
                    Enable
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {/* Modal END */}
      <div ref={profileRef} className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Profile" />

        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {auth.username}
              </h3>
              <p className="font-medium">
                {auth.first_name + " " + auth.last_name}
              </p>
              <div className="mx-auto max-w-180 mt-5">
                <h4 className="font-semibold text-black dark:text-white">
                  Roles
                </h4>
                {auth.roles?.map((role: string) => (
                  <p className="mt-4.5" key={role}>
                    {role}
                  </p>
                ))}
              </div>

              <div className="mt-6.5">
                <h4 className="mb-3.5 font-medium text-black dark:text-white">
                  Two-Factor Authentication:
                </h4>
                <div className="flex items-center justify-center gap-3.5">
                  <button
                    onClick={async () => {
                      handleClick();
                      const result = await getURI();
                      console.log(result);
                      setURI(result);
                    }}
                    disabled={auth.twofa_enabled}
                    className="w-[20%] cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90 disabled:bg-strokedark disabled:border-strokedark"
                  >
                    {auth.twofa_enabled ? "Two_Fa is Enabled" : "Enable Two_Fa"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
