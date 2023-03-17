import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { useUserStore } from "../../stores/user-store";
import Link from "next/link";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/20/solid";

const ApprovalPage = () => {
  const router = useRouter();
  const userStore = useUserStore();

  useEffect(() => {
    userStore.fetch;
    if (userStore.user?.hasCompletedKyc) {
      router.push("/");
    }
  }, [userStore, router]);

  const handleClick = async () => {
    await axios.put("/api/users/" + userStore.user?.id, {
      hasCompletedKyc: true,
    });
  };

  return (
    <div className="bg-gray-50 flex justify-center py-12 sm:px-6 lg:px-8">
      <div className="w-1/3 h-full bg-gray-100 px-8 py-10 rounded rounded-lg">
        <span className="text-lg font-bold text-gray-400">
          Step 3/3: Pending Approval
        </span>

        <div className="mt-10">
          <div className="w-all gap-3 mt-2">
            <p className="text-gray-500">
              Thank you for your interest in using Fanatix. We have received
              your KYC (Know Your Customer) information and it is currently
              pending approval. Once your KYC information has been verified, you
              will be able to access all of the features of our platform,
              including buying and selling concert tickets.
            </p>
            <p className="mt-2 text-gray-500">
              We take the verification of our users very seriously, and it may
              take some time to fully verify your account. We appreciate your
              patience as we work to ensure the security and integrity of our
              platform. Please note that if your KYC information is incomplete
              or inaccurate, your account may be rejected. We recommend
              double-checking all of your information before submitting it for
              verification. Thank you for choosing Fanatix as your ticketing
              platform.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <span className="text-lg font-bold">Status</span>
          <div className="text-gray-500 mt-2">
            We are currently verifying your{" "}
            <span className="font-bold">address</span>
          </div>
        </div>
      </div>

      <div className="w-2/3 h-full px-2">
        <div className="sm:mx-auto sm:w-full md:max-w-2xl mx-1">
          <span className="text-4xl font-bold text-gray-900">
            Thank you for submitting your documents!
          </span>

          <div className="w-1/2 mx-auto">
            <ClipboardDocumentCheckIcon className="text-blue-200" />
          </div>

          <div className="flex justify-between gap-5 mt-10">
            <Link href={"/"} passHref>
              <button
                onClick={handleClick}
                className="w-full flex justify-center content-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Return back to home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalPage;
