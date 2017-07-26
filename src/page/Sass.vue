<template>
    <div class="sass-box">
        <group title="sass语法">
            <cell title="测试sass中的&- 选择器">
                <div class="sass-title" slot="value">标题</div>
            </cell>
            <cell title="测试sass中的$variable">
                <div class="sass-content" slot="value">内容部分</div>
            </cell>
            <cell title="close icon">
                <div class="sass-close" slot="value"></div>
            </cell>
            <cell title="arrow-top">
                <div class="sass-arraw-top" slot="value"></div>
            </cell>
            <cell title="arrow-bottom">
                <div class="sass-arraw-bottom" slot="value"></div>
            </cell>
            <cell title="arrow-left">
                <div class="sass-arraw-left" slot="value"></div>
            </cell>
            <cell title="arrow-right">
                <div class="sass-arraw-right" slot="value"></div>
            </cell>
        </group>
        <group title="函数">
            <div class="sass-grid-container">
                <div class="col-four"></div>
            </div>
        </group>
        <group title="sass运算">
            <cell title="布尔值运算">
                <template slot="value">
                    <div class="sass-boolean1">type-1:红色</div>
                    <div class="sass-boolean2">type-1:红色</div>
                    <div class="sass-boolean3">type-1:红色</div>
                    <div class="sass-boolean4">type-1:红色</div>
                </template>
            </cell>
        </group>

        <group title="sass中的运算">
            <cell title="数组运算：index($list, $value)">
                <div class="sass-typecolor1" slot="value">blue</div>
            </cell>
            <cell title="数组运算：index($list, $value)">
                <div class="sass-typecolor2" slot="value">yellow</div>
            </cell>
            <cell title="数组运算：index($list, $value)">
                <div class="sass-typecolor3" slot="value">purple</div>
            </cell>
            <cell title="数组运算：index($list, $value)">
                <div class="sass-typecolor4" slot="value">orange</div>
            </cell>
        </group>

        <group tilte="% 占位符选择器">
            <cell title="% 占位符选择器">
                <div class="sass-placeholder" slot="value">sass-placeholder</div>
            </cell>
            <cell title="占位符选择器">
                <div class="sass-place" slot="value">sass-占位符</div>
            </cell>
        </group>

        <group title="插值语句，模版">
            <cell title="#{}的使用：相当于lesss中的@{}">
                <div class="sass-slot1">margin: 10px 20px</div>
            </cell>
            <cell title="#{}的使用：相当于lesss中的@{}">
                <div class="sass-slot2">margin-top: 10px</div>
            </cell>
            <cell title="sass的使用方式：">
                <div class="sass-margin1">margin1</div>
            </cell>
            <cell title="sass的使用方式：">
                <div class="sass-margin2">margin2</div>
            </cell>
            <cell title="sass的使用方式：">
                <div class="sass-margin3">margin3</div>
            </cell>
            <cell title="sass的使用方式：">
                <div class="sass-margin4">margin4</div>
            </cell>
        </group>

        <group title="triangle">
            <cell title="left:">
                <div class="sass-triangle-left"></div>
            </cell>
            <cell title="right:">
                <div class="sass-triangle-right"></div>
            </cell>
            <cell title="top:">
                <div class="sass-triangle-top"></div>
            </cell>
            <cell title="bottom:">
                <div class="sass-triangle-bottom"></div>
            </cell>
            <cell title="boxes测试">
                <div class="sass-triangle-boxes">boxes</div>
            </cell>
        </group>

        <div class="sass-float-right">右侧浮动</div>


        <div class="sass-grid">
            <div class="col">1111</div>
            <div class="col">1111</div>
            <div class="col">1111</div>
        </div>

        <group title="sass-Map">
            <cell title="color">
                <div class="sass-map-color1">color1</div>
            </cell>
            <cell title="media query">
                <div class="sass-map-media">media query</div>
            </cell>
            <cell title="media query custom">
                <div class="sass-map-custom">media query custom</div>
            </cell>
        </group>
        <!--<div>动画frame</div>-->
        <!--<div class="sass-frame"></div>-->
        <group title="测试全局引入的scss文件">
          <cell title="变量">
            <div class="">variables变量测试</div>
          </cell>
        </group>
    </div>
</template>

