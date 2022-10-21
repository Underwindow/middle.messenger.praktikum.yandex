import { Block } from 'core';

type SplashPageProps = {};

export class SplashPage extends Block<SplashPageProps> {
    static componentName = 'SplashPage';

    render() {
        return `
        <div class="whole screen content-center">
            {{{Logo}}}
        </div>
    `;
    }
}

export default SplashPage;
