<template>
    <div class="wrapper" ref="wrapper">
        <slot></slot>
    </div>
</template>

<style lang="less">
    .wrapper {
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
    }
</style>

<script>
   import BScroll from 'better-scroll';
   export default {
      name: 'bscroll',
      // 参数传递;
      props: {
        /**
         * 1 滚动的时候会派发scroll事件，会截流。
         * 2 滚动的时候实时派发scroll事件，不会截
         * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
        */
          probeType: {
              type: Number,
              default: 1
          },
          /**
           * 点击列表是否派发click事件;
          */
          click: {
            type: Boolean,
            default: true
          },
          /**
           * 是否开启横向滚动;
          */
          scrollX: {
            type: Boolean,
            default: false
          },
          bounce: {
            type: Boolean,
            default: true
          },
          /**
           * 是否派发滚动事件
          */
          listenScroll: {
            type: Boolean,
            default: false
          },
          /**
           * 列表的数据;
          */
          data: {
            type: Array,
            default: null
          },
          /**
           * 是否派发滚动到底部的事件，用于上拉加载
          */
          pullup: {
            type: Boolean,
            default: false
          },
          /**
           * 是否派发顶部下拉的事件，用于下拉刷新
          */
          pulldown: {
            type: Boolean,
            default: false,
          },
          /**
           * 是否派发列表滚动开始的事件
          */
          beforeScroll: {
            type: Boolean,
            default: false,
          },
          /**
           * 当数据更新后，刷新scroll的延时。
          */
          refreshDelay: {
            type: Number,
            default: 20
          },
      },
      methods: {
        // 初始化滚动对象;
        _initScroll() {
          if(!this.$refs.wrapper) {
            return
          }
          // better-scroll的初始化;
          this.scroll = new BScroll(this.$refs.wrapper, {
              probeType: this.probeType,
              click: this.click,
              scrollX: this.scrollX,
              bounce: this.bounce
          })

          // 是否派发滚动到底部事件，用于上拉加载；
          if (this.pullup) {
            this.scroll.on('scrollEnd', () => {
              //  滚动到底部;
              // console.log(`scroll.y: ${this.scroll.y}`)
              // console.log(`scroll.maxScrollY: ${this.scroll.maxScrollY}`)
              // tips: 都是负值, 距离底部还有50的时候，触发事件;
              if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
                 this.$emit('scrollToEnd')
              }
            })
          }

          // 是否派发顶部下拉事件，用于下拉刷新;
          if (this.pulldown) {
              this.scroll.on('touchend', (pos) => {
                //  下拉动作：
                // 下拉时，y为负值;
                if (pos.y > 50) {
                  this.$emit('pulldown')
                }
              })
          }

          // 是否派发列表滚动开始的事件
          if (this.beforeScroll) {
             this.scroll.on('beforeScrollStart', () => {
               this.$emit('beforeScroll')
             })
          }
        },
        // 禁止滚动方法;
        disable() {
          // 代理better-scroll的disable方法;
          this.scroll && this.scroll.disable()
        },
        // 允许滚动方法;
        enable() {
          // 代理better-scroll的enable方法
          this.scroll && this.scroll.enable()
        },
        refresh() {
          // 代理better-scroll的refresh方法;
          this.scroll && this.scroll.refresh()
        },
        scrollTo() {
          // 代理better-scroll的scrollTo方法;
          this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
          // 代理better-scroll的scrollToElement方法
          this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
      },
      watch: {
        // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
        data() {
        // data: function(){};
          setTimeout(() => {
            this.refresh()
          }, this.refreshDelay)
        }
      },
      mounted() {
        // 保证在DOM渲染完毕后初始化better-scroll；
        // tips: Vue.$nextTick() 是一个异步函数, 确保Dom渲染后再执行, 底层用到了 MutationObserver 或者是 setTimeout(fn, 0),
        //     在这里把 this.$nextTick 替换成 setTimeout(fn, 20) 也是可以的（20 ms 是一个经验值，每一个 Tick 约为 17 ms);
        setTimeout(() => {
          this._initScroll()
        }, 20)
      }
   }
</script>

