<template>
    <div class="content">
        <div class="has-text-right">
            <a @click="show = !show">
                <h1 class="is-inline">
                    帮助
                    <i class="far fa-minus-square" v-if="show"></i>
                    <i class="far fa-plus-square" v-if="!show"></i>
                </h1>
            </a>
        </div>

        <transition
                enter-active-class="animated lightSpeedIn"
                leave-active-class="animated slideOutDown"
        >
            <div v-if="show">
                <hr/>
                <h3>课程信息</h3>
                <p>
                    <img src="../assets/001.png"/>
                </p>
                <p>按照格式填写</p>
                <p>
                    <img src="../assets/002.png"/>
                </p>

                <p>
                    添加完成后，点击
                    <a class="button is-static is-small"><span class="icon is-small"><i
                            class="fas fa-download"></i></span><span>下载</span></a>
                    将下载一个<code>schedule.csv</code>文件，
                    打开 <a href="https://calendar.google.com/calendar/r?tab=wc" target="_blank">Google日历</a>，
                    点击左上角<span class="icon is-large"> <i class="fas fa-lg fa-cog"></i></span>图标，将下载的文件导入到日历里面。
                </p>
                <p>
                    <img src="../assets/003.png"/>
                </p>
                <h3>刷新下一日历就可以看到添加的课程。</h3>
                <p>
                    <img src="../assets/004.png"/>
                </p>
            </div>
        </transition>

    </div>
</template>

<script>
    export default {
        name: "help",
        data: () => {
            return {
                show: false,
            }
        }
    }
</script>

<style scoped>

</style>