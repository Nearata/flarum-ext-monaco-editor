import MonacoEditor from "./components/MonacoEditor";
import app from "flarum/admin/app";
import EditCustomCssModal from "flarum/admin/components/EditCustomCssModal";
import EditCustomFooterModal from "flarum/admin/components/EditCustomFooterModal";
import EditCustomHeaderModal from "flarum/admin/components/EditCustomHeaderModal";
import { extend } from "flarum/common/extend";
import Stream from "flarum/common/utils/Stream";

app.initializers.add("nearata-monaco-editor", () => {
    const mountMonacoEditor = (
        element: Element,
        language: string,
        setting: Stream<string>
    ) => {
        if (!element) {
            return;
        }

        const textarea = element.querySelector("textarea");

        if (!textarea) {
            return;
        }

        const container = document.createElement("div");

        container.style.width = textarea.offsetWidth + "px";
        container.style.height = textarea.offsetHeight + "px";

        textarea.parentElement?.appendChild(container);

        textarea.style.display = "none";

        m.mount(container, {
            view: () => m(MonacoEditor, { language, setting }),
        });
    };

    extend(EditCustomHeaderModal.prototype, "form", function (vnode) {
        mountMonacoEditor(this.element, "html", this.setting("custom_header"));
    });

    extend(EditCustomFooterModal.prototype, "form", function (vnode) {
        mountMonacoEditor(this.element, "html", this.setting("custom_footer"));
    });

    extend(EditCustomCssModal.prototype, "form", function (vnode) {
        mountMonacoEditor(this.element, "less", this.setting("custom_less"));
    });
});
