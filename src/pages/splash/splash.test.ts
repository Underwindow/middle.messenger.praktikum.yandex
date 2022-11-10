import { getByTestId } from '@testing-library/dom';
import { renderBlock } from 'tests/renderUtils';
import SplashPage from './splash';

describe('pages/Splash', () => {
    it('should render logo', () => {
        renderBlock({
            Block: SplashPage,
            props: {},
        });

        expect(getByTestId(document.body, 'splash-logo')).toBeInTheDocument();
    });
});
