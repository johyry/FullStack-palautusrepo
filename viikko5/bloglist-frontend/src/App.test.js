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
    const component = render(<App />);
    component.rerender(<App />);

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja',
    };

    await window.localStorage.setItem(
      'loggedBlogAppUser',
      JSON.stringify(user)
    );

    const blog = component.container.querySelector('.blog');
    console.log(blog);
    //await waitForElement(() => component.container.querySelector('.blog'));

    component.debug();
  });
});
