import Block from '../../utils/Block';
import template from '../../pages/not-found/not-found.hbs';
import AppError from '../../components/AppError/AppError';
import { BlockProps } from '../../utils/BlockProps';

import './not-found.pcss'

export type ErrorPageProps = BlockProps & {
    text?: string,
}

export class NotFoundPage extends Block<ErrorPageProps> {

    private _appError: AppError;

    protected initChildren() {
        this._appError = this.children.error = new AppError({
            code: 'text',
            description: this.props.text,
            link: 'google com',
            events: {
                click: () => alert('clicked')
            }
        });
    }

    protected componentDidUpdate(oldProps: ErrorPageProps, newProps: ErrorPageProps): boolean {

        if (oldProps.text !== newProps.text) {
            this._appError.setProps({
                description: newProps.text
            });
            return true;
        }

        return false;
    }

    protected render(): DocumentFragment {
        return this.compile(template, {})
    }
}