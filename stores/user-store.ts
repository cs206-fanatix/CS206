import axios from "axios";
import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  hasCompletedKyc: boolean;
}

export interface UserState {
  user: User | null;
  fetch: Function;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  fetch: async () => {
    try {
      const response = await axios.get("/api/user");
      set({ user: response.data });
    } catch (error) {
      console.log(error);
    }
  },
}));
