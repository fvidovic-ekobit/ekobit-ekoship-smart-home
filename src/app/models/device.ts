export interface DeviceCreate {
  name: string | null;
  serialNr: string | null;
}

export interface DeviceUpdate {
  name: string | null;
  serialNr: string | null;
}

export interface DeviceDetails {
  id?: number;
  name: string;
  serialNr: string;
}

export interface DeviceList {
  id: number;
  name: string;
}