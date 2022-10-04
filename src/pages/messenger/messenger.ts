import Block from 'core/Block';
import HeaderProps, { Header } from 'components/header/header';

import './messenger.css';
import Input from 'components/input';
import InputProps from 'components/input/input';
import BubbleProps from 'components/bubble/bubble';
import BubbleGroup from 'components/bubble/bubbleGroup';
import BubbleGroupProps from 'components/bubble/bubbleGroup/bubbleGroup';
import ChatProps from 'components/chat/chat';
import Chat from 'components/chat';

export class Messenger extends Block {
    constructor() {
        super();
        const tempChatProp: ChatProps = {
            username: 'Эмиль',
            lastMessage: 'Привет, почему не спишь?',
            time: '4:20',
            badge: '1',
            avatarSrc: 'https://www.w3schools.com/tags/img_girl.jpg',
        };

        const tempChatProp2: ChatProps = {
            username: 'ЭмилЖЕня',
            lastMessage: 'Привет, почему не спишь?',
            time: '4:21',
            badge: '1',
            avatarSrc: 'https://www.w3schools.com/tags/img_girl.jpg',
        };


        //Fetch chats data here
        const chatsProps = [tempChatProp, tempChatProp2, { ...tempChatProp }] as ChatProps[];

        this.setProps({
            chatId: '',
            chatsProps: [],
            chats: [],
            bubbleGroupProps: [],
            onInput: (e: Event) => {
                const inputEl = e.target as HTMLInputElement; console.log(inputEl.name);
            },
        });

        this.props.chatsProps = chatsProps;
        this.subscribeOnChats();
    }

    subscribeOnChats() {
        const chats = this.refs.chats as Chat[];
        if (!chats)
            return;
        chats.forEach(chat => {
            chat.setProps({
                events: {
                    click: () => { this._onChatClick(chat); }
                }
            });
        });
    }

    private _activeChat?: Chat;

    _onChatClick(chat: Chat) {
        console.log('click');

        if (this._activeChat) {
            this._activeChat.setActive(false);
        }

        this._activeChat = chat;
        this._activeChat.setActive(true);
        this._initBubbles(this.props.chatId = chat.id);
    }

    _initBubbles(chatId: string) {
        if (chatId) {
            console.log(this.refs.bubbleGroup);
            const bubbleGroupProps = [{
                bubblesDate: 'Today',
                bubbleProps: [{
                    isIn: false,
                    message: 'Привет',
                    time: '4:20',
                    name: 'Евгений',
                } as BubbleProps, {
                    isIn: true,
                    message: 'Прив, что такое? Где пропадал все это время?',
                    time: '4:21',
                    name: 'Эмиль',
                } as BubbleProps,]
            }];

            this.props.bubbleGroupProps = bubbleGroupProps;
            this.subscribeOnChats();
        }
    }

    render() {
        console.log('render Messenger');
        // language=hbs
        return `
        <div class="whole">
            <div class="main-layout">
                <div class="chat whole">
                    {{{Header 
                        ref="chatHeader"
                        avatarSrc="https://www.w3schools.com/tags/img_girl.jpg"
                        title="Эмиль"
                        rightButton="more_vert"
                    }}}

                    <div class="chat-selected">
                        <div class="scrollable-y">
                            <div class="chat-inner">
                                {{#each bubbleGroupProps}}
                                {{{BubbleGroup 
                                    ref="bubbleGroup"
                                    bubblesDate=bubblesDate
                                    bubbleProps=bubbleProps
                                }}}
                                {{/each}}
                            </div>
                        </div>
                    </div>
                    <div class="chat-input">
                        <div class="chat-input-container">
                            <div class="rows-wrapper">
                                <div class="chat-input-wrapper">
                                    <div class="new-message-wrapper">
                                        <div class="input-message-container">
                                            {{{Input 
                                                ref="chatInput"
                                                onInput=onInput
                                                name="message"
                                                type="text"
                                                placeholder="Введите сообщние"
                                            }}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="btn-send-container">
                                <button class="btn-send material-icons clear-btn">send</button>
                            </div>
                        </div>
                    </div>
                    {{#if chatId}}
                    
                    {{else}}
                    <div class="chat-not-selected back-panel">
                        <div class="content-center whole">
                            <p>Выберите чат, чтобы отправить сообщение</p>
                        </div>
                    </div>
                    {{/if}}
                </div>
                <div class="sidebar panel">
                    {{{Header 
                        ref="sidebarHeader"
                        avatarSrc="https://www.w3schools.com/tags/img_girl.jpg"
                        title="Евгений"
                        rightButton="logout"
                        rightLink="login"
                    }}}
                    <div class="sidebar-container">
                        <div class="sidebar__actions">
                            {{{Input 
                                ref="searchInput"
                                onInput=onInput
                                name="message"
                                type="text"
                                placeholder="Поиск"
                                icon="search"
                            }}}
                            <button class="material-icons icon-btn add-btn">add</button>
                        </div>
                        <div class="sidebar__chats">
                            <div class="scrollable-y">
                                {{#each chatsProps}}
                                {{{Chat 
                                    ref="chats"
                                    onClick=onClick
                                    avatarSrc=avatarSrc 
                                    username=username 
                                    time=time 
                                    lastMessage=lastMessage 
                                    badge=badge
                                }}}
                                {{/each}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    }
}