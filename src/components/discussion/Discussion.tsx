import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Avatar } from "@mui/material";

interface DiscussionData {
  discussion: string;
  questionId: string;
  userId: string;
  userName: string;
}

const Discussion = () => {
  const [discussion, setDiscussion] = useState<string>("");
  const [discussions, setDiscussions] = useState<DiscussionData[]>([]);
  const { id } = useParams();
  const { user } = useUser();
  const idds = id.toString();
  const router = useRouter();

  useEffect(() => {
    getDiscussions();
  }, []);

  const handlePostDiscussion = async () => {
    const discussionObject: DiscussionData = {
      questionId: idds,
      userName: user?.username || "",
      discussion: discussion,
      userId: user?.id || "",
    };

    const response = await fetch("/api/dicussionPostMethod", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discussionObject),
    });

    const result = await response.json();
    if (result.success) {
      getDiscussions();
      setDiscussion("");
    }
    console.log(result);
  };

  async function getDiscussions() {
    const response = await fetch(`/api/discussionGetMethod?id=${idds}`);
    const result = await response.json();
    setDiscussions(result.data);
  }

  return (
    <div className="h-[83%] relative overflow-auto">
      <div className="flex flex-col gap-5">
        {discussions && discussions.length > 0 ? (
          discussions.map((disc: DiscussionData, index) => (
            <div>
             <div className="flex items-center gap-3"> <Avatar/> <p>{disc.userName}</p></div>
            <h3 key={index} className="ml-12">{disc.discussion}</h3>
            <div><hr/></div>
            </div>
          ))
        ) : (
          <p>No discussions</p>
        )}
      </div>
      <div className={`fixed bottom-[80px] flex w-[45%] gap-10 ml-8`}>
        <Input
          type="text"
          value={discussion}
          onChange={(e) => setDiscussion(e.target.value)}
        />
        <Button onClick={handlePostDiscussion}>Post query</Button>
      </div>
    </div>
  );
};

export default Discussion;
