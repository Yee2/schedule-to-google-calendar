<template>
    <div>
        <transition-group
                enter-active-class="animated fadeInLeft"
                leave-active-class="animated fadeOutLeft" tag="div">
            <div v-for="(item,index) in data" :key="index">
                <span class="icon"><i class="fas fa-calendar-alt"></i></span> {{item.name}}
                <span class="icon"><i class="fas fa-clock"></i></span>
                {{week[item.week]}}，{{item.startTime}}-{{item.endTime}}节
                <span class="icon" v-if="item.location"><i class="fas fa-map-marker-alt"></i></span> {{item.location}}
                <br/>
                <p class="has-text-right">
                    <a class="button  is-small" @click="update(index)">修改</a>
                    <a class="button  is-small" @click="copy(index)">复制</a>
                    <a class="button  is-small" @click="del(index)">删除</a></p>
                <hr :class="{'is-active':active===index}"/>
            </div>
        </transition-group>
    </div>
</template>

<script>
    let week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    export default {
        name: "list",
        props: {
            data: {
                type: Array
            },
            active: {
                type: Number,
                default: -1
            },
        },
        data: () => {
            return {
                week: week
            };
        },
        methods: {
            update: function (index) {
                this.$emit("update", index);
            },
            del: function (index) {
                this.$emit("delete", index);
            },
            copy:function (index) {
                this.$emit("copy", index);
            }
        }
    }
</script>

<style scoped>
    .is-active {
        background-color: #00d1b2;
    }
</style>