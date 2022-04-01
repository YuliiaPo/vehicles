<script>
    import {onMount} from 'svelte';
    import Vehicles from '../component/Vehicles.svelte';
    import Filter from '../component/Filter.svelte';
    import Connection from '../component/Connection.svelte';
    import {store, connect} from '../lib/store';
    import {fly} from 'svelte/transition'

    let filtres = Array();
    let vehicles = Array();
    let connectStatus;

    onMount(async () => {
        connect();
        
        store.subscribe(store => {
            filtres = [...new Set(store.vehicles.map(vehicle => vehicle.group))];
            vehicles = store.vehicles;
            connectStatus= store.connectionStatus;
        });
    });
    
    const setFilter = (e) => { 
        store.subscribe(store => {
            if(e.detail.length > 0){
                vehicles = store.vehicles.filter(vehicle => e.detail.includes(vehicle.group));
            } else {
                vehicles = store.vehicles;
            }
        });
    }

</script>

<div class="inner">
    <Connection/>
    {#if vehicles.length > 0}
        <div 
            in:fly={{y: 50, duration: 500, delay: 500}}
            out:fly={{duration: 500}}>
            <Filter {filtres} on:filter={setFilter}/>
            <Vehicles {vehicles}/>
        </div>
        
    {:else}
        <div class="center-text" 
            in:fly={{y: 50, duration: 500, delay: 500}}
            out:fly={{duration: 500}}>
            {#if connectStatus === 0}
                <p>There are no available vehicles</p>        
            {/if}
        </div>
    {/if}
</div>

<style>
    .center-text {
        position: fixed;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .center-text p {
        text-align: center;
        font-size: 18px;
        line-height: 24px;
        font-weight: 500;
    }
</style>