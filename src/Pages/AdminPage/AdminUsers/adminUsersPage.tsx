import { useState } from "react";
import { FaUsers, FaSearch } from "react-icons/fa";
import { AdminUsersList } from "./adminUsersList";
import { SearchUserModal } from "./adminSearchUser";

export default function AdminUsersPage() {
  const [showUserList, setShowUserList] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  return (
    <main className="bg-[#1f1f1f] text-white p-6 flex flex-col items-center justify-center min-h-screen">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold bg-[#243365] py-3 rounded-lg shadow-md inline-block px-6">
          Användarhantering
        </h1>
      </header>

      <nav className="flex justify-center items-center mb-8 gap-10">
        <FaSearch
          size={70}
          className="inline-block mr-2 cursor-pointer"
          aria-label="Sök användare"
          onClick={() => setShowSearchModal(true)}
        />
        <FaUsers
          size={80}
          className="inline-block mr-2 cursor-pointer"
          onClick={() => setShowUserList(true)}
          aria-label="Visa användare"
        />
      </nav>

      {showUserList && (
        <section className="w-full max-w-3xl">
          <AdminUsersList />
        </section>
      )}

      {showSearchModal && <SearchUserModal onClose={() => setShowSearchModal(false)} />}
    </main>
  );
}

