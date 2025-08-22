"use client";

import { Mukta_Mahee } from "next/font/google";
import React, { ReactNode, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog } from "@mui/material";
import CheckOutAgreement from "@/components/checkoutAgreement/CheckOutAgreement";
import { useClerk } from "@clerk/nextjs";

type SubscriptionDetail = {
  width: string;
  height: string;
  color: string;
  plan: string;
  billing: string | ReactNode;
  description1: React.ReactNode;
  dollar: string;
  textColor?: string;
  isPopluar?: string;
  description2?: React.ReactNode;
};

const PremiumPage = () => {
  const [userSubscriptionPlan, setUserSubscriptionPlan] = useState({
    isSubscribedMonthly: false,
    isSubscribedYearly: false,
  });
  const { user } = useClerk();
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

          setUserSubscriptionPlan({
            isSubscribedMonthly: result.data[0].isSubscribedMonthly,
            isSubscribedYearly: result.data[0].isSubscribedYearly,
          });
        } else {
          setUserExists(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getPremiumUser();
  }, []);

  const subscriptionDetails = [
    {
      width: "485px",
      height: "315px",
      color: "rgb(238 238 238)",
      plan: "Monthly",
      billing: "billed Monthly",

      description1: (
        <>
          Our monthly plan grants access to <b>all premium features</b>, the
          best plan for short-term subscribers.
        </>
      ),
      dollar: "199",
    },
    {
      width: "485px",
      height: "315px",
      color: "linear-gradient(26deg, #bd5f6f, #64cbff 60%)",
      textColor: "white",
      plan: "Yearly",
      billing: <>billed Yearly (&#8377;1188)</>,
      isPopluar: "🎉 Most popular",
      description1: (
        <>
          Our <b>most popular</b> plan previously sold for billed Yearly
          &#8377;299 and is now only <b>&#8377;99/month</b>.
        </>
      ),
      description2: (
        <>
          This plan <b>saves you over 60%</b> in comparison to the monthly plan.
        </>
      ),
      dollar: "99",
    },
  ];

  const [open, setOpen] = useState(false);
  const [subscriptionDetail, setSubscriptionDetail] =
    useState<SubscriptionDetail | null>(null);
  console.log(subscriptionDetail, "subscriptionDetail");
  const [userExists, setUserExists] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleSubscribeClick = async (subscription: SubscriptionDetail) => {
    if (
      (userSubscriptionPlan.isSubscribedMonthly &&
        subscription.plan === "Monthly") ||
      (userSubscriptionPlan.isSubscribedYearly &&
        subscription.plan === "Yearly")
    ) {
      setOpen(false);
      setUserSubscriptionPlan({
        isSubscribedMonthly: false,
        isSubscribedYearly: false,
      });

      try {
        const update = {
          name: user?.username || user?.fullName,
          email: user?.emailAddresses?.[0].emailAddress || user?.emailAddresses,
          isPremium: false,
          isSubscribedMonthly: false,
          isSubscribedYearly: false,
        };
        const response = await fetch(
          `/api/postPremiumMethod?email=${user?.emailAddresses?.[0].emailAddress || user?.emailAddresses
          }`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(update),
          }
        );
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    } else {
      setOpen(true);
      setSubscriptionDetail(subscription);
    }
  };

  console.log(userSubscriptionPlan, "User subscription");
  const getButtonLabel = (subsc: any) => {
    if (userExists) {
      if (
        userSubscriptionPlan.isSubscribedMonthly &&
        subsc.plan === "Monthly"
      ) {
        return "Cancel Subscription";
      }
      if (userSubscriptionPlan.isSubscribedYearly && subsc.plan === "Yearly") {
        return "Cancel Subscription";
      }
    }
    return "Subscribe";
  };

  return (
    <main>
      <div className="ml-6">
        {/* <div>
          <h1
            className={`text-5xl font-serif text-center tracking-widest`}
            style={{ fontFamily: "cursive", fontWeight: "bold" }}
          >
            Premium
          </h1>
          <p className="text-center mt-7 font-bold text-slate-900">
            Get started with a AlgoMinds Subscription that works for you.
          </p>
        </div> */}

        <div>
          <div className="flex justify-between  items-center ">
            {subscriptionDetails?.map((subsc, index) => (
              <Card
                className={`flex flex-col justify-between rounded-none hover:border-[1px] py-3 hover:border-black shadow-none hover:shadow-[-5px_6px_0px_rgba(0,0,0)] transition-all duration-100 cursor-pointer`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  width: subsc.width,
                  // background: subsc.color,
                  height: subsc.height,
                }}
                key={index}
              >
                <CardContent className="flex flex-col gap-4 pt-7 ">
                  <CardTitle className="text-3xl font-light flex justify-between items-end">
                    <div>
                      {" "}
                      <span className="font-semibold">{subsc.plan} </span>
                      <span className="text-base font-medium">
                        {subsc.billing}
                      </span>{" "}
                    </div>
                    {subsc.isPopluar && (
                      <div
                        className="px-2 py-1 flex rounded-sm font-medium text-white"
                        style={{ background: "#000" }}
                      >
                        <span className="text-sm">{subsc.isPopluar}</span>
                      </div>
                    )}
                  </CardTitle>
                  <hr />
                  <div className="text-black">
                    <CardDescription className=" leading-6 text-black">
                      {subsc.description1}
                    </CardDescription>
                    {subsc.description2 && (
                      <CardDescription className="text-black">
                        {subsc.description2}
                      </CardDescription>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="p-6 h-20 ">
                  {/* <div className="flex justify-between w-full items-center">
                    <span className="text-3xl font-semibold">
                      &#8377;{subsc.dollar}{" "}
                      <small className="font-light text-sm">/mo</small>
                    </span>
                    <span className="text-sm">Prices are marked in INR</span>
                  </div> */}
                  <Button
                    color="primary"
                    className="w-full flex justify-between h-[60px] p-0 bg-[#F6F6F6] relative hover:bg-transparent rounded-none"
                    onClick={() => handleSubscribeClick(subsc)}
                  >
                    <div className="relative h-full w-[70%] flex items-center gap-2 overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-black transition-transform duration-100 ease-in-out flex items-center justify-center gap-2 ${hoveredIndex === index ? "translate-x-0" : "text-black translate-x-full "
                          }`}
                        style={{ zIndex: 10 }}
                      />
                      <span className={`relative z-10 text-[32px] font-normal indent-7 transition-colors duration-300 ${hoveredIndex===index?'text-white':'text-black'}`}>
                        Rs.{subsc.dollar}
                      </span>
                      <span className={`relative z-10 h-[70%] items-end flex py-1 ${hoveredIndex===index?'text-white':'text-black'}`}>
                        /month
                      </span>
                    </div>
                    <div className="h-full w-[30%] flex items-center bg-black justify-center absolute right-0">
                      {getButtonLabel(subsc)}
                    </div>
                  </Button>


                </CardFooter>
              </Card>
            ))}
          </div>

          <CheckOutAgreement
            setOpen={setOpen}
            open={open}
            subsc={subscriptionDetail}
            userExists={userExists}
            setUserExists={setUserExists}
            userSubscriptionPlan={userSubscriptionPlan}
            setUserSubscriptionPlan={setUserSubscriptionPlan}

          />
        </div>
      </div>
    </main>
  );
};

export default PremiumPage;
