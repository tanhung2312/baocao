import React, { useState } from 'react';
import { TextField, Button, MenuItem } from '@mui/material';

const AddBook = ({ genres, onAddBook }) => {
  const [book, setBook] = useState({
    name: '',
    author: '',
    genre: '',
    year: '',
    quantity: ''
  });

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddBook(book);
    setBook({ name: '', author: '', genre: '', year: '', quantity: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', width: '300px' }}>
      <TextField label="Tên sách" name="name" value={book.name} onChange={handleChange} required />
      <TextField label="Tác giả" name="author" value={book.author} onChange={handleChange} required />
      <TextField
        select
        label="Thể loại"
        name="genre"
        value={book.genre}
        onChange={handleChange}
        required
      >
        {genres.map((g, index) => (
          <MenuItem key={index} value={g}>
            {g}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Năm xuất bản"
        name="year"
        value={book.year}
        onChange={handleChange}
        type="number"
        required
      />
      <TextField
        label="Số lượng"
        name="quantity"
        value={book.quantity}
        onChange={handleChange}
        type="number"
        required
      />
      <Button variant="contained" color="primary" type="submit">
        Thêm sách
      </Button>
    </form>
  );
};

export default AddBook;
