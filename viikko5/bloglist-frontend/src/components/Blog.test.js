import React from 'react';
import 'jest-dom/extend-expect';
import { render, fireEvent } from 'react-testing-library';
import Blog from './Blog';

describe('<Blog tests />', () => {
  let component;

  beforeEach(() => {
    const simpleBlog = {
      title: 'Yksinkertainen Blogi',
      author: 'Testaaja',
      url: 'www.testaajat.fi',
      user: {
        username: 'käyttäjä',
        password: 'salasana',
      },
      likes: 0,
    };

    const user = {
      username: 'käyttäjä',
      password: 'salasana',
    };

    component = render(<Blog blog={simpleBlog} user={user} />);
  });

  it('at start the url and likes are not displayed', () => {
    // component.debug();

    const div = component.container.querySelector('.togglableContent');

    expect(div).toHaveStyle('display: none');
  });

  it('at start author and title are visible', () => {
    const div = component.container.querySelector('.showContentButton');

    expect(div).toHaveTextContent('Title: Yksinkertainen Blogi By: Testaaja');
  });

  it('when clicking blog title the url and likes are displayed', () => {
    const button = component.container.querySelector('.showContentButton');

    fireEvent.click(button);

    const div = component.container.querySelector('.togglableContent');

    expect(div).not.toHaveStyle('display: none');
  });
});
