import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "../ui/dialog";
import { CircleX, Cross, ShoppingCart } from "lucide-react";
// import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { FaGooglePay } from "react-icons/fa";
import { Input } from "../ui/input";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const CheckOutBill = ({
  isCheckOut,
  subsc,
  setIsCheckOut,
  userExists,
  setUserExists,
  userSubscriptionPlan,
  setUserSubscriptionPlan,
}: any) => {
  const { user } = useClerk();
  const router = useRouter();
  const [upi, setUPI] = useState("");

  const handleUpdatePremium = async () => {
    const premiumUpdate = {
      name: user?.username || user?.fullName,
      email: user?.emailAddresses?.[0].emailAddress || user?.emailAddresses,
      isPremium: true,
      isSubscribedMonthly: subsc.plan === "Monthly" ? true : false,
      isSubscribedYearly: subsc.plan === "Yearly" ? true : false,
    };
    try {
      if(userExists){
        const response= await fetch(`/api/postPremiumMethod?email=${user?.emailAddresses[0]?.emailAddress || user?.emailAddresses}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(premiumUpdate),
        })

        const result= await response.json()
        console.log(result);
        if (result?.success) {
          setTimeout(() => {
            setIsCheckOut(false);
            router.push("/");
          }, 2000);
        }
      }
      else{
        const response = await fetch(`api/postPremiumMethod`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...premiumUpdate, premiumUpdate }),
        });
        const result = await response.json();
        console.log(result);
        if (result?.success) {
          setTimeout(() => {
            setIsCheckOut(false);
            router.push("/");
          }, 2000);
        }
      }
    
    } catch (error) {
      console.log(error);
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
        console.log(result.data, "result");
        if (result.data.length > 0) {
          setUserExists(true);
          setUserSubscriptionPlan(result.data[0]);
        } else {
          setUserExists(false);
        }
      } catch (error) {
        console.log(error);
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

                    <div className="flex my-3 justify-between">
                      <h6 className="text-sm">GST</h6>
                      <h6>0</h6>
                    </div>

                    <div className="flex justify-between mt-16">
                      <h6>Order Total</h6>
                      <h6 className="text-2xl font-semibold">
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
              <div>
                <div>
                  <h1 className="font-semibold">Payment Method</h1>
                </div>

                <div>
                  <FaGooglePay className="text-5xl" />
                </div>

                <div className="mt-4">
                  <h2>Please fill in your billing information</h2>
                  <div className="flex gap-8 mt-3">
                    <Input placeholder="First Name" required />
                    <Input placeholder="Last Name" required />
                  </div>
                  <div className="mt-4">
                    <Input
                      value={
                        user?.emailAddresses?.[0]?.emailAddress ||
                        "user@gmail.com"
                      }
                      readOnly
                    />
                  </div>

                  <div className="mt-5">
                    <h6>Please enter your UPI id </h6>
                    <Input
                      placeholder="UPI id"
                      required
                      value={upi}
                      onChange={(e) => setUPI(e.target.value)}
                    />
                  </div>
                  <DialogFooter className="flex align-end mt-5">
                    <Button
                      className=""
                      disabled={upi === ""}
                      onClick={() => {
                        handleUpdatePremium();
                      }}
                    >
                      Check out
                    </Button>
                  </DialogFooter>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckOutBill;
