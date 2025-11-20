import { useState, useEffect } from "react";
import Select from "react-select";
import type { User } from "./adminUsersPage";
// Props from parent component
type Props = {
  onSelectUser: (user: User) => void;
};

export function AdminSearchUser({ onSelectUser }: Props) {
  // state to manage users and selected option
  const [users, setUsers] = useState<User[]>([]);
  const setSelectedOption = useState<User | null>(null)[1];

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

  const options = users.map((user) => ({
    value: user._id,
    label: `${user.firstName} ${user.lastName} | ${user.email}`,
    user,
  }));

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#243365] text-white p-4 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Sök användare</h2>

      <Select
        options={options}
        onChange={(option) => {
          setSelectedOption(option?.user || null);
          if (option?.user) onSelectUser(option.user);
        }}
        placeholder="Sök på namn, e-post, telefon eller ID..."
        isClearable
        className="mb-6 text-black"
      />
    </div>
  );
}
