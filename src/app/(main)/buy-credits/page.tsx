"use client";
import { toast } from "react-toastify";
import { use, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { updateUserCredits } from "@/app/action";
import { UserDetailsContext } from "@/utils/user/state/user-details.context";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
const notify = (msg: string) => toast(msg);
const notifyError = (msg: string) => toast.error(msg);

export default function BuyCredits() {
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const { userData, setUserData } = use(UserDetailsContext);
  const { user } = useUser();
  const router = useRouter();

  const creditOptions = [
    { id: 1, price: 1.99, credits: 10 },
    { id: 2, price: 2.99, credits: 30 },
    { id: 3, price: 5.99, credits: 75 },
    { id: 4, price: 9.99, credits: 150 },
  ];

  async function onPaymentComplete() {
    const result = await updateUserCredits(
      user?.primaryEmailAddress?.emailAddress ?? "",
      Number(userData?.credits) + creditOptions[selectedOption].credits
    );
    console.log(result);

    setUserData((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        credits: Number(prev?.credits) + creditOptions[selectedOption].credits,
      };
    });

    if (result) {
      notify("Payment successful");
      router.replace("/dashboard");
    } else {
      notifyError("Payment failed");
    }
  }

  function onPaypalError() {
    notifyError("Payment failed");
  }

  return (
    <div className="text-center p-10 md:px-20 lg:px-40 min-h-screen">
      <h2 className="text-4xl font-bold text-primary">Add more Credits</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 items-center justify-center">
        <div>
          {creditOptions.map((option) => (
            <div
              key={option.id}
              className={`p-6 my-3 bg-orange-500 text-center text-white rounded-lg cursor-pointer transition-all duration-300  hover:scale-105 ${
                selectedOption === option.id ? "bg-orange-600" : "bg-orange-500"
              }`}
              onClick={() => setSelectedOption(option.id)}
            >
              <h2 className="text-2xl font-bold">
                Get {option.credits} Credits = {option.credits} story
              </h2>
              <p className="font-bold text-2xl">{option.price}$</p>
            </div>
          ))}
        </div>
        <div>
          {selectedOption && (
            <PayPalButtons
              style={{ layout: "vertical" }}
              onApprove={async () => await onPaymentComplete()}
              onError={onPaypalError}
              createOrder={(_, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value:
                          creditOptions[selectedOption - 1].price.toString(),
                        currency_code: "USD",
                      },
                    },
                  ],
                  intent: "CAPTURE",
                });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
