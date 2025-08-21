import React, { useState } from "react";
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
import { Checkbox } from "@mui/material";
import CheckOutBill from "../checkoutbill/CheckOutBill";

const CheckOutAgreement = ({ setOpen, open, subsc, userExists, setUserExists, userSubscriptionPlan, setUserSubscriptionPlan }: any) => {
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [isCheckOut, setIsCheckOut]= useState(false)
  
  return (
   <>
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="w-[600px]">
        <DialogTitle className="flex gap-2 border-y-gray-500 border-b-2 items-center">
          <ShoppingCart /> <span>Checkout</span>
        </DialogTitle>

        <DialogHeader className="h-[90%] overflow-auto">
          <h5 className="text-center text-xl">Agreement</h5>
          <DialogDescription>
            <div>
              <h1 className="text-base text-black mb-4">Subscription policy</h1>
              <ul className="flex flex-col gap-6">
                <li>
                  By starting the Premium Subscription, you agree to our Terms
                  of Service and Privacy Statement. You may cancel at any time
                  during your subscription.
                </li>

                <li>
                  There are no refunds for any amounts that have been charged
                  for subscription cancellation.
                </li>

                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                  doloremque accusamus illo officia quo debitis quisquam
                  asperiores reiciendis harum tempore.
                </li>

                <li>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Exercitationem dolore aut repudiandae consequuntur obcaecati
                  provident rem dolorum nemo quidem velit adipisci, illum
                  dignissimos tempora architecto ex repellat eos molestiae
                  facilis quam porro!
                </li>
              </ul>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex text-start">
          <div className="flex justify-between w-full items-center">
            <div className="flex space-x-2 items-start items-center">
              <Checkbox
                id="terms"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>

            <Button className="" disabled={!isAgreed} onClick={()=>{
                setOpen(false)
                setIsCheckOut(true)
            }}>
              Continue
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <CheckOutBill isCheckOut={isCheckOut} setIsCheckOut={setIsCheckOut} subsc={subsc} userExists={userExists} setUserExists={setUserExists} userSubscriptionPlan={userSubscriptionPlan} setUserSubscriptionPlan={setUserSubscriptionPlan}/>
   </>
  );
};

export default CheckOutAgreement;




