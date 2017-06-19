<template>
    <div class="test-container">
      <h4>上传测试</h4>
      <div class="mg-b10">
          <button @click="upload" ref="upload">只是个上传按钮</button>
      </div>
      <div class="mg-b10">
          <button @click="test">辅助按钮</button>
      </div>
      <div>
          <img ref="image" :src="imageUrl" class="preview-image" @load="previewImage">
      </div>
    </div>
</template>

<style lang="less" scoped>
    .test-container {
        padding: 10px;
    }

    .mg-b10 {
        margin-bottom: 10px;
    }

    .preview-image {
        width: 200px;
        height: 150px;
    }
</style>

<script>
    export default {
        name: 'pre-upload',
        data() {
            return {
                imageUrl: ''
            }
        },
        methods: {
            // 上传;
            upload() {
                // step1: 通过 File API 获取图片。
                const fileElem = document.createElement('input'),
                    vm = this;
                fileElem.type = 'file';

                fileElem.click();

                fileElem.addEventListener('change', (event) => {
                    console.log('1111111111');
                    console.log(this)
                        // this， 这里仍然指向Vue实例;
                        //  const file = this.files[0];
                    const file = event.target.files[0];

                    // step2: 使用 createObjectURL() 或者 FileReader 预览图片;
                    // type1:  FileReader;
                    // var img = document.createElement("img");
                    // var reader = new FileReader();
                    // reader.onload = function(e) {
                    //     img.src = e.target.result;
                    // }
                    // reader.readAsDataURL(file);  // 开始读取指定的Blob对象或File对象中的内容.

                    // type2: createObjectURL(blob);
                    // 参数：blob是用来创建 URL 的 File 对象或者 Blob 对象​;
                    // var img = document.createElement('img');
                    // img.src = window.URL.createObjectURL(file);
                    vm.imageUrl = window.URL.createObjectURL(file)
                })
            },
            // 预览;
            previewImage() {
                console.log('预览图片')

                let canvas = document.createElement('canvas'),
                    ctx = canvas.getContext('2d'),
                    MAX_WIDTH = 800,
                    MAX_HEIGHT = 600,
                    width = this.$refs.image.width,
                    height = this.$refs.image.height;
                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                // canvas处理;
                // 向画布上面绘制图片：
                ctx.drwaImage(img, 0, 0, width, height);
                // toBlob(callback, type, encoderOptions) 方法;
                // 参数： 1.callback(blob), 获取blob对象;
                      // 2.type: DOMString类型，指定图片格式，默认格式为image/png。
                      // 3.encoderOptions: Number类型，值在0与1之间，当请求图片格式为image/jpeg或者image/webp时用来指定图片展示质量;
                // 创造Blob对象，用以展示canvas上的图片,
                // 这个图片文件可以被缓存或保存到本地，由用户代理端自行决定。如不特别指明，图片的类型默认为 image/png，分辨率为96dpi。
                canvas.toBlob(blob => {
                    // 处理过后的文件进行上传;
                    const formData = new FormData();
                    // tips: FormData
                      // 所有的输入元素都需要有name属性，否则无法访问到值;
                    formData.append('file', blob);
                    // fetch('/api/upload', { method: 'POST', body: form })
                });

            },
            test() {
                console.log('辅助按钮')
                this.$refs.upload.click()
            }
        }
    }
</script>
