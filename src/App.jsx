import React, { useState } from 'react';
import AddBook from './AddBook';
import ManageGenres from './ManageGenres';
import ReviewComponent from './ReviewComponent';
import BookRenewalSimulation from './BookRenewalSimulation';

const App = () => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState(['Tiểu thuyết', 'Truyện tranh']);

  const handleAddBook = (book) => {
    setBooks([...books, book]);
    console.log('Danh sách sách hiện tại:', [...books, book]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Thêm Sách</h2>
      <AddBook genres={genres} onAddBook={handleAddBook} />

      <h2>Quản Lý Thể Loại</h2>
      <ManageGenres />

      <h2>Đánh Giá Sách</h2>
      <ReviewComponent />

      <h2>Mô phỏng gia hạn sách</h2>
      <BookRenewalSimulation />
    </div>
  );
};

export default App;
