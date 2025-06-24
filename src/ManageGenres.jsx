import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const ManageGenres = () => {
  const [genres, setGenres] = useState(['Tiểu thuyết', 'Truyện tranh']);
  const [newGenre, setNewGenre] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdate = () => {
    if (newGenre.trim() === '') return;

    if (editIndex !== null) {
      const updated = [...genres];
      updated[editIndex] = newGenre;
      setGenres(updated);
      setEditIndex(null);
    } else {
      setGenres([...genres, newGenre]);
    }

    setNewGenre('');
  };

  const handleEdit = (index) => {
    setNewGenre(genres[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setGenres(genres.filter((_, i) => i !== index));
  };

  return (
    <div style={{ width: '300px' }}>
      <TextField
        label="Tên thể loại"
        value={newGenre}
        onChange={(e) => setNewGenre(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleAddOrUpdate} style={{ marginTop: 8 }}>
        {editIndex !== null ? 'Cập nhật thể loại' : 'Thêm thể loại'}
      </Button>

      <List>
        {genres.map((genre, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <>
                <IconButton edge="end" onClick={() => handleEdit(index)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDelete(index)}>
                  <Delete />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={genre} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ManageGenres;
