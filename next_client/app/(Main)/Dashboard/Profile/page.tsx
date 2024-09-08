"use client";

import React, { useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Breadcrumb from "@/Components/Breadcrumbs/Breadcrumb";
import { getURI } from "@/Actions/TwoFA_Actions";
import TwoFA_Modal from "@/Components/Modals/TwoFA_Modal";
import Image from "next/image";

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const { auth, setAuth }: any = useAuth();
  const profileRef = useRef<HTMLDivElement>(null);
  // const [modalStyle, setModalStyle] = useState({});
  const [uri, setURI] = useState("");
  const [token, setToken] = useState("");

  const handleClick = () => {
    setShowModal(!showModal);
  };

  // useEffect(() => {
  //   if (showModal && profileRef.current) {
  //     const rect = profileRef.current.getBoundingClientRect();
  //     setModalStyle({
  //       top: rect.top + window.scrollY + rect.height / 2,
  //       left: rect.left + window.scrollX + rect.width / 2,
  //       transform: "translate(-50%, 20%)",
  //     });
  //   }
  // }, [showModal]);

  return (
    <>
      {/* MODAL */}
      <TwoFA_Modal
        showModal={showModal}
        setShowModal={setShowModal}
        // modalStyle={modalStyle}
        uri={uri}
        token={token}
        setToken={setToken}
      />
      {/* Modal END */}
      <div ref={profileRef} className="mx-auto max-w-242.5">
        <Breadcrumb pageName="Profile" />

        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <Image
            src={"/images/coverImg/cover-01.png"}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            width={970}
            height={260}
            style={{
              width: "auto",
              height: "auto",
            }}
          />
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="mt-8">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {auth.first_name + " " + auth.last_name}
              </h3>
              <p className="font-semibold text-2xl">{auth.username}</p>
              <div className="mx-auto max-w-180 mt-5 space-x-2">
                <h4 className="font-semibold text-black dark:text-white">
                  Roles:
                </h4>
                {auth.roles?.map((role: string) => (
                  <p
                    className="inline-block text-black dark:text-white font-semibold "
                    key={role}
                  >
                    {role}
                  </p>
                ))}
              </div>

              <div className="mt-6.5">
                <h4 className="mb-2 font-medium text-black dark:text-white">
                  Two-Factor Authentication
                </h4>
                <div className="flex items-center justify-center gap-3.5">
                  {auth.twofa_enabled ? (
                    <button
                      onClick={async () => {
                        handleClick();
                      }}
                      className="w-[20%] cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90 disabled:bg-strokedark disabled:border-strokedark"
                    >
                      Disable 2FA
                    </button>
                  ) : (
                    <button
                      onClick={async () => {
                        handleClick();
                        const result = await getURI();
                        console.log(result);
                        setURI(result);
                      }}
                      className="w-[20%] cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90 disabled:bg-strokedark disabled:border-strokedark"
                    >
                      Enable 2FA
                    </button>
                  )}
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
