import { Bathtub as BathtubIcon } from "@mui/icons-material";
import { Container, Grid, Pagination } from "@mui/material";

import HotelCard, { HotelCardSkeleton } from "@/Components/HotelCard";
import { ScreenErrorMessage } from "@/Components/ScreenErrorMessage";
import { PublicListHotelDTO } from "@/dtos/Hotels";
import { BackendPagination } from "@/dtos/Requests";
import { PageLayout } from "@/Layouts/PageLayout";
import { router } from "@inertiajs/react";

const Home = ({
  hotelsPaginated,
}: {
  hotelsPaginated: BackendPagination<PublicListHotelDTO[]>;
}) => {
  const hotels = hotelsPaginated?.data || [];
  const totalPages = hotelsPaginated?.last_page || 1;
  const actualPage = hotelsPaginated?.current_page || 1;

  return (
    <Container>
      <Grid container py={4} spacing={4} data-testid="hotels-list">
        <RenderHotels hotels={hotels} isLoading={false} isSuccess={true} />
      </Grid>

      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          color="primary"
          variant="outlined"
          page={actualPage}
          onChange={(_, page) => router.visit(`/hotels?page=${page}`)}
        />
      )}
    </Container>
  );
};

const RenderHotels = ({ hotels, isLoading, isSuccess }: RenderHotelsProps) => {
  if (isLoading)
    return Array.from({ length: 5 }).map((_, index) => (
      <Grid
        key={index}
        item
        xs={12}
        sm={6}
        md={4}
        lg={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <HotelCardSkeleton />
      </Grid>
    ));

  if (!isSuccess)
    return (
      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop={10}
      >
        <ScreenErrorMessage />
      </Grid>
    );

  if (hotels.length === 0)
    return (
      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginTop={10}
      >
        <ScreenErrorMessage
          title="No hotels found"
          subtitle="Please check your filters or add the first one!"
          Icon={BathtubIcon}
        />
      </Grid>
    );

  return hotels.map((hotel) => (
    <Grid
      key={hotel.id}
      item
      xs={12}
      sm={6}
      md={4}
      lg={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={() => router.visit(`/hotels/${hotel.id}`)}
    >
      <HotelCard hotel={hotel} />
    </Grid>
  ));
};

type RenderHotelsProps = {
  hotels: PublicListHotelDTO[];
  isLoading: boolean;
  isSuccess: boolean;
};

Home.layout = (page: React.ReactNode) => (
  <PageLayout children={page} title="Hotels Listing" showSearch />
);

export default Home;
