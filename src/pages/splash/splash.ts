import { Block } from 'core';

type SplashPageProps = {};

export default class SplashPage extends Block<SplashPageProps> {
    static componentName = 'SplashPage';

    render() {
        return `
        <div class="whole screen content-center color-hint">
            {{{Logo}}}
        </div>
    `;
    }
}