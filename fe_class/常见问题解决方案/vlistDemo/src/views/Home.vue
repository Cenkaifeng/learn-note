<template>
    <div
        class="infinite-list-container"
        ref="list"
        @scroll="scrollEvent"
    >
        <div class="scrollTopBtn" @click="scrollToTop" v-show="end > 20">
            回到顶部
        </div>
        <div
            class="infinite-list-phantom"
            :style="{ height: listHeight + 'px' }"
        ></div>
        <div class="infinite-list" :style="{ transform: getTransform }">
            <div
                class="infinite-list-item"
                v-for="item in visibleData"
                :key="item.id"
                :style="{ height: itemSize + 'px',lineHeight: itemSize + 'px' }"
            >
                <div class="left-section">
                    {{ item.title[0] }}
                </div>
                <div class="right-section">
                    <div class="title">{{ item.title }}</div>
                    <div class="desc">{{ item.content }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Prop, Watch, Component } from 'vue-property-decorator';
import Faker from 'faker';

interface Data {
    title: string;
    content: string;
    id: number | string;
}

@Component
export default class VirtualList extends Vue {
    public readonly itemSize: number = 100;

    public listData: Data[] = [];

    // 可视区域高度
    public screenHeight: number = document.documentElement.clientHeight || document.body.clientHeight;

    // 可显示的列表项数
    public visibleCount: number = Math.ceil(this.screenHeight / this.itemSize);

    // 偏移量
    public startOffset: number = 0;
    // 起始索引
    public start: number = 0;
    // 结束索引
    public end: number = this.start + this.visibleCount;

    public $refs: {
        list: any;
    };

    // 列表总高度
    get listHeight() {
        return this.listData.length * this.itemSize;
    }

    // 偏移量对应的style
    get getTransform() {
        return `translate3d(0,${this.startOffset}px,0)`;
    }

    // 获取真实显示列表数据
    get visibleData() {
        return this.listData.slice(
            this.start,
            Math.min(this.end, this.listData.length)
        );
    }

    getTenListData() {
        if (this.listData.length >= 200) {
            return [];
        }
        return new Array(10).fill({}).map(item => ({ id: Faker.random.uuid(), title: Faker.name.title(), content: Faker.random.words() }))
    }

    created() {
        this.listData = this.getTenListData();
    }

    scrollToTop() {
        this.$refs.list.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    public scrollEvent(e: any) {
        // 当前滚动位置
        const scrollTop = this.$refs.list.scrollTop;
        // 此时的开始索引
        this.start = Math.floor(scrollTop / this.itemSize);
        // 此时的结束索引
        this.end = this.start + this.visibleCount;
        
        if (this.end > this.listData.length) {
            this.listData = this.listData.concat(this.getTenListData());
        }

        // 此时的偏移量
        this.startOffset = scrollTop - (scrollTop % this.itemSize);
    }
}
</script>

<style>

.scrollTopBtn {
        position: fixed;
    border-radius: 50%;
    font-size: 12px;
    color: white;
    background: goldenrod;
    bottom: 101px;
    right: 20px;
    z-index: 10000;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;

}

.infinite-list-container {
    margin-top: 10px;
    height: 99%;
    overflow: scroll;
    position: relative;
    -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
}

.infinite-list {
    left: 0;
    right: 0;
    top: 0;
    position: absolute;
    text-align: center;
}

.infinite-list-item {
    background: white;
    box-shadow: 0 0 10px rgba(144, 144, 144, 0.15);
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
    /* padding: 10px; */
    margin-top: 10px;
}


.left-section {
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 25px;
    font-weight: bold;
    color: white;
    background: #6ab6fc;
    border-radius: 10px;
}

.right-section {
    height: 100%;
    margin-left: 20px;
    flex: 1;

}

.title {
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    height: 14px;
}

.desc {
    margin-top: 10px;
    font-size: 12px;
    font-weight: 400;
    text-align: left;
    height: 12px;

}

</style>
