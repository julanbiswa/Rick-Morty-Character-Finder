import axios from "axios";

const API_BASE = "https://rickandmortyapi.com/api";

export const fetchCharacters = async (page = 1, name = "", status = "") => {
  const res = await axios.get(`${API_BASE}/character`, {
    params: { page, name, status }
  });
  return res.data;
};

export const fetchCharacterById = async (id: string) => {
  const res = await axios.get(`${API_BASE}/character/${id}`);
  return res.data;
};
