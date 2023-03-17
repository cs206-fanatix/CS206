import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUserStore } from "../../stores/user-store";
import Link from "next/link";

const KycPage = () => {
  const router = useRouter();
  const userStore = useUserStore();

  useEffect(() => {
    userStore.fetch;
    if (userStore.user?.hasCompletedKyc) {
      router.push("/");
    }
  }, []);

  return (
    <div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full md:max-w-2xl mx-1">
        <h1 className="text-center text-5xl font-extrabold text-gray-900">
          Hello {userStore.user?.name}.
        </h1>
        <p className="text-center mt-10">
          We appreciate your interest in using Fanatix. We would like to remind
          you that your account is not yet verified. Although you can still
          access basic functions, such as purchasing tickets, we highly
          recommend verifying your account to enhance your personal experience
          on our platform. Don&apos;t miss out on the full Fanatix experience!
        </p>

        <h2 className="text-2xl mt-10 text-center">
          Benefits of getting verified:
        </h2>

        <div className="flex gap-5 mt-4">
          <div className="bg-white rounded-lg shadow-md p-6 w-full sm:w-64">
            <h3 className="text-xl font-semibold mb-4">Early Access</h3>
            <ul className="text-gray-600 list-disc ml-4">
              <li>Get early access to ticket sales.</li>
              <li>Get notified for upcoming concerts.</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 w-full sm:w-64">
            <h3 className="text-xl font-semibold mb-4">Increased Limits</h3>
            <ul className="text-gray-600 list-disc ml-4">
              <li>
                Get increased purchasing ticket limits from 1 to 4 tickets!.
              </li>
              <li>Get increased transaction limits up to $1000.</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 w-full sm:w-64">
            <h3 className="text-xl font-semibold mb-4">Rewards</h3>
            <ul className="text-gray-600 list-disc ml-4">
              <li>Get access to presales by your favourite artists.</li>
              <li>Earn points from every concert ticket purchased.</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-between gap-5 mt-10">
          <Link href={"/kyc/identity-verification"} passHref>
            <button className="w-full flex justify-center content-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Verify me now!
            </button>
          </Link>
          <Link href={"/"} passHref>
            <button className="w-full flex justify-center content-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Proceed as an unverified user.
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KycPage;
