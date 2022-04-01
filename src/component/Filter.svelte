<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    export let filtres:Array<String>;

    const dispatch = createEventDispatcher()

    let chosedFilter = [];
    
    const setFilter = (e) => {
        dispatch('filter', chosedFilter);
    };

</script>
<div class="filter-list">
    {#each filtres as filter}
        <label class={chosedFilter.includes(filter) ? 'active' : ''}>
            {filter}
            <input type="checkbox" bind:group={chosedFilter} on:change={setFilter} value={filter}>
        </label>
    {/each}
</div>

<style>
    .filter-list {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        padding-bottom: 25px;
    }
    label {
        display: block;
        margin-right: 15px;
        margin-bottom: 10px;
        padding: 10px 25px;
        border: 2px solid #3DC26F;
        border-radius: 25px;
        min-width: 120px;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        transition: background, color 0.3s ease-in;
    }
    label.active {
        background: #3DC26F;
        color: #fff;
    }
    label input {
        display: none;
    }
</style>