import { StateCreator } from "zustand";

// Interfaces
import { Alert, Dialog, DrawerState, UIState } from "@/lib";

// UUID
import { v4 as uuid } from "uuid";

export const initialDialog = {
  open: false,
  title: "",
  message: "",
  children: <></>,
};

const uiInitialState: UIState = {
  drawer: {
    open: true,
  },
  dialog: initialDialog,
  darkMode: false,
  alerts: [],
};

interface UISlice {
  drawer: DrawerState;
  alerts: Alert[];
  dialog: Dialog;
  setDrawer: (drawer: DrawerState) => void;
  setDialog: (dialog: Dialog) => void;
  setAlert: (alert: Alert) => void;
  resetDialog: () => void;
  resetAlert: (id: string) => void;
}

const createUISlice: StateCreator<UISlice> = (set) => ({
  ...uiInitialState,
  setDrawer: (drawer: DrawerState) => set({ drawer }),
  setDialog: (dialog: Dialog) => set({ dialog }),
  setAlert: (alert: Alert) =>
    set((state) => ({ alerts: [...state.alerts, { ...alert, id: uuid() }] })),
  resetDialog: () => set({ dialog: initialDialog }),
  resetAlert: (id: string) =>
    set((state) => ({
      alerts: state.alerts.filter((alert) => alert.id !== id),
    })),
});

export default createUISlice;
export type { UISlice };
