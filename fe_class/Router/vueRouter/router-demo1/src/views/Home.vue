<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <HelloWorld msg="Welcome to Your Vue.js App" />
        <div @click="onClick">点我啊！！！！！！！！</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// @ is an alias to /src

import HelloWorld from "@/components/HelloWorld.vue";
import { RouteNames } from "../router/dynamic";

@Component({
    components: { HelloWorld }
})
export default class Home extends Vue {
    onClick() {
        // export interface Location {
        //     name?: string;
        //     path?: string;
        //     hash?: string;
        //     query?: Dictionary<string | (string | null)[] | null | undefined>;
        //     params?: Dictionary<string>;
        //     append?: boolean;
        //     replace?: boolean;
        // }
        this.$router.push({
            // path: "/about"
            name: RouteNames.About
        });
    }
}
</script>
