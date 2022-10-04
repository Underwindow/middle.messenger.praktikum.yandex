import Block from "../../utils/Block";
import { BlockProps } from "../../utils/BlockProps";
import template from "../../partials/error/error.hbs";

import './apperror.css'

export type AppErrorProps = BlockProps & {
    code: string;
    description: string;
    link: string;
}

export default class AppError extends Block<AppErrorProps> {

    constructor(props: AppErrorProps) {
        super(props);
    }

    protected initChildren() {
        //throw new Error("Method not implemented.");
    }

    protected render(): DocumentFragment {
        return this.compile(template, { ...this.props });
    }
}