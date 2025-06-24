import React, { useState } from "react";

const ReviewComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const newReview = {
      id: Date.now(),
      text: input,
    };

    setReviews([newReview, ...reviews]);
    setInput("");
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-2">Đánh giá nhận xét</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full border rounded p-2 mb-2"
          rows="3"
          placeholder="Nhập nhận xét của bạn..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Gửi nhận xét
        </button>
      </form>
      <div>
        {reviews.length === 0 ? (
          <p>Chưa có nhận xét nào.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="border-t pt-2 mt-2 text-gray-700"
            >
              {review.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewComponent;
