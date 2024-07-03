import Link from "next/link";
import React from "react";

const HomeComponent = () => {
  return (
    <div className="mt-40 me-9 flex justify-end">
      <div className="w-[50%] flex flex-col gap-8 text-center">
        <h1 className="text-white text-4xl">A New Way to Learn</h1>
        <p className="text-gray-400 leading-8">
          AlgoMinds is the best platform to help you enhance your skills, expand
          your knowledge and prepare for technical interviews.
        </p>
        <div>
          <Link href={"/sign-up"}>
            <button className="text-white bg-teal-600 px-4 py-1 rounded-full font-light">
              Create Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
