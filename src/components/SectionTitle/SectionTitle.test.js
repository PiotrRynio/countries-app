import { render, screen } from '@testing-library/react';
import SectionTitle from './SectionTitle';

describe('SectionTitle: ', () => {
  test('if text is child prop set, then text is displayed', () => {
    const testText = 'test title';
    const testedComponent = <SectionTitle children={testText} />;
    render(testedComponent);

    const titleText = screen.queryByText(testText);

    expect(titleText).toBeInTheDocument();
  });

  test(`if "isAlert" is not child prop set, then class "sectionTitle__text--alert" is not added`, () => {
    const testText = 'test title';
    const testedComponent = <SectionTitle children={testText} />;
    render(testedComponent);

    const titleHeading = screen.queryByRole('heading');

    expect(titleHeading).not.toHaveClass('sectionTitle__text--alert');
  });

  test('if "isAlert" is child prop set, then class "sectionTitle__text--alert" is added', () => {
    const testText = 'test title';
    const testedComponent = <SectionTitle children={testText} isAlert={true} />;
    render(testedComponent);

    const titleHeading = screen.queryByRole('heading');

    expect(titleHeading).toHaveClass('sectionTitle__text--alert');
  });
});
