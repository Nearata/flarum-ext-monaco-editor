import Stream from "flarum/common/utils/Stream";

export default class MonacoEditorState {
    language: string;
    setting: Stream<string>;

    constructor(language: string, setting: Stream<string>) {
        this.language = language;
        this.setting = setting;
    }

    render(element: Element) {
        window.requirejs.config({
            paths: {
                vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs",
            },
        });

        window.requirejs(["vs/editor/editor.main"], () => {
            const editor = window.monaco.editor.create(element, {
                value: this.setting(),
                language: this.language,
            });

            editor.onDidChangeModelContent(() => {
                this.setting(editor.getValue());
                m.redraw();
            });
        });
    }
}
