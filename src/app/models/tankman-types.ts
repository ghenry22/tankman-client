export interface Tank {
    id?: number;
    name: string;
    location: string;
    diameter: number;
    height: number;
    sensorDistanceWhenFull: number;
    sensorId: number;
    statedCapacity: number;
    capacityUnit: string;
    isRound: boolean;
    timeStamp: string;
}

export interface Measurement {
}