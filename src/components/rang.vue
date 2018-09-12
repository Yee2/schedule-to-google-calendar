<template>
    <div class="field buttons has-addons ScheduleTime">
        <p class="control" v-for="item in list" :key="item.value">
            <a class="button"
               :class="{'is-primary':item.value >= min && item.value <= max}"
               @click="select(item.value)"
               @mouseover="over(item.value)">{{item.name}}</a>
        </p>
    </div>
</template>

<script>
    export default {
        name: "",
        data: () => {
            return {
                start: 0,
                list: [
                    {name: "One", value: 1},
                    {name: "Two", value: 2},
                    {name: "Three", value: 3},
                    {name: "Four", value: 4},
                    {name: "Five", value: 5},
                    {name: "Six", value: 6},
                    {name: "Seven", value: 7},
                    {name: "Eight", value: 8},
                    {name: "Nine", value: 9},
                    {name: "Ten", value: 10},
                    {name: "Eleven", value: 11},
                    {name: "Twelve", value: 12},
                ]
            }
        },
        props:{
            min: 0,
            max: 0,
        },
        methods: {
            select: function (i) {
                if (this.start === 0) {
                    this.start = i;
                } else {
                    this.min = this.start < i ? this.start : i;
                    this.max = this.start < i ? i : this.start;
                    this.start = 0;
                    this.$emit("change", this.min, this.max);
                }
            },
            over: function (i) {
                if (this.start === 0) {
                    return;
                }
                this.min = this.start < i ? this.start : i;
                this.max = this.start < i ? i : this.start;
            }
        }
    }
</script>