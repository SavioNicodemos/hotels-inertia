export type HotelDTO = {
  id: number;
  name: string;
  image_url: string;
  stars: number;
  city: string;
  address: string;
  description: string;
};

export type PublicListHotelDTO = Omit<HotelDTO, 'address' | 'description'>;

export type CreateHotelDTO = Omit<HotelDTO, 'id'>;

export type UpdateHotelDTO = Partial<HotelDTO> & { id: number };
