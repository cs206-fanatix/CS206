import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { useUserStore } from "../../stores/user-store";
import Link from "next/link";

const IdentityVerificationPage = () => {
  const router = useRouter();
  const userStore = useUserStore();

  useEffect(() => {
    if (userStore.user == null) {
      userStore.fetch();
    }
    if (userStore.user?.hasCompletedKyc) {
      router.push("/");
    }
  }, [userStore, router]);

  return (
    <div className="bg-gray-50 flex justify-center py-12 sm:px-6 lg:px-8">
      <div className="w-1/3 h-full bg-gray-100 px-8 py-10 rounded-lg">
        <span className="text-lg font-bold text-gray-400">
          Step 1/3: Identity Verification
        </span>

        <div className="mt-10">
          <span className="text-lg font-bold">
            Your uploaded document must confirm
          </span>
          <div className="flex w-all gap-3 mt-2">
            <div className="text-gray-500">
              <ul>
                <li>Full Name</li>
                <li>Residence</li>
                <li>Date Of Birth</li>
              </ul>
            </div>
            <div>
              <ul className="font-bold">
                <li>{userStore.user?.name}</li>
                <li>Singapore</li>
                <li>DD-MM-YYYY</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <span className="text-lg font-bold">Image requirements</span>
          <div className="text-gray-500 mt-2">
            <ul className="list-disc ml-4">
              <li>File size should be up to 1MB</li>
              <li>Clear and readable file</li>
              <li>JPEG, PNG or PDF format</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-2/3 h-full px-2">
        <div className="sm:mx-auto sm:w-full md:max-w-2xl mx-1">
          <span className="text-4xl font-bold text-gray-900">
            Verify your identity
          </span>

          <form className="space-y-6 mt-10">
            <div className="flex justify-around gap-2">
              <div className="w-full">
                <span className="block text-sm font-medium text-gray-500">
                  Document Type
                </span>
                <select
                  id="document"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="1">NRIC</option>
                  <option value="2">FIN</option>
                  <option value="3">Passport</option>
                  <option value="4">Driver&apos;s License</option>
                </select>
              </div>
              <div className="w-full">
                <span className="block text-sm font-medium text-gray-500">
                  Country of Issue
                </span>
                <select
                  id="country"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="1">Singapore</option>
                  <option value="2">United States</option>
                  <option value="3">Russia</option>
                  <option value="4">China</option>
                </select>
              </div>
            </div>
          </form>

          <div className="flex items-center justify-center w-full mt-10">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  JPEG, PNG of PDF (MAX. 1MB)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>

          <div className="flex justify-between gap-5 mt-10">
            <div>
              <Link href={"/"} passHref>
                <a className="w-full flex justify-center content-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Verify me later
                </a>
              </Link>
            </div>
            <div className="flex gap-2">
              <Link href={"/kyc"} passHref>
                <a className="w-full flex justify-center content-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Previous
                </a>
              </Link>
              <Link href={"/kyc/payment-verification"} passHref>
                <a className="w-full flex justify-center content-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Continue
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityVerificationPage;
