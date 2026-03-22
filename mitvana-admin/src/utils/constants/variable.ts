import dayjs from "dayjs";

export const currentDate = dayjs();
export const currentDateFormatted = currentDate.format("YYYY-MM-DD");

export const userAvatar = "/avatar.jpg";

export const noImage = "https://placehold.co/600x400?text=No+Image";