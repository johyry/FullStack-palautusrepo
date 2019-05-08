import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import SimpleBlog from './SimpleBlog';

test('renders title author and likes as wanted', () => {
  const simpleBlog = {
    title: 'Komponenttitestaus tapahtuu react-testing-library:llä',
    author: 'Test.js',
    likes: 1,
  };

  const component = render(<SimpleBlog blog={simpleBlog} />);

  const div = component.container.querySelector('.titleAndAuthor');
  expect(div).toHaveTextContent(
    'Komponenttitestaus tapahtuu react-testing-library:llä Test.js'
  );

  const div1 = component.container.querySelector('.likes');
  expect(div1).toHaveTextContent('blog has 1 likes');
});

it('clicking the like button twice calls event handler twice', async () => {
  const simpleBlog = {
    title: 'Komponenttitestaus tapahtuu react-testing-library:llä',
    author: 'Test.js',
    likes: 1,
  };

  const mockHandler = jest.fn();

  const { getByText } = render(
    <SimpleBlog blog={simpleBlog} onClick={mockHandler} />
  );

  const button = getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(2);
});
