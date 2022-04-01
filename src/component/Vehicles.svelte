<script>
    import Vehicle from './Vehicle.svelte';
    export let vehicles;
</script>

<div>
    <div class="vehicle-list">
        {#each vehicles as vehicle}
            <Vehicle {vehicle}/>
        {/each}
    </div>
</div>
<style>
    .vehicle-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 5fr));
        grid-column-gap: 1rem;
        grid-row-gap: 2rem;
    }
</style>