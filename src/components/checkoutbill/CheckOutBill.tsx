import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe("pk_test_51PhsYnRpatdBPlBe2rrdMz2wWxhWBpwu2fHrPeIh8rGC48vHqlCGSEeXahpDu15jHUruuMGhzS5fvKjk3fHAqNME00AJaf70TB");

const CheckoutForm = ({ subsc, handleUpdatePremium }:any) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event:any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (!error) {
      handleUpdatePremium(paymentMethod.id);
    } else {
      console.error(error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" disabled={!stripe}>Pay Now</Button>
    </form>
  );
};

const CheckOutBill = ({
  isCheckOut,
  subsc,
  setIsCheckOut,
  userExists,
  setUserExists,
  userSubscriptionPlan,
  setUserSubscriptionPlan,
}:any) => {
  const { user } = useClerk();
  const router = useRouter();

  const handleUpdatePremium = async (paymentMethodId:any) => {
    const premiumUpdate = {
      name: user?.username || user?.fullName,
      email: user?.emailAddresses?.[0].emailAddress || user?.emailAddresses,
      isPremium: true,
      isSubscribedMonthly: subsc.plan === "Monthly",
      isSubscribedYearly: subsc.plan === "Yearly",
      paymentMethodId,
    };

    try {
      const response = await fetch(`/api/postPremiumMethod?email=${user?.emailAddresses}`, {
        method: userExists ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(premiumUpdate),
      });

      const result = await response.json();
      console.log(result, 'result')
      if (result?.success) {
        setTimeout(() => {
          setIsCheckOut(false);
          router.push("/");
        }, 2000);
      } else {
        toast.error("Failed to update premium status.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    async function getPremiumUser() {
      try {
        const response = await fetch(
          `api/postPremiumMethod?email=${user?.emailAddresses}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        if (result.data.length > 0) {
          setUserExists(true);
          setUserSubscriptionPlan(result.data[0]);
        } else {
          setUserExists(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getPremiumUser();
  }, [user]);

  return (
    <>
      <ToastContainer />
      <Dialog open={isCheckOut} onOpenChange={() => setIsCheckOut(false)}>
        <DialogContent className="min-w-[700px]">
          <DialogTitle className="flex gap-2 border-y-gray-500 border-b-2 items-center">
            <ShoppingCart /> <span>Checkout</span>
          </DialogTitle>

          <div className="flex gap-8">
            <div className="w-[40%]">
              <div className="bg-blue-100 p-3 rounded-sm">
                <div className="bg-white flex">
                  <div className="bg-black m-1 rounded border-b-2  h-12 flex items-center p-1">
                    <h6 className="text-white text-xs">Premium</h6>
                  </div>
                  <div>
                    <h2>
                      {subsc?.plan === "Yearly"
                        ? "Yearly Subscription"
                        : "Monthly Subscription"}
                    </h2>
                    <h3>
                      &#8377;
                      {subsc?.plan === "Yearly"
                        ? subsc.dollar * 12
                        : subsc?.dollar}
                    </h3>
                  </div>
                </div>

                <div className="mt-3">
                  <div>
                    <h6 className="text-sm font-semibold">Order summary</h6>
                    <div className="flex justify-between mt-3">
                      <h6 className="text-sm">Original price</h6>
                      <h6>
                        &#8377;
                        {subsc?.plan === "Yearly"
                          ? subsc?.dollar * 12
                          : subsc?.dollar}
                        .00
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[60%]">
              <div className="flex flex-col gap-3">
                <div className="text-base font-semibold">
                  Select Payment method
                </div>

                <div className="flex flex-col gap-4">
                  <Elements stripe={stripePromise}>
                    <CheckoutForm subsc={subsc} handleUpdatePremium={handleUpdatePremium} />
                  </Elements>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex justify-end mt-3">
            <Button className="px-7" onClick={() => setIsCheckOut(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckOutBill;


