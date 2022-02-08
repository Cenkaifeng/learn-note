<template>
    <div class="about">
        <h1>This is an about page</h1>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {},
    beforeRouteEnter: (to, from, next) => {
        console.log(
            `AboutComponent beforeRouteEnter => from=${from.path}, to=${to.path}`
        );
        next();
    },
    beforeRouteUpdate: (to, from, next) => {
        console.log(
            `AboutComponent beforeRouteUpdate => from=${from.path}, to=${to.path}`
        );
        next();
    },
    beforeRouteLeave: (to, from, next) => {
        console.log(
            `AboutComponent beforeRouteLeave => from=${from.path}, to=${to.path}`
        );
        next();
    }
})
export default class About extends Vue {}
</script>
