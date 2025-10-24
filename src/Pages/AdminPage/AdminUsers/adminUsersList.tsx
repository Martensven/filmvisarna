import React, { useState, useEffect } from "react";

export type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: number;
};

export function AdminUsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Något gick fel vid hämtning av användare");
        }

        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Fel vid hämtning av användare:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    };

    const closeModal = () => {
      setSelectedUser(null);
    }

  if (loading) {
    return <div>Laddar användare...</div>;
  }

  return (
    <div>
      <h1>Användare</h1>
      <ul>
        {users.map((user) => (
          <li className="cursor-pointer" key={user._id} onClick={() => handleUserClick(user)}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>

      {selectedUser && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white text-black rounded-lg p-6 shadow-lg max-w-md w-full relative">
      <button
        onClick={closeModal}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
        aria-label="Stäng modal"
      >
        &times;
      </button>
      <h2 className="text-2xl font-semibold mb-4">
        {selectedUser.firstName} {selectedUser.lastName}
      </h2>
      <p><strong>Email:</strong> {selectedUser.email}</p>
      <p><strong>Telefon:</strong> {selectedUser.phoneNumber}</p>
    </div>
  </div>
      )}
    </div>
  );
}
