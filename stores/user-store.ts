import axios from "axios";
import { create } from "zustand";
import omit from "lodash-es/omit";

interface User {
  id: string;
  name: string;
  email: string;
  hasCompletedKyc: boolean;
}

interface UserState {
  user: User | null;
  fetch: Function;
  deleteUser: Function;
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
  deleteUser: () => set((state) => omit(state, ["user"]), true),
}));
