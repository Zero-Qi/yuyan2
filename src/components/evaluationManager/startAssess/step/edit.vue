<template>
    <div>
        <quill-editor
                      v-model="content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @change="onEditorChange($event)"
              >
              </quill-editor>
    </div>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor';

export default {
    components: {
        quillEditor
    },
     data() {
    return {
      rateValue: null,
      rateStyle: {
        fontSize: "35px"
      },
      content: null, // 初始编辑器内容
      editorOption: {
          modules: {
          toolbar:  [
            ['bold', 'italic', 'underline', 'strike'],        // 加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'],                      //引用，代码块
            [{ 'header': 1 }, { 'header': 2 }],               // 几级标题
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],     // 有序列表，无序列表
            [{ 'script': 'sub'}, { 'script': 'super' }],      // 下角标，上角标
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // 缩进
            [{ 'direction': 'rtl' }],                         // 文字输入方向
            [{ 'size': ['small', false, 'large', 'huge'] }],  // 字体大小
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],// 标题
            [{ 'color': [] }, { 'background': [] }],          // 颜色选择
            [{ 'font': [] }],// 字体
            [{ 'align': [] }], // 居中
            ['clean']                                         // 清除样式
          ]
        }
      } // 编辑器配置项
    };
  },
  created() {},
  methods: {
    onEditorBlur() {
        console.log('失去焦点事件');
      //失去焦点事件
    },
    onEditorFocus() {
        console.log('获得焦点事件');
      //获得焦点事件
    },
    onEditorChange($event) {
        
        console.log('获得内容改变事件',$event.text);
      //内容改变事件
    }
  }
}
</script>