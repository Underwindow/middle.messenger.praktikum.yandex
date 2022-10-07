import './chatStub.css';
import Block from 'core/Block';

export default class ChatStub extends Block<Props> {
    public static readonly NAME = 'ChatStub';

    protected render() {
        console.log('render', this.constructor.name);

        // language=hbs
        return `
        <div class="chat__stub back-panel">
            <div class="content-center whole">
                <p>Выберите чат, чтобы отправить сообщение</p>
            </div>
        </div>
    `;
    }
}
