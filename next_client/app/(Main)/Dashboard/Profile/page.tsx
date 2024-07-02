"use client";

import React, { useRef, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Breadcrumb from "@/Components/Breadcrumbs/Breadcrumb";
import QRCode from "react-qr-code";
import { getCookie } from "cookies-next";
import { getURI } from "@/Actions/getUriAction";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const { auth }: any = useAuth();
  const profileRef = useRef<HTMLDivElement>(null);
  const [modalStyle, setModalStyle] = useState({});
  const [uri, setURI] = useState("");

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

  // useEffect(() => {
  //   (async () => {
  //     if (showModal) {
  //       const CSRFToken = getCookie("X-CSRFToken");
  //     }
  //   })();
  // }, [showModal]);

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
                  {/* <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button> */}
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {/* <p className="my-4 text-center text-blueGray-500 text-lg leading-relaxed">
                    QR CODE HERE
                  </p> */}
                  {uri?.length > 0 ? (
                    <QRCode
                      size={100}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={uri}
                      // viewBox={`0 0 256 256`}
                    />
                  ) : null}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-center p-6 rounded-b">
                  <button
                    className=" cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90 disabled:bg-strokedark disabled:border-strokedark"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Done
                  </button>
                  {/* <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button> */}
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
