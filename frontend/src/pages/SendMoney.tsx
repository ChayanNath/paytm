import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");
  const userName = searchParams.get("name");
  const { toast } = useToast();
  const navigate = useNavigate();
  const [amount, setAmount] = useState<string>("");

  const user = {
    _id: userId,
    firstName: userName?.split(" ")[0] || "Unknown",
    lastName: userName?.split(" ")[1] || "User",
  };

  const handleSendMoney = async () => {
    try {
      console.log("Sending money...");
      const response = await axios.post(
        "/api/v1/account/transfer",
        {
          amount: amount,
          toId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Money sent successfully:", response.data);
      toast({
        title: "Money sent successfully!",
        description: `Rs.${amount} has been successfully sent to ${userName}.`,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Error sending money:", error);
      toast({
        title: "Error sending money.",
        description:
          "There was an issue processing your request. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <Card className="w-[350px]">
        <CardHeader className="text-2xl justify-self-center pb-10">
          Send Money
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-2 items-center mb-3">
            <Avatar>
              <AvatarFallback>
                {user.firstName.charAt(0).toUpperCase() +
                  user.lastName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">
              {user.firstName} {user.lastName}
            </h2>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="amount">Amount (in Rs)</Label>
            <Input
              id="amount"
              placeholder="Enter amount"
              type="number"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSendMoney}>
            Initiate Transfer
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SendMoney;
