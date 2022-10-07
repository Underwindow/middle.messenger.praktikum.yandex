import Block from 'core/Block';
import Input from 'components/input';
import { ButtonIcon, ButtonIconProps } from 'components/button/button-icon/buttonIcon';
import { ValidationType } from 'helpers/validateValue';
import ChatBubbles from 'components/chat-bubbles';
import ChatStub from 'components/chat-stub';
import Header from 'components/header';

import './chat.css';

export class Chat extends Block<Props> {
    public static readonly NAME = 'Chat';

    constructor() {
        const moreBtnProps: ButtonIconProps = {
            icon: ButtonIcon.ICONS.MORE_VERT,
            onClick: () => console.log('more clicked')
        };

        super({
            moreBtnProps: moreBtnProps,
            onSubmit: (e: Event) => {
                e.preventDefault();

                const messageInput = this.refs.messageInputRef as Input
                
                const success = Input.fieldsetValidate([messageInput]);
                
                if (success) {
                    console.log('Validation success');
                    console.log('Sending message');
                }
                else {
                    console.log('Validation failed');
                }
            },
        });
    }

    public getBubbles(): ChatBubbles {
        return this.refs.chatBubblesRef as ChatBubbles;
    }

    public getStub(): ChatStub {
        return this.refs.stubRef as ChatStub;
    }

    public getHeader(): Header {
        return this.refs.chatHeader as Header;
    }

    render() {
        console.log('render', this.constructor.name);
        
        // language=hbs
        return `
        <div class="chat whole">
            {{{Header 
                ref="chatHeader"
                avatarSrc="https://www.w3schools.com/tags/img_girl.jpg"
                title="Эмиль"
                rightBtnProps=moreBtnProps
            }}}

            <div class="chat__bubbles-container">
                <div class="scrollable-y">
                    {{{ChatBubbles ref="chatBubblesRef"}}}
                </div>
            </div>
            <div class="chat__message-container">
                <form class="chat__message-wrapper">
                    <div class="chat__message-rows-wrapper">
                        <div class="chat__message-input-container">
                            <div class="chat__message-input-wrapper">
                                <div class="chat__input-container">
                                    {{{Input 
                                        ref="messageInputRef"
                                        validationType="${ValidationType.INPUT_MESSAGE}"
                                        name="message"
                                        type="text"
                                        placeholder="Введите сообщние"
                                        onBlur=onBlur
                                    }}}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chat__button">
                    {{{ButtonIcon 
                        ref="sendButtonRef" 
                        onClick=onSubmit 
                        type="submit" 
                        icon="${ButtonIcon.ICONS.SEND}"
                        color="${ButtonIcon.COLORS.WHITE}"
                    }}}
                    </div>
                </form>
            </div>
            {{{ChatStub ref="stubRef"}}}
        </div>
    `;
    }
}