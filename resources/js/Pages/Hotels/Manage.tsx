import { PageLayout } from "@/Layouts/PageLayout";
import { CreateHotelDTO, HotelDTO } from "@/dtos/Hotels";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import HotelForm from "./Partials/HotelForm";

const ManageHotel = ({ hotel }: { hotel?: HotelDTO }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitForm = async (data: CreateHotelDTO) => {
    setIsLoading(true);
    if (hotel) {
      router.put(route("hotels.update", hotel.id), data, {
        onSuccess: () => {
          setIsLoading(false);
          router.visit(`/hotels/${hotel.id}`);
        },
      });

      return;
    }

    router.post(route("hotels.store"), data, {
      onSuccess: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <>
      <Head title={hotel ? `Edit ${hotel.name}` : "Create Hotel"} />
      <HotelForm
        onSubmit={(data) => handleSubmitForm(data)}
        disabled={isLoading}
        initialData={hotel}
      />
    </>
  );
};

ManageHotel.layout = (page: React.ReactNode) => <PageLayout children={page} />;

export default ManageHotel;
