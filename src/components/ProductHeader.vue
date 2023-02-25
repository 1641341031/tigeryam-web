<script setup>
</script>

<template>
    <header>
        <h3>
            <slot></slot>
        </h3>
        <div class="more" >
            <a href="#">查看更多 <span class="arrow-right">&gt;</span></a>
        </div>
    </header>
</template>

<style scoped lang="scss">
header {
    h3 {
        float: left;
        color: #333;
        font-size: 22px;
        font-weight: 200;
        line-height: 58px;
        margin-left: 0.5em;
    }

    .more {
        float: right;
        a {
            text-decoration: none;
            font-size: 16px;
            color: #424242;
            line-height: 58px;
            margin-right: .5em;

            &:hover {
                color: var(--colororigin);
                .arrow-right{
                    background-color: var(--colororigin);
                }
            }
            .arrow-right{
                color: #fff;
                display: inline-block;
                width: 20px;
                text-align: center;
                line-height: 20px;
                border-radius: 50%;
                background-color: #e3e3e3;
            }
        }
    }

    &::after { //清除浮动
        content: " ";
        clear: both;
        display: block;
    }
}
</style>