<template>
    <div class="about">
        <h1>This is an test page</h1>
        <router-link to="/test/1">Test-1</router-link> |
        <router-link to="/test/2">Test-2</router-link>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {},
    beforeRouteEnter: (to, from, next) => {
        // 这里无法通过this来获取页面各种属性和方法
        console.log(
            `TestComponent beforeRouteEnter => from=${from.path}, to=${to.path}`
        );
        next();
    },
    beforeRouteUpdate: (to, from, next) => {
        // /test/1 ->? /test/2
        // 此行为会触发beforeRouteUpdate
        console.log(
            `TestComponent beforeRouteUpdate => from=${from.path}, to=${to.path}`
        );
        next();
    },
    beforeRouteLeave: (to, from, next) => {
        console.log(
            `TestComponent beforeRouteLeave => from=${from.path}, to=${to.path}`
        );
        next();
    }
})
export default class Test extends Vue {}
</script>
