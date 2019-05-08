import React from 'react';
import { render, waitForElement } from 'react-testing-library';
import App from './App';

jest.mock('./services/blogs');

describe('<App />', () => {
  it('if no user logged, blogs are not rendered', async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText('Log In'));

    expect(component.container).toHaveTextContent('login');
    expect(component.container).toHaveTextContent('Log in to view blogs.');
  });

  it('if user is logged in, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      name: 'Teuvo Testaaja',
    };

    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));

    const component = render(<App />);

    component.rerender(<App />);

    await waitForElement(() => component.container.querySelector('.blog'));

    const blogs = component.container.querySelectorAll('.blog');
    expect(blogs.length).toBe(3);
  });
});
