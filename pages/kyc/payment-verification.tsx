import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { useUserStore } from "../../stores/user-store";
import Link from "next/link";

const PaymentVerificationPage = () => {
  const router = useRouter();
  const userStore = useUserStore();

  useEffect(() => {
    userStore.fetch;
    if (userStore.user?.hasCompletedKyc) {
      router.push("/");
    }
  }, [userStore]);

  return (
    <div className="bg-gray-50 flex justify-center py-12 sm:px-6 lg:px-8">
      <div className="w-1/3 h-full bg-gray-100 px-8 py-10 rounded rounded-lg">
        <span className="text-lg font-bold text-gray-400">
          Step 2/3: Payment Verification
        </span>

        <div className="mt-5">
          <div className="flex w-all gap-3 mt-2">
            <span className="text-gray-500">
              At Fanatix, we take payment security seriously. To ensure that
              your transactions are safe and secure, we require all users to
              complete a payment verification process. This process involves
              submitting proof of your identity and payment information to our
              system.
            </span>
            <span className="text-gray-500">
              Payment verification is a one-time process that helps us ensure
              the safety and security of all transactions on our platform. Once
              you have completed the payment verification process, you will be
              able to use all of Fanatix&apos;s features, including buying and
              selling concert tickets, with confidence and peace of mind.
            </span>
          </div>
        </div>

        <div className="mt-10">
          <span className="text-lg font-bold">Requirements</span>
          <div className="text-gray-500 mt-2">
            <ul className="list-disc ml-4">
              <li>
                Cardholder name: This should match the name on the credit card.
              </li>
              <li>
                Credit card number: This is the unique 16-digit number on the
                front of the card.
              </li>
              <li>
                Expiration date: This is the month and year that the card will
                expire.
              </li>
              <li>
                CVV/CVC: This is the three-digit code on the back of the card.
              </li>
              <li>
                Billing address: This is the address where the credit card
                statement is sent.
              </li>
              <li>
                Phone number: This is the phone number associated with the
                billing address.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-2/3 h-full px-2">
        <div className="sm:mx-auto sm:w-full md:max-w-2xl mx-1">
          <span className="text-4xl font-bold text-gray-900">
            Verify your payment details
          </span>

          <form className="space-y-6 mt-10">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Cardholder Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Credit Card Number
              </label>
              <div className="mt-1">
                <input
                  id="cardno"
                  name="cardno"
                  type="cardno"
                  placeholder="x x x x  x x x x  x x x x  x x x x "
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex justify-around gap-2">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Expiry Date
                </label>
                <div className="mt-1">
                  <input
                    id="expiry"
                    name="expiry"
                    type="expiry"
                    placeholder="MM / YY"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  CVV
                </label>
                <div className="mt-1">
                  <input
                    id="cvv"
                    name="cvv"
                    type="cvv"
                    placeholder="x x x"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Billing Address
              </label>
              <div className="mt-1">
                <input
                  id="address"
                  name="address"
                  type="address"
                  placeholder=""
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="phone"
                  placeholder=""
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </form>

          <div className="flex justify-between gap-5 mt-10">
            <div>
              <Link href={"/"} passHref>
                <button className="w-full flex justify-center content-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Verify me later
                </button>
              </Link>
            </div>
            <div className="flex gap-2">
              <Link href={"/kyc/identity-verification"} passHref>
                <button className="w-full flex justify-center content-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Previous
                </button>
              </Link>
              <Link href={"/kyc/approval"} passHref>
                <button className="w-full flex justify-center content-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Continue
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentVerificationPage;
