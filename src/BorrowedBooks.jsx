import React, { useState } from "react";

const mockBorrowedBooks = [
  {
    id: 1,
    title: "Lập trình C++",
    borrower: "Nguyễn Văn A",
    borrowedDate: "2025-06-20",
    dueDate: "2025-07-05",
  },
  {
    id: 2,
    title: "React cơ bản",
    borrower: "Trần Thị B",
    borrowedDate: "2025-06-18",
    dueDate: "2025-07-02",
  },
  {
    id: 3,
    title: "ASP.NET Core",
    borrower: "Lê Văn C",
    borrowedDate: "2025-06-15",
    dueDate: "2025-06-30",
  },
];

const BorrowedBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState(mockBorrowedBooks);

  return (
    <div className="max-w-3xl mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Danh sách sách đang được mượn</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">STT</th>
            <th className="border p-2">Tên sách</th>
            <th className="border p-2">Người mượn</th>
            <th className="border p-2">Ngày mượn</th>
            <th className="border p-2">Hạn trả</th>
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.map((book, index) => (
            <tr key={book.id}>
              <td className="border p-2 text-center">{index + 1}</td>
              <td className="border p-2">{book.title}</td>
              <td className="border p-2">{book.borrower}</td>
              <td className="border p-2">{book.borrowedDate}</td>
              <td className="border p-2">{book.dueDate}</td>
            </tr>
          ))}
          {borrowedBooks.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 p-2">
                Không có sách nào đang được mượn.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowedBooks;
