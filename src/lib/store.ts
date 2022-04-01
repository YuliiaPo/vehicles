import { writable, get } from 'svelte/store';

type Vehicle = {
    id: string;
    name: string;
    plate: string,
    position: {
        lat: number,
        lon: number
    }
    battery_status: {
        percentage_level: number,
        estimated_distance: number,
        battery_matched: boolean,
        time: string
    },
    scooter_version: string,
    modifications: any,
    group: string,
    _change: string
};

type Store = {
    vehicles: Array<Vehicle>;
    error?: string;
    connectionStatus: number;
};

export const store = writable<Store>({
    vehicles: Array(),
    error: null,
    connectionStatus: null
});

export const connect = () => {
    const ws = new WebSocket(`wss://api.hop.city/v1/ws`);
    if (!ws) {
        store.update((store) => ({ ...store, connectionStatus: ws.readyState }));
        store.update((s: Store) => {
            return {...s, error: "Unable to connect" 
        }});
        throw new Error('Unable to connect');
        return;
    }

    ws.addEventListener('open', () => {
        const msg = {"name":"vehicle/view/rentable/subscribe"};
        ws.send(JSON.stringify(msg));
        store.update((store) => ({ ...store, connectionStatus: ws.readyState }));
    });

    ws.addEventListener('message', (message: any) => {
        try {
            const data = JSON.parse(message.data).data;
            if(ws.readyState !== get(store).connectionStatus){
                store.update((store) => ({ ...store, connectionStatus: ws.readyState }));
            }
            if(data){
                updateVehicles(data);
            }
        } catch (error) {
            console.error(error);
        }

    });

    ws.addEventListener('close', (_message: any) => {
        if(ws.readyState !== get(store).connectionStatus){
            store.update((store) => ({ ...store, connectionStatus: ws.readyState }));
        }
        console.log('Socket is closed. Reconnect will be attempted in 1 second.', _message.reason);
        setTimeout(function() {
            connect();
        }, 1000);
    });
}

const updateVehicles = (newVehicles:Array<Vehicle>) => {
    let vehicles = get(store).vehicles;
    newVehicles.forEach(vehicle => {
        switch(vehicle._change){
            case 'update': {
                if(vehicles.findIndex(object => object.id === vehicle.id) !== -1){
                    vehicles[vehicles.findIndex(object => object.id === vehicle.id)] = vehicle;
                    break;
                }
            }
            case 'add': {
                if(vehicles.findIndex(object => object.id === vehicle.id) === -1) {
                    vehicles.push(vehicle);
                }
                break;
            }
            case 'remove': {
                vehicles.splice(vehicles.findIndex(item => item.id === vehicle.id), 1)
                break;
            }
            default: {
                console.log('Unknown change');
            }
        }
        store.update((store) => ({ ...store, vehicles: vehicles }));
    });
}