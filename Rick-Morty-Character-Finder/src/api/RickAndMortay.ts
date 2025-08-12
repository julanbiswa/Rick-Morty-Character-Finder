import axios from "axios";


export const fetchCharacters = async (page = 1, name = "", status = "") => {
  const res = await axios.get(`${import.meta.env.VITE_API_BASE}/character`, {
    params: { page, name, status }
  });
  return res.data;
};

export const fetchCharacterById = async (id: string) => {
  const res = await axios.get(`${import.meta.env.VITE_API_BASE}/character/${id}`);
  return res.data;
};
