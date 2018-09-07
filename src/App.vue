<template>
    <div id="app">
        <div class="section">
            <div class="container">
                <div class="columns">
                    <div class="column is-8">
                        <editor @data="save" v-bind="current" :status="status" @cancel="cancel"/>
                    </div>
                    <div class="column is-4">
                        <list :data="list" @update="editor" @delete="del" :active="index"/>
                        <div class="has-text-centered">
                            <div class="field has-addons">
                                <p class="control"><a class="button is-static">开学时间</a></p>
                                <p class="control is-expanded">
                                    <datepicker v-model="date" min="2018-01-01"></datepicker>
                                </p>
                                <p class="control">
                                    <a class="button" @click="download">
                                        <span class="icon is-small"><i class="fas fa-download"></i></span>
                                        <span>下载</span>
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section class="section">
                <div class="container">
                    <help/>
                </div>
            </section>
        </div>
        <dialogs-wrapper></dialogs-wrapper>
    </div>
</template>

<script>
    let a = document.createElement("a");
    a.style = "display: none";
    document.body.appendChild(a);
    import editor from './components/editor.vue'
    import list from './components/list.vue'
    import help from './components/help.vue'
    import generate from './generate.js'
    import "bulma/css/bulma.css";
    import "animate.css/animate.css"
    import "@fortawesome/fontawesome-free/css/all.css"
    import datepicker from 'vue-date'

    import {create} from 'vue-modal-dialogs'
    import MessageBox from "./components/dialog.vue"

    const messageBox = create(MessageBox, 'content');

    let defaultSchedule = {
        name: "默认课程",
        location: "",
        description: "",
        startWeek: 1,
        endWeek: 20,
        startTime: 0,
        endTime: 0,
        week: -1,
    };
    export default {
        name: 'app',
        components: {
            editor,
            list,
            datepicker,
            help,
        },
        data: () => {
            return {
                status: "insert",
                index: -1,
                list: [],
                current: defaultSchedule,
                generate: "",
                date: "2018-9-1"
            };
        },
        methods: {
            editor: function (index) {
                this.current = this.list[index];
                this.status = "update";
                this.index = index;
            },
            insert: function (obj) {
                this.list.push(obj);
            },
            update: function (index, obj) {
                this.list.splice(index, 1, obj);
                // this.list[index] = obj;
            },
            del: function (index) {
                this.list.splice(index, 1);
            },
            cancel: function () {
                this.status = "insert";
                this.current = defaultSchedule;
                this.index = -1;
            },
            save: function (obj) {
                if (this.status === "insert") {
                    this.insert(obj);
                } else {
                    this.update(this.index, obj);
                    this.status = "insert";
                }
                this.cancel();
            },
            download: function () {
                if (this.list.length < 1) {
                    messageBox("请先添加课程");
                    return;
                }
                let raw = new Blob([generate(this.date, this.list)], {type: "text/csv"});
                let objectURL = URL.createObjectURL(raw);
                a.href = objectURL;
                a.download = "schedule.csv";
                a.click();
                window.URL.revokeObjectURL(objectURL);
            }
        }
    }
</script>
<style>
    .date-picker {
        height: 2.25em !important;
    }

    .date-picker .input-wrapper {
        height: 2.25em !important;
    }

    .date-picker .input-wrapper .input {
        text-align: center;
        /*height: 2.25em !important;*/
    }
</style>