<script>
import { XHeader, Cell, Group, XInput, XButton } from 'vux'
export default {
    name: 'sass-demo',
    components: {
        XHeader, Cell, Group, XInput, XButton
    },
    created() {
        this.$store.dispatch('setHeader', {
            title: 'Sass测试',
            leftOption: {
                showBack: true
            }
        })
    }
}
</script>

<style lang="scss">
// $blue 和 引入.scss 文件中的默认变量值冲突了， 会优先采取当前值;
$blue: purple;
@import '../styles/main';

.sass {
    &-box {
        padding: 10px;
    }
    &-title {
        color: red;
        font-size: $fs-16;
    }
    &-content {
        color: $blue;
        font-size: 14px;
    }
    &-close {
        @include vux-close;
    }
}

.sass-arraw {
    &-top {
        @include setArrow(6px, #c8c8cd, 2px, top)
    }
    &-bottom {
        @include setArrow(6px, #c8c8cd, 2px, bottom)
    }
    &-left {
        @include setArrow(6px, #c8c8cd, 2px, left)
    }
    &-right {
        @include setArrow(6px, #c8c8cd, 2px, right)
    }
}

// 动画效果的声明;
@include keyframes(move-the-object) {
    // 0% {
    //     transform: translateX(0);
    // }
    // 100% {
    //     transfrom: translateX(200px);
    // }
     0% {
        top: 0px;
        background-color: red;
     }
     50% {
        top: 70px;
        background-color: yellow;
     }
     100% {
        top: 150px;
        background-color: red;
     }
}

// 动画的使用： animation css属性;
.sass-frame {
    width: 100px;
    height: 100px;
    background-color: red;
    position: relative;
    animation: move-the-object linear  5s infinite;
    // 回到keyframes调用上面来，除了独立调用声明好的混合宏之外，还可以跟随元素一起调用：
    // tips: 在元素类名下， 直接声明动画;
}
.sass-boolean1{
    @include switchcolor(1);
}
.sass-boolean2{
    @include switchcolor(2);
}
.sass-boolean3{
    @include switchcolor(3);
}
.sass-boolean4{
    @include switchcolor(4);
}
.sass {
    &-typecolor1 {
        @include typecolor(yellow);
    }
    &-typecolor2 {
        @include typecolor(blue);
    }
    &-typecolor3 {
        @include typecolor(purple);
    }
    &-typecolor4 {
        @include typecolor(orange);
    }
    &-placeholder {
        @extend %clearfix;
    }
    &-place {
        @extend %bg-blue;
    }
    &-slot1 {
        @include margin(10px, 20px);
    }
    &-slot2 {
        @include mg(top, 10px);
    }
    &-margin1 {
        @include mgin(10px);
    }
    &-margin2 {
        @include mgin(10px 20px);
    }
    &-margin3 {
        @include mgin(10px 15px 20px);
    }
    &-margin4 {
        @include mgin(10px 15px 20px 25px);
    }
}
// 三角形；
    .sass-triangle {
        &-left {
            @include triangle(left, 8px, red);
        }
        &-right {
            @include triangle(right, 8px, red);
        }
        &-top {
            @include triangle(top, 8px, red);
        }
        &-bottom {
            @include triangle(bottom, 8px, red);
        }
        &-boxes {
            @include box-shadow(0 0 5px rgba(0,0,0,.3));
            @include box-sizing;
            @include transform(scale(1.5));
        }
    }
    .sass-float-right {
        // 占位符选择器 的使用;
        @extend %float-right;
    }
    // $_gutter: 2;
    .sass-grid {
        @extend %clearfix;
        .col {
            @include float;
            margin: 0 $_gutter;
            width: get_width(3);

            h2 {
                padding-left: 10px;
                width: get_width(3, true, 2000);
            }
        }
    }
    .sass-map {
        &-color1 {
            // color 函数的使用;
            color: color(red, normal, .6);
        }
        &-media {
            // media mixin 的使用;
            @include media (phone) {
                color: green;
            }
            @include media(tablet) {
                color: red;
            };
            @include media(small, inbetween) {
                color: blue;
            }
            @include media (small) {
                color: purple;
            }
        }
        &-custom {
            // 用户自定义规则;
            @include media (custom, screen, " and (min-device-width: 700px)") {
                color: red;
            }
        }
    }
</style>
