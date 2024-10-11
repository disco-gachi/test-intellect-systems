<template>
    <div class="spinner-back">
        <div class="spinner"></div>
    </div>
</template>

<style scoped>
.spinner-back {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 999;
}

.spinner {
    width: 48px;
    height: 48px;
    border: 5px solid #999999;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>