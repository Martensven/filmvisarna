import { useState, useEffect } from "react";
import Select from "react-select";
import type { User, Booking } from "./adminUsersPage";
// Props from parent component
type Props = {
  onSelectUser: (user: User) => void;
}

export function AdminSearchUser({ onSelectUser }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedOption, setSelectedOption] = useState<User |null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users");
        const data = await response.json();
        setUsers(data.data);
      } catch (error) {
        console.error("Fel vid hämtning av användare:", error);
      }
    };

    fetchUsers();
  }, []);

  