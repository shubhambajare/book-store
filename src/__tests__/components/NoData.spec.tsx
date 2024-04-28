import { render } from '@testing-library/react';
import NoData from '../../components/NoData';

describe('NoData Component', () => {
    test('renders component without crashing', () => {
        render(<NoData />);
    });

    test('has correct CSS class for container', () => {
        const { container } = render(<NoData />);
        const containerElement = container.querySelector('.bs-no-data-container');
        expect(containerElement).toBeInTheDocument();
    });

    test('has correct CSS class for container', () => {
        const { container } = render(<NoData />);
        const containerElement = container.querySelector('.bs-no-data-container');
        expect(containerElement).toBeInTheDocument();
    });

    test('renders text with line break', () => {
        const { container } = render(<NoData />);
        const textContainer = container.querySelector('.bs-no-data-container');
        expect(textContainer?.innerHTML).toContain('<br>');
    });
});
