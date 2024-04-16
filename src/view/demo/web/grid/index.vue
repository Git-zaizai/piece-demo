<template>
    <div class="demo-view w-100">
        <div class="demo">
            <div class="grid-1">
                <div class="grid-1-item">1</div>
                <div class="grid-1-item">2</div>
                <div class="grid-1-item">3</div>
                <div class="grid-1-item">4</div>
                <div class="grid-1-item">5</div>
                <div class="grid-1-item">6</div>
            </div>
        </div>
        
    </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.demo {
    padding: 20px;
    border: 1px solid #dfdfdf;
    border-radius: 4px;
}

.grid-1 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 30px;

    .grid-1-item {
        background: #868686;
        height: 100px;
        text-align: center;
        line-height: 100px;
    }
}
</style>