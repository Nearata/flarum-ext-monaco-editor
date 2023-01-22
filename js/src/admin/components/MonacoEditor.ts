import load from "external-load";
import Component from "flarum/common/Component";
import type Mithril from "mithril";

let loaded = false;

const addResources = async () => {
    if (loaded) {
        return;
    }

    await load.js(
        "https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"
    );

    loaded = true;
};

export default class MonacoEditor extends Component {
    oncreate(vnode: Mithril.Vnode<this>): void {
        super.oncreate(vnode);

        addResources().then(() => {
            window.requirejs.config({
                paths: {
                    vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs",
                },
            });

            window.requirejs(["vs/editor/editor.main"], () => {
                const editor = window.monaco.editor.create(this.element, {
                    value: this.attrs.setting(),
                    language: this.attrs.language,
                });

                editor.getModel().onDidChangeContent(() => {
                    this.attrs.setting(editor.getValue());
                    m.redraw();
                });
            });
        });
    }

    view(vnode: Mithril.Vnode<this>) {
        return m(".NearataMonacoEditor");
    }
}
