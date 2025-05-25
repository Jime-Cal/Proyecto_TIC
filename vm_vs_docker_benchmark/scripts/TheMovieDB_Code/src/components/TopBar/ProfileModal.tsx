import * as React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
  };
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose, user }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(3px)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          width: 300,
          boxShadow: 24,
          textAlign: "center",
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Profile Information
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          <strong>Name:</strong> {user.name}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          <strong>Email:</strong> {user.email}
        </Typography>
        <Button variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ProfileModal;
