import Block from 'core/Block';
import Input from 'components/input';
import ButtonIcon from 'components/button/button-icon';
import { ButtonIconProps } from 'components/button/button-icon/buttonIcon';
import { renderDOM } from 'core';
import { SignInPage } from 'pages/entry';
import Messenger from 'pages/messenger';
import { ValidationType } from 'helpers/validateValue';

import './profile.css';
import ButtonSecondary from 'components/button/button-secondary';

export class Profile extends Block {
    constructor() {
        const btnLogoutProps: ButtonIconProps = {
            icon: ButtonIcon.ICONS.LOGOUT,
            onClick: () => renderDOM(new SignInPage)
        };

        const btnBackProps: ButtonIconProps = {
            icon: ButtonIcon.ICONS.BACK,
            onClick: () => renderDOM(new Messenger)
        };

        super({
            btnLogoutProps: btnLogoutProps,
            btnBackProps: btnBackProps,
            onSubmitFileUpload: (e: Event) => {
                e.preventDefault();

                console.log('Saving avatar');
            },
            onSubmitFieldset: (e: Event) => {
                e.preventDefault();
                const fieldset = this.refs.fieldsetRef as Input[];
                const success = Input.fieldsetValidate(fieldset);
                
                if (success) {
                    console.log('Validation success');
                    console.log('Saving data');
                }
                else {
                    console.log('Validation failed');
                }
            },
            onSubmitPasswords: (e: Event) => {
                e.preventDefault();
                const passwords = this.refs.passwordsRef as Input[];
                const success = Input.fieldsetValidate(passwords);

                if (success) {
                    console.log('Validation success');
                    console.log('Saving new password');
                }
                else {
                    console.log('Validation failed');
                }
            }
        });

        this._subscribeOnFileUpload();
    }

    private _subscribeOnFileUpload() {
        const fileInput = this.element?.querySelector('#file-input') as HTMLInputElement;
        const submitBtnSecondary = this.refs.fileSubmitRef as ButtonSecondary;

        fileInput.addEventListener('input', () => {
            submitBtnSecondary.setProps({ disabled: !fileInput.value });
        });
    }

    render() {
        console.log('render Messenger');
        // language=hbs
        return `
        <div class="whole">
            <div class="main-layout">
                <div class="sidebar panel">
                    <div class="sidebar__header">
                        {{{Header 
                            ref="sidebarHeader"
                            title="Профиль"
                            leftBtnProps=btnBackProps
                            rightBtnProps=btnLogoutProps
                        }}}
                    </div>
                    <div class="sidebar__content panel">
                        <form class="sidebar__image-upload" action="" >
                            <div class="image-upload">
                                <label class="image-upload__label" for="file-input">
                                    <img class="image-upload__image" src="https://via.placeholder.com/150x150" />
                                    <div class="image-upload__icon-wrapper content-center">
                                        <div class="image-upload__icon material-icons color-hint">
                                            upload
                                        </div>
                                    </div>
                                </label>
                                <input id="file-input" type="file" name="avatar" required/>
                            </div>
                            <div class="sidebar__button-secondary">
                                {{{ButtonSecondary onClick=onSubmitFileUpload ref="fileSubmitRef" type="submit" text="Сохранить изменения" disabled="true"}}}
                            </div>
                        </form>
                        <form class="sidebar__fieldset" action="">
                            <div class="sidebar__input-container">
                                <label class="input__label">Почта</label>
                                {{{Input ref="fieldsetRef" name="email" value="example@mail.ru" validationType="${ValidationType.INPUT_EMAIL}"}}}
                            </div>
                            <div class="sidebar__input-container">
                                <label class="input__label">Логин</label>
                                {{{Input ref="fieldsetRef" name="login" value="Underwindow" validationType="${ValidationType.INPUT_LOGIN}"}}}
                            </div>
                            <div class="sidebar__input-container">
                                <label class="input__label">Имя</label>
                                {{{Input ref="fieldsetRef" name="first_name" value="Евгений" validationType="${ValidationType.INPUT_FIRST_NAME}"}}}
                            </div>
                            <div class="sidebar__input-container">
                                <label class="input__label">Фамилия</label>
                                {{{Input ref="fieldsetRef" name="second_name" value="Поздняков" validationType="${ValidationType.INPUT_SECOND_NAME}"}}}
                            </div>
                            <div class="sidebar__input-container">
                                <label class="input__label">Имя в чате</label>
                                {{{Input ref="fieldsetRef" name="display_name" value="Underwindow" validationType="${ValidationType.INPUT_LOGIN}"}}}
                            </div>
                            <div class="sidebar__input-container">
                                <label class="input__label">Телефон</label>
                                {{{Input ref="fieldsetRef" name="phone" value="88005553535" validationType="${ValidationType.INPUT_PHONE}"}}}
                            </div>
                            <div class="sidebar__button-secondary">
                                {{{ButtonSecondary type="submit" text="Сохранить изменения" onClick=onSubmitFieldset}}}
                            </div>
                        </form>
                        <form class="sidebar__footer panel" action="">
                            <div class="sidebar__input-container">
                                {{{Input ref="passwordsRef" name="oldPassword" type="password" placeholder="Старый пароль" validationType="${ValidationType.INPUT_PASSWORD}"}}}
                            </div>
                            <div class="sidebar__input-container">
                                {{{Input ref="passwordsRef" name="newPassword" type="password" placeholder="Новый пароль" validationType="${ValidationType.INPUT_PASSWORD}"}}}
                            </div>
                            <div class="sidebar__button-secondary">
                                {{{ButtonSecondary type="submit" text="Сменить пароль" onClick=onSubmitPasswords}}}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    }
}