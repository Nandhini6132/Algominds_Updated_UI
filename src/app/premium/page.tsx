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
      width: "550px",
      height: "300px",
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
      width: "600px",
      height: "350px",
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
        const update={
          name:user?.username || user?.fullName,
          email: user?.emailAddresses?.[0].emailAddress || user?.emailAddresses,
          isPremium: false,
          isSubscribedMonthly: false,
          isSubscribedYearly: false,
        }
        const response = await fetch(
          `/api/postPremiumMethod?email=${
            user?.emailAddresses?.[0].emailAddress || user?.emailAddresses
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
      <div className="container mt-14">
        <div>
          <h1
            className={`text-5xl font-serif text-center tracking-widest`}
            style={{ fontFamily: "cursive", fontWeight: "bold" }}
          >
            Premium
          </h1>
          <p className="text-center mt-7 font-bold text-slate-900">
            Get started with a AlgoMinds Subscription that works for you.
          </p>
        </div>

        <div>
          <div className="flex justify-around mt-20 items-center">
            {subscriptionDetails.map((subsc, index) => (
              <Card
                className="flex flex-col justify-between"
                style={{
                  width: subsc.width,
                  background: subsc.color,
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
                        className="px-2 py-1 flex rounded-sm font-medium"
                        style={{ background: "rgb(101 189 234)" }}
                      >
                        <span className="text-sm">{subsc.isPopluar}</span>
                      </div>
                    )}
                  </CardTitle>
                  <div className="text-black">
                    <CardDescription className="tracking-wide leading-6 text-black">
                      {subsc.description1}
                    </CardDescription>
                    {subsc.description2 && (
                      <CardDescription className="text-black">
                        {subsc.description2}
                      </CardDescription>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col items-start gap-8">
                  <div className="flex justify-between w-full items-center">
                    <span className="text-3xl font-semibold">
                      &#8377;{subsc.dollar}{" "}
                      <small className="font-light text-sm">/mo</small>
                    </span>
                    <span className="text-sm">Prices are marked in INR</span>
                  </div>
                  <Button
                    color="primary"
                    className="w-full"
                    onClick={() => handleSubscribeClick(subsc)}
                  >
                    {getButtonLabel(subsc)}
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
