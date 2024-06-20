import { IVacation } from "../interfaces/IVacation";
import $host from "./$axios";

export const getVacations = async (
  filter?: { follow: boolean; upcoming: boolean; active: boolean; page: number; limit: number } | undefined
) => {
  if(filter) {
    const { data } = await $host.get("/vacation", {
      params: {
        follow: filter.follow,
        upcoming: filter.upcoming,
        active: filter.active,
        page: filter.page,
        limit: filter.limit,
      }
    });
    return data;
  }
  const { data } = await $host.get("/vacation");
  return data;
};

export const getVacationById = async (vacationId: string) => {
  const { data } = await $host.get(`/vacation/${vacationId}`);
  return data;
}

export const createVacation = async (vacation: IVacation) => {
  const formData = new FormData();
  formData.append("destination", vacation.destination);
  formData.append("descripton", vacation.description);
  formData.append("price", vacation.price);
  formData.append("start_date", vacation.start_date);
  formData.append("end_date", vacation.end_date);
  if(vacation.picture) {
    formData.append("picture", vacation.picture);
  }
  const { data } = await $host.post("/vacation/create", vacation, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }
  );
  return data;
};

export const updateVacation = async (vacationId: string, vacation: IVacation) => {
  const formData = new FormData();
  formData.append("destination", vacation.destination);
  formData.append("descripton", vacation.description);
  formData.append("price", vacation.price);
  formData.append("start_date", vacation.start_date);
  formData.append("end_date", vacation.end_date);
  if(vacation.picture) {
    formData.append("picture", vacation.picture);
  }
  const { data } = await $host.patch(`/vacation/update/${vacationId}`, vacation, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
  );
  return data;
};

export const deleteVacation = async (id: number) => {
  const { data } = await $host.delete(`/vacation/delete/${id}`);
  return data;
}

export const followToVacation = async (id: number) => {
  const { data } = await $host.post(`/vacation/follow-vacation/${id}`);
  return data
}

export const unFollowToVacation = async (id: number) => {
  const { data } = await $host.delete(`/vacation/unfollow-vacation/${id}`);
  return data
}

export const getVacationStats = async () => {
  const { data } = await $host.post("/vacation/stats");
  return data;
}

export const downloadCsv = async () => {
  const blob = await $host.post("/vacation/download-csv", {}, {
    responseType: "blob"
  });
  return blob;
}