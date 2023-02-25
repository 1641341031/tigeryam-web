<script setup>
function backTop() {
    document.documentElement.scrollTop=document.body.scrollTop=0;
}
</script>

<template>
    <div class="tools-wrap">
        <div class="backhome"><router-link to="/"><svg t="1667735108913" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2530" width="200" height="200"><path d="M946.5 505L560.1 118.8l-25.9-25.9c-12.3-12.2-32.1-12.2-44.4 0L77.5 505c-12.3 12.3-18.9 28.6-18.8 46 0.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8 12.1-12.1 18.7-28.2 18.7-45.3 0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204z m217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" p-id="2531" fill="#ffffff"></path></svg></router-link></div>
        <div @click="backTop" class="backtop"><svg t="1667735156503" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3535" width="200" height="200"><path d="M896 96H128c-17.066667 0-32 14.933333-32 32S110.933333 160 128 160h768c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32zM535.466667 296.533333c-12.8-12.8-32-12.8-44.8 0l-213.333334 213.333334c-12.8 12.8-12.8 32 0 44.8s32 12.8 44.8 0l157.866667-157.866667V853.333333c0 17.066667 14.933333 32 32 32s32-14.933333 32-32V396.8l157.866667 157.866667c6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333c12.8-12.8 12.8-32 0-44.8l-213.333333-213.333334z" p-id="3536" fill="#ffffff"></path></svg></div>
    </div>
</template>

<style scoped lang="scss">
.tools-wrap{
    // background-color: rgba(0, 0, 0, 0.85);
    background-color: rgb(224, 224, 224);
    width:3em;
    border-radius: .5em 0 0 .5em;
    padding: .5em;
    .icon{
        width:2em;
        height: 2em;
        cursor: pointer;
    }
    & div + div{
        margin-top: .5em;
    }
}
</style>