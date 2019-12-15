import { MessageBox } from "element-ui";
import { ref } from "@vue/composition-api";

export function global() {
  const str = ref("");
  const confirm = params => {
    MessageBox.confirm(params.content, params.Tips || "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: params.type || "warning",
      center: true
    })
      //点击确定
      .then(() => {
        str.value = params.id || "";
        params.fn && params.fn(params.id || "");
      })
      //点击取消
      .catch(() => {
        params.catchfn && params.catchfn();
      });
  };
  return {
    str,
    confirm
  };
}
