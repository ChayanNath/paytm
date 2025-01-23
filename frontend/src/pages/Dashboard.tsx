import Header from "@/components/Header";
import axiosInstance from "@/api/axiosInstance";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Users } from "./Users";

const Dashboard = () => {
  const [balance, setBalance] = useState<number>(0);

  const { toast } = useToast();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axiosInstance.get("/account/balance");
        setBalance(response.data.balance);
      } catch (err) {
        console.error("Failed to fetch balance:", err);
        toast({
          title: "Error fetching balance.",
        });
      }
    };
    fetchBalance();
  }, [toast]);

  return (
    <div>
      <Header />

      <div className="flex flex-col gap-4 p-4">
        <p className="text-xl">Your balance: Rs {balance}</p>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-xl">Users</h2>
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
