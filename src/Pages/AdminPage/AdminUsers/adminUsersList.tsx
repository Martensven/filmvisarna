import React, { useState, useEffect } from "react";
import type { User, Booking } from "./adminUsersPage";

type Props = {
  onSelectUser: (user: User) => void;
};

export function AdminUsersList({ onSelectUser }: Props) {
  // State to manage users, loading state, current page, and total pages
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // Fetch users with pagination and sorting by last name in ascending order
        const response = await fetch(
          `/api/admin/users?page=${currentPage}&limit=${usersPerPage}&sortBy=lastName&sortDir=asc`
        );
        const data = await response.json();
        setUsers(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Fel vid hämtning av användare:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-[#243365] text-white max-w-4xl mx-auto rounded-xl">
      <div className="hidden md:grid grid-cols-3 text-sm font-semibold border-b border-gray-400 pb-2 mb-2 select-none">
        <div>Namn</div>
        <div>Email</div>
        <div>Välj</div>
      </div>

      {users.map((user) => (
        <div
          key={user._id}
          className="border-b border-gray-500 text-sm py-4 flex flex-col gap-2 md:grid md:grid-cols-3"
        >
          <div>
            {user.firstName} {user.lastName}
          </div>
          <div>{user.email}</div>
          <div className="flex items-center">
            <button
              onClick={() => onSelectUser(user)}
              className="bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600 mx-auto cursor-pointer"
            >
              Öppna
            </button>
          </div>
        </div>
      ))}

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 disabled:opacity-50 cursor-pointer"
        >
          Föregående
        </button>
        <span className="px-2 py-1">
          Sida {currentPage} av {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 disabled:opacity-50 cursor-pointer"
        >
          Nästa
        </button>
      </div>
    </div>
  );
}
