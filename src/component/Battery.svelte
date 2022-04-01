<script>
    export let battery_status;
</script>

<div class="battery-info">
    <div class="battery-row">
        <div class="battery__icon">
            {#if battery_status.percentage_level < 30}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="16" height="16" rx="8" fill="#F98A8A"/>
                    <path d="M6.37038 13L7.87375 7.30201L6 7.30278L6.89802 4H10.6122L9.58655 7.70166H11L6.37038 13Z" fill="white"/>
                </svg>
            {:else if battery_status.percentage_level < 50}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="16" height="16" rx="8" fill="#FFD07D"/>
                    <path d="M6.37038 13L7.87375 7.30201L6 7.30278L6.89802 4H10.6122L9.58655 7.70166H11L6.37038 13Z" fill="white"/>
                </svg>
            {:else }
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="16" height="16" rx="8" fill="#3DC26F"/>
                    <path d="M6.37038 13L7.87375 7.30201L6 7.30278L6.89802 4H10.6122L9.58655 7.70166H11L6.37038 13Z" fill="white"/>
                </svg>
            {/if}
        </div>
        <div class="battery__label">
            Battery left
        </div>
    </div>
    <div class="battery-percent">
        <div class="battery-percent__number">
            {battery_status.percentage_level}
        </div>
        <div class="battery-percent__label">
            percent
        </div>
    </div>
</div>

<style>
    .battery-info {
        padding-top: 12px;
    }
    .battery__icon {
        width: 16px;
    }
    .battery__label {
        padding-left: 5px;
        font-style: normal;
        font-weight: 500;
        font-size: 10px;
        line-height: 100%;
        color: #AAA9C9;
    }
    .battery-row {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    .battery-percent {
        display: flex;
        align-items: flex-end;
        justify-content: flex-start;
        padding-top: 10px;
    }
    .battery-percent__number {
        font-style: normal;
        font-weight: 700;
        font-size: 28px;
        line-height: 100%;
        color: #666592;
    }
    .battery-percent__label {
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 100%;
        color: #AAA9C9;
        padding-bottom: 5px;
        padding-left: 7px;
    }
</style>