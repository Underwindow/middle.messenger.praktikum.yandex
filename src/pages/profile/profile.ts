import './profile.css';
import Block from 'core/Block';
import ButtonIcon, { ButtonIconProps } from 'components/button/button-icon/buttonIcon';
import { Input } from 'components/input';
import { CoreRouter, Store } from 'core';
import { ValidationType } from 'utils/validateValue';
import { ButtonSecondary } from 'components/button/button-secondary';
import { changeAvatar, changePassword, logout } from 'services';
import { baseURL, withRouter, withStore, withUser } from 'utils';
import { ChangePasswordRequestData } from 'api';
import { resources } from 'utils/request';

type ProfilePageProps = {
    router: CoreRouter;
    store: Store<AppState>;
    user: User | null;
    btnLogoutProps: ButtonIconProps,
    btnBackProps: ButtonIconProps,
    onLogout?: () => void;
    onSaveAvatar: Callback,
    onSaveProfile: Callback,
    onSavePassword: Callback,
};

export class Profile extends Block<ProfilePageProps> {
    static readonly componentName = 'Profile';

    constructor(props: ProfilePageProps) {
        super(props);

        const btnLogoutProps: ButtonIconProps = {
            icon: ButtonIcon.ICONS.LOGOUT,
            onClick: () => this.props.store.dispatch(logout),
        };

        const btnBackProps: ButtonIconProps = {
            icon: ButtonIcon.ICONS.BACK,
            onClick: () => this.props.router.back(),
        };

        this.setProps({
            user: this.props.store.getState().user,
            btnLogoutProps,
            btnBackProps,
            onSaveAvatar: (e: Event) => {
                e.preventDefault();
                
                var avatarInput = document.getElementById("file-input") as HTMLInputElement;
                console.log(avatarInput.name);
                
                if (avatarInput) {
                    console.log(avatarInput.files![0]);
                    const formData = new FormData();
                    formData.append(avatarInput.name, avatarInput.files![0]);
                    this.props.store.dispatch(changeAvatar, formData);
                }
            },
            onSaveProfile: (e: Event) => {
                e.preventDefault();
                const fieldset = this.refs.fieldsetRef as Input[];
                const isValid = Input.fieldsetValidate(fieldset);

                if (isValid) {
                    console.log('Saving data');
                }
            },
            onSavePassword: (e: Event) => {
                e.preventDefault();
                const passwords = this.refs.passwordsRef as Input[];
                const isValid = Input.fieldsetValidate(passwords);

                if (isValid) {
                    const requestData = passwords.reduce(
                        (data, pwdInput) => {
                            data[pwdInput.name] = pwdInput.value;
                            return data;
                        }, {} as Indexed
                    ) as ChangePasswordRequestData;

                    this.props.store.dispatch(changePassword, requestData);
                }
            },
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

    protected render() {
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
                        <form enctype="multipart/form-data" class="sidebar__image-upload">
                            <div class="image-upload">
                                <label class="image-upload__label" for="file-input">
                                    <img class="image-upload__image" src="${resources}${this.props.user?.avatar}" />
                                    <div class="image-upload__icon-wrapper content-center">
                                        <div class="image-upload__icon material-icons color-hint">
                                            upload
                                        </div>
                                    </div>
                                </label>
                                <input id="file-input" name="avatar" type="file" accept="image/*" required/>
                            </div>
                            <div class="sidebar__button-secondary">
                                {{{ButtonSecondary onClick=onSaveAvatar ref="fileSubmitRef" type="submit" text="Сохранить изменения" disabled="true"}}}
                            </div>
                        </form>
                        <form class="sidebar__fieldset" action="">
                            <div class="sidebar__input-container">
                                <label class="input__label">Почта</label>
                                {{{Input ref="fieldsetRef" name="email" type="text" value=user.email placeholder="Введите текст" validationType="${ValidationType.INPUT_EMAIL}"}}}
                            </div>
                            <div class="sidebar__input-container">
                                <label class="input__label">Логин</label>
                                {{{Input ref="fieldsetRef" name="login" type="text" value=user.login placeholder="Введите текст" validationType="${ValidationType.INPUT_LOGIN}"}}}
                            </div>
                            <div class="sidebar__input-container">
                                <label class="input__label">Имя</label>
                                {{{Input ref="fieldsetRef" name="first_name" type="text" value=user.firstName placeholder="Введите текст" validationType="${ValidationType.INPUT_FIRST_NAME}"}}}
                            </div>
                            <div class="sidebar__input-container">
                                <label class="input__label">Фамилия</label>
                                {{{Input ref="fieldsetRef" name="second_name" type="text" value=user.secondName placeholder="Введите текст" validationType="${ValidationType.INPUT_SECOND_NAME}"}}}
                            </div>
                            <div class="sidebar__input-container">
                                <label class="input__label">Имя в чате</label>
                                {{{Input ref="fieldsetRef" name="display_name" type="text" value=user.displayName placeholder="Введите текст" validationType="${ValidationType.INPUT_LOGIN}"}}}
                            </div>
                            <div class="sidebar__input-container">
                                <label class="input__label">Телефон</label>
                                {{{Input ref="fieldsetRef" name="phone" type="text" value=user.phone placeholder="Введите текст" validationType="${ValidationType.INPUT_PHONE}"}}}
                            </div>
                            <div class="sidebar__button-secondary">
                                {{{ButtonSecondary type="submit" text="Сохранить изменения" onClick=onSaveProfile}}}
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
                                {{{ButtonSecondary type="submit" text="Сменить пароль" onClick=onSavePassword}}}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    }
}

export default withRouter(withStore(withUser(Profile)));