import './profile.css';
import { Block, CoreRouter, Store } from 'core';
import { withRouter, withStore, withUser } from 'utils';
import { ValidationType } from 'utils/validateValue';
import {
    changeAvatar, changePassword, changeProfile, logout,
} from 'services';
import { ChangePasswordRequestData, ChangeProfileRequestData } from 'api';
import { Input } from 'components/input';
import { ButtonSecondary } from 'components/button';
import { ButtonIcon, ButtonIconProps } from 'components/button/button-icon';
import { ImageUpload } from 'components/image-upload';

type ProfileProps = {
    router: CoreRouter,
    store: Store<AppState>,
    user: User | null,
    btnLogoutProps: ButtonIconProps,
    btnBackProps: ButtonIconProps,
    onChooseAvatar: Callback,
    onSaveAvatar: Callback,
    onSaveProfile: Callback,
    onSavePassword: Callback,
};

export class Profile extends Block<ProfileProps> {
    static readonly componentName = 'Profile';

    constructor(props: ProfileProps) {
        super({
            ...props,
            btnLogoutProps: {
                icon: ButtonIcon.ICONS.LOGOUT,
                onClick: () => this.props.store.dispatch(logout),
            },
            btnBackProps: {
                icon: ButtonIcon.ICONS.BACK,
                onClick: () => this.props.router.back(),
            },
            onChooseAvatar: () => {
                const saveAvatarBtn = this.refs.avatarSubmitRef as ButtonSecondary;
                const avatarInput = this.refs.avatarInputRef as ImageUpload;
                saveAvatarBtn.setProps({ disabled: !avatarInput.fileList });
            },
            onSaveAvatar: (e: Event) => {
                e.preventDefault();

                const avatarInput = this.refs.avatarInputRef as ImageUpload;

                if (avatarInput) {
                    const file = avatarInput.fileList![0];
                    console.log(file);
                    const formData = new FormData();
                    formData.append(avatarInput.name, file);
                    this.props.store.dispatch(changeAvatar, formData);
                }
            },
            onSaveProfile: (e: Event) => {
                e.preventDefault();
                const fieldset = this.refs.fieldsetRef as Input[];
                const isValid = Input.validateFieldset(fieldset);
                const profileData = Input.trasformFieldset<ChangeProfileRequestData>(fieldset);

                if (isValid) {
                    this.props.store.dispatch(changeProfile, profileData);
                }
            },
            onSavePassword: (e: Event) => {
                e.preventDefault();
                const passwords = this.refs.passwordsRef as Input[];
                const isValid = Input.validateFieldset(passwords);

                if (isValid) {
                    const data = Input.trasformFieldset<ChangePasswordRequestData>(passwords);

                    this.props.store.dispatch(changePassword, data);
                }
            },
        });
    }

    protected componentDidUpdate(oldProps: ProfileProps, newProps: ProfileProps): boolean {
        super.componentDidUpdate(oldProps, newProps);

        return false;
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
                            {{{ImageUpload 
                                ref="avatarInputRef" 
                                name="avatar"
                                onInput=onChooseAvatar 
                                src=user.avatar
                            }}}
                            <div class="sidebar__button-secondary">
                                {{{ButtonSecondary onClick=onSaveAvatar ref="avatarSubmitRef" type="submit" text="Сохранить изменения" disabled="true"}}}
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
