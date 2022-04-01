<script lang="ts">
    import {store} from '$lib/store';
    import {onMount} from 'svelte';
    import {fly} from 'svelte/transition'

    let connectionText:String;
    let circleColor:String;
    let connectionStatus:number;

    onMount(async () => {
        store.subscribe(store => {
            connectionStatus= store.connectionStatus;
            switch(connectionStatus){
                case 0: {
                    connectionText = 'CONNECTING';
                    circleColor = 'yellow';
                    break;
                }
                case 1: {
                    connectionText = 'OPEN';
                    circleColor = 'green';
                    break;
                }
                case 2: {
                    connectionText = 'CLOSING';
                    circleColor = 'red';
                    break;
                }
                case 3: {
                    connectionText = 'CLOSED';
                    circleColor = 'red';
                }
            }
        });
    });
</script>
{#if connectionText}
    <div class="connect-wrap" 
        in:fly={{duration: 500}}
        out:fly={{duration: 500}}>
        <div class="text">
            Connection status: {connectionText}
        </div>
        <div class="circle {circleColor}">
            
        </div>
    </div>    
{/if}


<style>
    .connect-wrap {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-bottom: 25px;
    }
    .circle {
        margin-left: 10px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: #000;
        transition: backgrpind 0.3s ease-in;
    }
    .circle.red {
        background: red;
    }
    .circle.yellow {
        background: yellow;
    }
    .circle.green {
        background: green;
    }
</style>