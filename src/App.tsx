import { Delete } from "@mui/icons-material";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";

export default function MyApp() {
  type Item = {
    id: number;
    name: string;
  };

  const [items, setItems] = useState<Item[]>([]);

  const nameInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState<string>("");

  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleAddItem = (name: string) => {
    if (name === "") {
      return;
    }

    setItems([
      ...items,
      {
        id: items.length + 1,
        name,
      },
    ]);

    setName("");

    nameInputRef.current?.focus();
  };

  return (
    <>
      <Box sx={{ width: "100%", maxWidth: 500, margin: "auto" }}>
        <Paper elevation={1} sx={{ padding: 2, marginTop: 5 }}>
          <Typography variant="h2">Material UI CRUD</Typography>
          <Typography variant="body1" gutterBottom>
            Simple CRUD app using Material UI
          </Typography>
          <Stack spacing={2}>
            <TextField
              inputRef={nameInputRef}
              id="name"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button variant="contained" onClick={() => handleAddItem(name)}>
              Create
            </Button>
          </Stack>

          <List>
            {items.map((item) => (
              <>
                <ListItem
                  sx={{
                    backgroundColor: "InfoBackground",
                    padding: 0,
                  }}
                  key={item.id}
                  secondaryAction={
                    <>
                      <IconButton
                        onClick={() => handleDeleteItem(item.id)}
                        edge="end"
                        aria-label="delete"
                      >
                        <Delete />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemButton>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              </>
            ))}
          </List>
        </Paper>
      </Box>
    </>
  );
}
