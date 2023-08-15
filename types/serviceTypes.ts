export type Service = {
  name: string;
  variations: SubService[];
  image: string;
  altImage: string;
  description: string;
  icon: string;
};

export type SubService = {
  time: number;
  unit: string;
  price: number;
};
