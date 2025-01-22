import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import UserList from "./UserList";

type User = {
  _id: number;
  firstName: string;
  lastName: string;
};

const Dashboard = () => {
  const [balance, setBalance] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch balance on initial render
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get("/api/v1/account/balance", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
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

  const handleSearchParamChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFilter(value);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }

      debounceRef.current = setTimeout(() => {
        fetchUsers(value);
      }, 500);
    },
    []
  );

  // Fetch users with debounce
  const fetchUsers = async (param: string) => {
    try {
      setLoading(true);
      let url = "/api/v1/user/bulk";
      if (param) {
        url = `/api/v1/user/bulk?filter=${param}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to fetch users. Please try again later.");
      toast({
        title: "Error fetching users.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendMoney = (user: User) => {
    navigate(`/send?id=${user._id}&name=${user.firstName} ${user.lastName}`);
  };

  useEffect(() => {
    fetchUsers("");
  }, []);

  return (
    <div>
      <Header />

      <div className="flex flex-col gap-4 p-4">
        <p className="text-xl">Your balance: Rs {balance}</p>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <h2 className="text-xl">Users</h2>
        <Input
          placeholder="Search users..."
          onChange={handleSearchParamChange}
          value={filter}
          disabled={loading}
        />
        <UserList
          users={users}
          loading={loading}
          error={error}
          handleSendMoney={handleSendMoney}
        />
      </div>
    </div>
  );
};

export default Dashboard;
