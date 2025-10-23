// ...existing code...
"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import axios from "axios";
import EmptyBoxState from "./EmptyBoxState";
import GroupSizeUi from "./GroupSizeUi";
import BudgetUi from "./BudgetUi";
import SelectDays from "./SelectDays";
import FinalUi from "./FinalUi";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";

type Message = {
  role: string;
  content: string;
  ui?: string;
};

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFinal, setIsFinal] = useState(false);
  const [tripDetail, setTripDetail] = useState<any | null>(null);
  const { user } = useUser();

  const SaveTripDetail = useMutation(api.Tripdetail.CreateTripDetail);

  const Onsend = async () => {
    if (!userInput.trim() || isLoading) return;

    const newMsg: Message = {
      role: "user",
      content: userInput,
    };

    setMessages((prev: Message[]) => [...prev, newMsg]);
    setUserInput("");
    setIsLoading(true);

    try {
      const res = await axios.post("/api/aimodel", {
        messages: [...messages, newMsg],
      });

      const respText = res?.data?.resp;
      const respUi = res?.data?.ui;
      const trip_plan = res?.data?.trip_plan;

      if (respText) {
        setMessages((prev: Message[]) => [
          ...prev,
          {
            role: "assistant",
            content: respText,
            ui: respUi,
          },
        ]);
      }

      // if the API returned a trip plan, save it to Convex
      if (trip_plan) {
        setTripDetail(trip_plan);
        const tripid = uuidv4();
        try {
          await SaveTripDetail({
            tripDetail: trip_plan,
            tripId: tripid,
            uid: user?.id ?? null,
          });
        } catch (saveErr) {
          console.error("Error saving trip detail:", saveErr);
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev: Message[]) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const RenderGenerativeUi = (ui: string) => {
    if (ui == "budget") {
      return <BudgetUi onSelectedOption={(v: string) => { setUserInput(v); Onsend(); }} />;
    } else if (ui == "groupSize") {
      return <GroupSizeUi onSelectedOption={(v: string) => { setUserInput(v); Onsend(); }} />;
    } else if (ui == "tripDuration") {
      return <SelectDays onSelectedOption={(v: string) => { setUserInput(v); Onsend(); }} />;
    } else if (ui == "Final") {
      return <FinalUi viewTrip={() => console.log("View Trip")} />;
    } else {
      return null;
    }
  };

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.ui === "Final") {
      setIsFinal(true);
    }
  }, [messages]);

  return (
    <div className="h-[80vh] flex flex-col">
      {messages?.length === 0 && (
        <EmptyBoxState onSelectOption={(v: string) => { setUserInput(v); Onsend(); }} />
      )}
      <section className="flex-1 overflow-y-auto p-4">
        {messages.map((msg: Message, index) =>
          msg.role === "user" ? (
            <div className="flex justify-end mt-2" key={index}>
              <div className="max-w-lg bg-primary text-white py-2 px-4 rounded-lg ">
                {msg.content}
              </div>
            </div>
          ) : (
            <div className="flex justify-start mt-2" key={index}>
              <div className="max-w-lg bg-gray-100 text-black py-2 px-4 rounded-lg ">
                {msg.content}
                {RenderGenerativeUi(msg.ui ?? "")}
              </div>
            </div>
          )
        )}

        {isLoading && (
          <div className="flex justify-start mt-2">
            <div className="max-w-lg bg-gray-100 text-black py-2 px-4 rounded-lg ">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                <span>AI is typing...</span>
              </div>
            </div>
          </div>
        )}
      </section>
      <section>
        <div className="border rounded-2xl p-4 shadow relative">
          <Textarea
            placeholder="Create a trip For Paris To Newyork"
            className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            onChange={(event) => setUserInput((event.target as HTMLTextAreaElement).value)}
            value={userInput}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                Onsend();
              }
            }}
          />
          <Button
            size={"icon"}
            className="absolute bottom-6 right-6"
            onClick={() => Onsend()}
            disabled={isLoading || !userInput.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ChatBox;
// ...existing code...