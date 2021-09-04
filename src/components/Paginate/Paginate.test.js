import { render, screen } from '@testing-library/react';
import Paginate from './Paginate';

describe('Paginate: ', () => {
  const clickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  });

  test('if render "Paginate" component, then buttons are visible', () => {
    render(<Paginate />);
    const testedComponent = screen.queryByRole(/navigation/i);
    expect(testedComponent).toBeInTheDocument();
  });

  test('if props not set, then buttons are visible', () => {
    render(<Paginate />);
    const buttons = screen.queryAllByRole(/button/i);
    expect(buttons[0]).toBeInTheDocument();
  });

  test('if pageCount prop not zero, then button is visible', () => {
    render(<Paginate pageCount={3} />);
    const buttons = screen.queryAllByRole(/button/i);
    expect(buttons[0]).toBeInTheDocument();
  });

  test('if pageCount prop zero, then button is not visible', () => {
    render(<Paginate pageCount={0} />);
    const buttons = screen.queryAllByRole(/button/i);
    expect(buttons[0]).not.toBe(null);
  });

  test('if pageCount prop not set, then exactly 3 buttons are visible', () => {
    render(<Paginate />);
    const buttons = screen.queryAllByRole(/button/i);
    expect(buttons.length).toBe(3);
  });

  test('if pageCount prop has value of 5, then exactly 7 buttons are visible', () => {
    render(<Paginate pageCount={7} />);
    const buttons = screen.queryAllByRole(/button/i);
    expect(buttons.length).toBe(9);
  });

  describe(`if forcePage prop has value of 5 and pageCount prop has value of 20, `, () => {
    test(`then item with number 5 has "active" class`, () => {
      const onPageChangeMock = jest.fn();
      const testedComponent = (
        <Paginate forcePage={5} pageCount={20} onPageChange={onPageChangeMock} />
      );
      render(testedComponent);

      const paginateItem = screen.getByText(/5/i);
      expect(paginateItem.parentElement).toHaveClass('active');
    });

    test(`and if button with number 1 was clicked, then item with number 1 gets "active" class and item with number 5 loses it`, () => {
      const onPageChangeMock = jest.fn();
      const testedComponent = (
        <Paginate forcePage={5} pageCount={20} onPageChange={onPageChangeMock} />
      );

      render(testedComponent);
      const paginateItem = screen.getByText(/5/i);
      const beingClickedPaginateItem = screen.getByText(/1/i);

      beingClickedPaginateItem.dispatchEvent(clickEvent);

      expect(beingClickedPaginateItem.parentElement).toHaveClass('active');
      expect(paginateItem.parentElement).not.toHaveClass('active');
    });

    test(`and if button wth number 3 was clicked, then call "onPageChange" function with value of "3"`, () => {
      const onPageChangeMock = jest.fn();
      const testedComponent = (
        <Paginate forcePage={5} pageCount={20} onPageChange={onPageChangeMock} />
      );
      render(testedComponent);
      const beingClickedPaginateItem = screen.getByText(/3/i);

      beingClickedPaginateItem.dispatchEvent(clickEvent);

      expect(onPageChangeMock).toBeCalled();
      expect(onPageChangeMock).lastCalledWith(3);
    });
  });
});
