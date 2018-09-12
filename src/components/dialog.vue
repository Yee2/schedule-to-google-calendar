<template>
    <div class="modal is-active">
        <div class="modal-background" @click="$close"></div>
        <div class="modal-content">
            <div class="box"><p>{{ content }}</p>
            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click="$close"></button>
    </div>
</template>