export type Severity = "error" | "warning" | "info" | "success";

interface Alert {
  id?: string;
  message: string;
  severity: Severity;
  onClose?: () => void;
}

interface Dialog {
  open: boolean;
  title: string;
  message: string;
  children: JSX.Element;
}

interface DrawerState {
  open: boolean;
}

interface UIState {
  drawer: DrawerState;
  dialog: Dialog;
  darkMode: boolean;
  alerts: Alert[];
}

export { Alert, DrawerState, Dialog, UIState };
