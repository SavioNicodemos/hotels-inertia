import { LocationCity as CityIcon } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Rating,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";

import { PublicListHotelDTO } from "@/dtos/Hotels";

import { Image } from "../Image";
import { StartsContainer } from "./styles";

export default function HotelCard({ hotel }: Props) {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 345 }} data-testid="hotel-card">
      <CardActionArea>
        <Box position="relative">
          <Image height={200} alt="hotel image" imageUrl={hotel.image_url} />
          <Stars quantity={hotel.stars} />
        </Box>
        <CardContent>
          <Tooltip
            title={hotel.name.length > 25 ? hotel.name : ""}
            placement="bottom"
          >
            <Typography gutterBottom variant="h5" component="div" noWrap>
              {hotel.name}
            </Typography>
          </Tooltip>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Tooltip title="City">
              <CityIcon />
            </Tooltip>
            <Typography variant="body2" color="text.secondary">
              {hotel.city}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const Stars = ({ quantity }: { quantity: number }) => {
  return (
    <Tooltip
      title={`${quantity} stars`}
      placement="bottom"
      aria-label={`${quantity} stars`}
    >
      <StartsContainer>
        <Rating name="read-only" value={quantity} readOnly size="small" />
      </StartsContainer>
    </Tooltip>
  );
};

export const HotelCardSkeleton = () => {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 345 }}>
      <CardActionArea>
        <Skeleton variant="rectangular" width={345} height={200} />
        <CardContent>
          <Skeleton variant="text" height={40} />
          <Box display="flex" flexDirection="row" gap={1}>
            <CityIcon />
            <Skeleton variant="text" width={100} />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

type Props = {
  hotel: PublicListHotelDTO;
};
