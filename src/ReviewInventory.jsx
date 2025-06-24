import React, { useState } from "react";

const mockInventory = [
  { id: 1, title: "Lập trình C++", isbn: "9781234567890", quantity: 5 },
  { id: 2, title: "React cơ bản", isbn: "9780987654321", quantity: 2 },
  { id: 3, title: "ASP.NET Core", isbn: "9781122334455", quantity: 0 },
];

const ReviewInventory = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const found = mockInventory.find(
      (book) =>
        book.isbn === query.trim() ||
        book.title.toLowerCase() === query.trim().toLowerCase()
    );
    setResult(found || { notFound: true });
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-2">Kiểm tra tồn kho sách</h2>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Nhập ISBN hoặc tên sách"
          className="w-full border p-2 rounded mb-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Kiểm tra
        </button>
      </form>

      {result && !result.notFound && (
        <div className="border-t pt-2">
          <p><strong>Tên sách:</strong> {result.title}</p>
          <p><strong>ISBN:</strong> {result.isbn}</p>
          <p>
            <strong>Tồn kho:</strong>{" "}
            {result.quantity > 0 ? result.quantity : "Hết hàng"}
          </p>
        </div>
      )}

      {result?.notFound && (
        <div className="text-red-500">Không tìm thấy sách!</div>
      )}
    </div>
  );
};

export default ReviewInventory;
