import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

export default function Sidebar() {
  return (
    <Box sx={{ p: 2, borderLeft: "1px solid #ddd" }}>
      <Typography variant="h6" gutterBottom>
        Related Articles
      </Typography>
      <List>
        <ListItem button>
          <ListItemText primary="Farming with AI" secondary="Tech" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText
            primary="Soil Health Practices"
            secondary="Sustainability"
          />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText
            primary="Climate Impact on Crops"
            secondary="Research"
          />
        </ListItem>
      </List>
    </Box>
  );
}
