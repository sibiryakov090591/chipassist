export const LOAD_MAINTENANCE_R = "LOAD_MAINTENANCE_R";
export const LOAD_MAINTENANCE_S = "LOAD_MAINTENANCE_S";
export const LOAD_MAINTENANCE_F = "LOAD_MAINTENANCE_F";
export const LOAD_MAINTENANCE_ARRAY = [LOAD_MAINTENANCE_R, LOAD_MAINTENANCE_S, LOAD_MAINTENANCE_F];

// State
export interface MaintenanceState {
  loaded: boolean;
  message: string | null;
  status: string;
}
