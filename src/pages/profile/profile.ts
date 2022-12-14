import './profile.css';
import { Block, CoreRouter, Store } from 'core';
import {
    Screens, withRouter, withStore, withUser,
} from 'utils';
import { ValidationType } from 'utils/validateValue';
import {
    changeAvatar, changePassword, changeProfile, logout,
} from 'services';
import { ChangePasswordRequestData, ChangeProfileRequestData } from 'api';
import { Input } from 'components/input';
import { ButtonSecondary } from 'components/button';
import { ButtonIcon, ButtonIconProps } from 'components/button/button-icon';
import { ImageUpload } from 'components/image-upload';

interface ProfileProps extends Props {
    router: CoreRouter,
    store: Store<AppState>,
    user: User | null,
    btnLogoutProps: ButtonIconProps,
    btnBackProps: ButtonIconProps,
    onChooseAvatar: Callback,
}

enum SaveBtnName {
    Avatar = 'save_avatar',
    Profile = 'save_profile',
    Password = 'save_password',
}

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
                onClick: () => this.props.router.go(Screens.Messenger),
            },
            onChooseAvatar: () => {
                const saveAvatarBtn = this.refs.avatarSubmitRef as ButtonSecondary;
                const avatarInput = this.refs.avatarInputRef as ImageUpload;
                saveAvatarBtn.setProps({ disabled: !avatarInput.fileList });
            },
            onSaveAvatar: () => {
                const avatarInput = this.refs.avatarInputRef as ImageUpload;

                if (avatarInput) {
                    const file = avatarInput.fileList![0];
                    console.log(file);
                    const formData = new FormData();
                    formData.append(avatarInput.name, file);
                    this.props.store.dispatch(changeAvatar, formData);
                }
            },
            onSaveProfile: () => {
                const fieldset = this.refs.fieldsetRef as Input[];
                const isValid = Input.validateFieldset(fieldset);
                const profileData = Input.trasformFieldset<ChangeProfileRequestData>(fieldset);

                if (isValid) {
                    this.props.store.dispatch(changeProfile, profileData);
                }
            },
            onSavePassword: () => {
                const passwords = this.refs.passwordsRef as Input[];
                const isValid = Input.validateFieldset(passwords);

                if (isValid) {
                    const data = Input.trasformFieldset<ChangePasswordRequestData>(passwords);

                    this.props.store.dispatch(changePassword, data);
                }
            },
            events: {
                submit: (e: SubmitEvent) => {
                    e.preventDefault();
                    e.stopPropagation();

                    const buttonName = (e.submitter as HTMLButtonElement).name as SaveBtnName;

                    if (buttonName === SaveBtnName.Avatar) {
                        this.props.onSaveAvatar();
                    } else if (buttonName === SaveBtnName.Profile) {
                        this.props.onSaveProfile();
                    } else if (buttonName === SaveBtnName.Password) {
                        this.props.onSavePassword();
                    }
                },
            },
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
                            title="??????????????"
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
                                {{{ButtonSecondary name="${SaveBtnName.Avatar}" type="submit" ref="avatarSubmitRef"  text="?????????????????? ??????????????????" disabled="true"}}}
                            </div>
                        </form>
                        <form class="sidebar__fieldset" action="">
                            <div class="sidebar__input-container">
                                <label class="input__label">??????????</label>
                                {{{Input ref="fieldsetRef" name="email" type="text" value=user.email placeholder="?????????????? ??????????" validationType="${ValidationType.INPUT_EMAIL}"}}}
                            </div>
                            <div class="sidebar__input-container">
                                <label class="input__label">??????????</label>
                                {{{Input ref="fieldsetRef" name="login" type="text" value=user.login placeholder="?????????????? ??????????" validationType="${ValidationType.INPUT_LOGIN}"}}}
                            </div>
                            <div class="sidebar__input-container">
                                <label class="input__label">??????</label>
                                {{{Input ref="fieldsetRef" name="first_name" type="text" value=user.firstName placeholder="?????????????? ??????????" validationType="${ValidationType.INPUT_FIRST_NAME}"}}}
                            </div>
                            <div class="sidebar__input-container">
                                <label class="input__label">??????????????</label>
                                {{{Input ref="fieldsetRef" name="second_name" type="text" value=user.secondName placeholder="?????????????? ??????????" validationType="${ValidationType.INPUT_SECOND_NAME}"}}}
                            </div>
                            <div class="sidebar__input-container">
                                <label class="input__label">?????? ?? ????????</label>
                                {{{Input ref="fieldsetRef" name="display_name" type="text" value=user.displayName placeholder="?????????????? ??????????" validationType="${ValidationType.INPUT_LOGIN}"}}}
                            </div>
                            <div class="sidebar__input-container">
                                <label class="input__label">??????????????</label>
                                {{{Input ref="fieldsetRef" name="phone" type="text" value=user.phone placeholder="?????????????? ??????????" validationType="${ValidationType.INPUT_PHONE}"}}}
                            </div>
                            <div class="sidebar__button-secondary">
                                {{{ButtonSecondary name="${SaveBtnName.Profile}" type="submit" text="?????????????????? ??????????????????"}}}
                            </div>
                        </form>
                        <form class="sidebar__footer panel" action="">
                            <div class="sidebar__input-container">
                                {{{Input ref="passwordsRef" name="oldPassword" type="password" placeholder="???????????? ????????????" validationType="${ValidationType.INPUT_PASSWORD}"}}}
                            </div>
                            <div class="sidebar__input-container">
                                {{{Input ref="passwordsRef" name="newPassword" type="password" placeholder="?????????? ????????????" validationType="${ValidationType.INPUT_PASSWORD}"}}}
                            </div>
                            <div class="sidebar__button-secondary">
                                {{{ButtonSecondary name="${SaveBtnName.Password}" type="submit" text="?????????????? ????????????"}}}
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
