import {
  LocationCity as CityIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  LocationOn as PinIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Modal,
  Paper,
  Rating,
  Typography,
} from "@mui/material";

import { Image } from "@/Components/Image";
import { HotelDTO } from "@/dtos/Hotels";
import { useToast } from "@/hooks/useToast";
import { PageLayout } from "@/Layouts/PageLayout";
import { PageProps } from "@/types";
import { handleError } from "@/utils/errors/handleError";
import { router, useForm, usePage } from "@inertiajs/react";
import { styled } from "@mui/material";
import { ReactNode, useState } from "react";

export const ActionButtonsContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  right: 0,
  top: 0,
  backgroundColor: `${theme.palette.grey[800]}99`,
  backdropFilter: "blur(5px)",
  borderTopRightRadius: theme.spacing(2),
  borderBottomLeftRadius: theme.spacing(2),
}));

const HotelDetails = ({ hotel }: { hotel: HotelDTO }) => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <RenderProfile hotel={hotel} />
    </Container>
  );
};

const RenderProfile = ({ hotel }: { hotel: HotelDTO }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { delete: removeHotel, processing: isPending } = useForm();

  const toast = useToast();

  const handleDeleteHotel = async () => {
    removeHotel(route("hotels.destroy", hotel.id), {
      onSuccess: () => {
        toast.success("Hotel deleted successfully!");
        router.visit("/");
      },
      onError: (error) => {
        handleError(error);
      },
    });
  };

  return (
    <>
      <DeleteHotelModal
        open={deleteModalOpen}
        isLoading={isPending}
        onAccept={handleDeleteHotel}
        onCancel={() => setDeleteModalOpen(false)}
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box position="relative">
            <Image
              height={450}
              imageUrl={hotel.image_url}
              alt={hotel.name}
              sx={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
            />
            <ActionButtons
              onEditPress={() => router.visit(`/hotels/${hotel.id}/edit`)}
              onDeletePress={() => setDeleteModalOpen(true)}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sx={{ my: 2 }}>
          <Typography variant="h3" gutterBottom>
            {hotel.name}
          </Typography>
          <Rating name="read-only" value={hotel.stars} readOnly />
          <Box display="flex" flexDirection="row" gap={2}>
            <CityIcon />
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {hotel.city}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="row" gap={2}>
            <PinIcon sx={{ fontSize: 30 }} color="primary" />
            <Typography variant="h6" color="text.primary" gutterBottom>
              {hotel.address}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="body1" paragraph>
              {hotel.description || "No description available"}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

function ActionButtons({
  onEditPress = () => {},
  onDeletePress = () => {},
}: ActionButtonProps) {
  const user = usePage<PageProps>().props.auth.user;

  if (!user) {
    return null;
  }

  return (
    <ActionButtonsContainer>
      <IconButton aria-label="edit" onClick={() => onEditPress()}>
        <EditIcon color="primary" />
      </IconButton>
      <IconButton aria-label="delete" onClick={() => onDeletePress()}>
        <DeleteIcon color="error" />
      </IconButton>
    </ActionButtonsContainer>
  );
}

const DeleteHotelModal = ({
  open,
  isLoading,
  onAccept = () => {},
  onCancel = () => {},
}: DeleteModalProps) => {
  return (
    <Modal open={open}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Are you sure you want to delete this hotel?
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          This action cannot be undone.
        </Typography>
        <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
          <Button
            onClick={() => onCancel()}
            disabled={isLoading}
            variant="outlined"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onAccept()}
            disabled={isLoading}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

type ActionButtonProps = {
  onEditPress?: () => void;
  onDeletePress?: () => void;
};

type DeleteModalProps = {
  open: boolean;
  isLoading: boolean;
  onAccept?: () => void;
  onCancel?: () => void;
};

HotelDetails.layout = (page: ReactNode) => (
  <PageLayout children={page} title="Hotel Profile" />
);

export default HotelDetails;
