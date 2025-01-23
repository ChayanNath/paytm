import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/api/axiosInstance";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type UserType = {
  _id: number;
  firstName: string;
  lastName: string;
};

export const Users = () => {
  const [filter, setFilter] = useState<string>("");
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async (param: string) => {
      try {
        setLoading(true);
        setError(null);
        const url = param
          ? `/user/bulk?filter=${encodeURIComponent(param)}`
          : "/user/bulk";

        const response = await axiosInstance.get(url);
        setUsers(response.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to fetch users. Please try again later.");
        toast({ title: "Error fetching users." });
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchUsers(filter);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filter, toast]);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search users..."
        onChange={(e) => setFilter(e.target.value)}
        className="w-full"
      />

      {loading && <div className="text-center text-gray-500">Loading...</div>}

      {error && <div className="text-center text-red-500">{error}</div>}

      <div className="space-y-2">
        {users.length > 0
          ? users.map((user) => <User key={user._id} user={user} />)
          : !loading &&
            !error && (
              <div className="text-center text-gray-500">No users found.</div>
            )}
      </div>
    </div>
  );
};

interface UserProps {
  user: UserType;
}

const User: React.FC<UserProps> = ({ user }) => {
  const navigate = useNavigate();

  const handleSendMoney = () => {
    navigate(`/send?id=${user._id}&name=${user.firstName} ${user.lastName}`);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarFallback>
              {user.firstName.charAt(0).toUpperCase() +
                user.lastName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <CardTitle>
            {user.firstName} {user.lastName}
          </CardTitle>
        </div>
        <Button onClick={handleSendMoney}>Send Money</Button>
      </CardHeader>
    </Card>
  );
};
