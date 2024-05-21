import { Input } from "@/Components/Input";
import { CreateHotelDTO } from "@/dtos/Hotels";
import { saveHotelSchema } from "@/schemas/saveHotelSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

function HotelForm({
  onSubmit,
  initialData,
  disabled = false,
  isLoading = false,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(saveHotelSchema),
    defaultValues: initialData || {
      name: "",
      image_url: "",
      city: "",
      address: "",
      description: "",
      stars: 0,
    },
    disabled,
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  if (isLoading) {
    return (
      <Grid pt={8} alignItems="center" justifyContent="center" display="flex">
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography textAlign="center" pt={4} variant="h4" sx={{ mb: 4 }}>
        Hotel Information
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Hotel Name"
              errorText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="image_url"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Image URL"
              errorText={errors.image_url?.message}
            />
          )}
        />
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Input {...field} label="City" errorText={errors.name?.message} />
          )}
        />
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Address"
              errorText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Description"
              multiline
              rows={4}
              errorText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="stars"
          control={control}
          render={({ field: { value, onChange, disabled } }) => (
            <Box
              sx={{
                margin: "normal",
                display: "flex",
                flexDirection: "column",
                "& > span": { mb: 1 },
              }}
            >
              <Typography
                component="legend"
                color={disabled ? "grey" : undefined}
              >
                Stars
              </Typography>
              <Rating
                disabled={disabled}
                name="simple-controlled"
                value={value}
                onChange={(_, value) => onChange(value)}
              />
              {errors.stars && (
                <Typography color="error">{errors.stars?.message}</Typography>
              )}
            </Box>
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={disabled}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

type Props = {
  isLoading?: boolean;
  onSubmit: (data: CreateHotelDTO) => void;
  initialData?: CreateHotelDTO;
  disabled?: boolean;
};

export default HotelForm;
