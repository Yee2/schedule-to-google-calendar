<template>
    <div>
        <div class="field is-horizontal">
            <div class="field-body">
                <div class="field has-addons">
                    <p class="control"><a class="button is-static">课程名称</a></p>
                    <p class="control is-expanded">
                        <input class="input" type="text" v-model.trim="name" required placeholder="">
                    </p>
                </div>
                <div class="field has-addons">
                    <p class="control"><a class="button is-static">上课地点</a></p>
                    <p class="control is-expanded">
                        <input class="input" type="text" v-model.trim="location" placeholder="">
                    </p>
                </div>
                <div class="field has-addons">
                    <p class="control"><a class="button is-static">备注信息</a></p>
                    <p class="control is-expanded">
                        <input class="input" type="text" v-model.trim="description" placeholder="">
                    </p>
                </div>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-body">
                <div class="field has-addons">
                    <p class="control"><a class="button is-static">开始时间 ( 周 )</a></p>
                    <p class="control is-expanded">
                        <input class="input" type="text" v-model.number="startWeek" placeholder="默认第一周">
                    </p>
                </div>
                <div class="field has-addons">
                    <p class="control"><a class="button is-static">结束时间 ( 周 )</a></p>
                    <p class="control is-expanded">
                        <input class="input" type="text" v-model.number="endWeek" placeholder="默认最后一周">
                    </p>
                </div>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-body">
                <div class="field is-grouped">
                    <div class="control" v-for="(item,index) in weekArray"
                         :key="index">
                        <a class="button"
                           @click="weekSet(index)"
                           :class="{'is-primary':week===index}"
                        >{{item}}</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="field is-horizontal">
            <div class="field-body">
                <rang @change="(min,max)=>{startTime=min;endTime=max;}" :min="startTime" :max="endTime"/>
            </div>
        </div>
        <div class="field is-grouped is-grouped-centered">
            <p class="control">
                <button type="submit" class="button is-primary" @click="add">
                    {{status=="insert"?"新增":"保存"}}
                </button>
            </p>
            <p class="control" v-if="status==='update'">
                <button type="submit" class="button" @click="cancel">
                    取消
                </button>
            </p>
        </div>
    </div>
</template>

<script>
    let week = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    import rang from './rang.vue'
    import {create} from 'vue-modal-dialogs'
    import MessageBox from "./dialog.vue"

    const messageBox = create(MessageBox, 'content');
    export default {
        name: "editor",
        components: {
            rang
        },
        props: {
            name: {
                type: String,
                required: true
            },
            location: String,
            description: String,
            startWeek: {
                type: Number,
                default: 1
            },
            endWeek: {
                type: Number,
                default: 20
            },
            startTime: {
                type: Number,
                default: 0
            },
            endTime: {
                type: Number,
                default: 0
            },
            week: {
                type: Number,
                default: -1
            },
            status: {
                type: String,
                default: "insert"
            }
        },
        data: () => {
            return {
                weekArray: week
            };
        },
        methods: {
            weekSet: function (i) {
                (i < week.length) && (this.week = i);
            },
            add: function () {
                if (!this.name) {
                    messageBox("请输入课程名称");
                    return;
                }
                if (this.week < 0 || this.week > 6) {
                    messageBox("请选择课程上课时间。");
                    console.log(this.week);
                    return;
                }
                if (this.startTime < 1 || this.endTime > 13) {
                    messageBox("请选择课程上课时间");
                    return;
                }
                this.$emit("data", {
                    name: this.name,
                    location: this.location,
                    description: this.description,
                    startWeek: this.startWeek,
                    endWeek: this.endWeek,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    week: this.week,
                });
            },
            cancel: function () {
                this.$emit("cancel")
            }
        }
    }
</script>


<style>
    .week input[type=radio] {
        display: none;
    }

    .week input[type=radio]:checked + a {
        background-color: #00d1b2;
        border-color: transparent;
        color: #fff;
    }
</style>