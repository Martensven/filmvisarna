import React, { useState, useEffect } from "react";
import type { User, Booking } from "./adminUsersPage";

type Props = {
  onSelectUser: (user: User) => void;
}

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
        const response = await fetch(`/api/admin/users?page=${currentPage}&limit=${usersPerPage}&sortBy=lastName&sortDir=asc`);
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
    
  );
}
