<script>
    import Battery from "./Battery.svelte";
    import {fly} from 'svelte/transition';

    export let vehicle;

</script>
<div class="vehicle-card"
    in:fly={{y: 50, duration: 500, delay: 500}}
    out:fly={{duration: 500}}>
    <div class="vehicle-img">
        <img src="/static/images/vehicle.png" alt={vehicle.name}>
    </div>
    <div class="vehicle-info">
        <div class="vehicle-name">
            {vehicle.name}
        </div>
        <div class="vehicle-group">
            {vehicle.group}
        </div>
        <Battery battery_status={vehicle.battery_status}/>
    </div>
</div>

<style>
    .vehicle-card {
        background: #FFFFFF;
        border: 1px solid #ECECEC;
        box-shadow: 0px 4px 15px rgba(20, 20, 20, 0.03);
        border-radius: 10px;
        padding: 20px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }
    .vehicle-img {
        width: 50%;
        padding-right: 15px;
    }
    .vehicle-img img {
        width: 100%;
    }
    .vehicle-info {
        width: 50%;
    }
    .vehicle-name {
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 100%;
        color: #666592;
        padding-bottom: 5px;
    }
    .vehicle-group {
        font-style: normal;
        font-weight: 500;
        font-size: 10px;
        line-height: 100%;
        color: #AAA9C9;
        padding-bottom: 15px;
        border-bottom: 1px solid #ECECEC;;
    }
</style>