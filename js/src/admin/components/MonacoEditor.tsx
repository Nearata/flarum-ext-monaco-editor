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
    oninit(vnode: Mithril.Vnode<this>): void {
        super.oninit(vnode);
    }

    oncreate(vnode: Mithril.Vnode<this>): void {
        super.oncreate(vnode);

        addResources().then(() => {
            this.attrs.state.render(this.element);
        });
    }

    view(vnode: Mithril.Vnode<this>) {
        return <div class="NearataMonacoEditor" />;
    }
}
