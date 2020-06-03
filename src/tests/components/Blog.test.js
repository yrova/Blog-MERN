import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from '../../components/Blog';
import { prettyDOM, getByText } from '@testing-library/dom'

describe('Test for Blog rendering', () => {

    let component
    const mockUpdateLikeHandler = jest.fn();
    const mockDeleteBlogHandler = jest.fn();
    const blog = {
        title: 'Component testing is done with the react-testing-library',
        author: 'Avory Richie',
        url: 'www.wow.com',
        likes: 9,
        user: {
            name: 'Melanie Tam'
        }
    };

    beforeEach(() => {
        component = render(
            <Blog blog={blog} updateLike={mockUpdateLikeHandler} deleteBlog={mockDeleteBlogHandler} />,
        );
    })

    test('renders only title and author', () => {   

        expect(component.container).toHaveTextContent(blog.title);
        expect(component.container).toHaveTextContent(blog.author);
        expect(component.container).not.toHaveTextContent(blog.url);
        expect(component.container).not.toHaveTextContent(blog.likes);
        expect(component.container).not.toHaveTextContent(blog.user.names);
    });

    test('clicking the view button displays correct information', () => {
        
        const viewButton = component.container.querySelector('button')
        fireEvent.click(viewButton);

        expect(component.container).toHaveTextContent(blog.url);
        expect(component.container).toHaveTextContent(blog.title);
        expect(component.container).toHaveTextContent(blog.author);
        expect(component.container).toHaveTextContent(blog.likes);
        expect(component.container).toHaveTextContent(blog.user.name);
    })

    test('If the Like button is clicked twice, the event handler is called twice', async () => {

        const viewButton = component.container.querySelector('button')
        fireEvent.click(viewButton);

        const button =  component.getByText('like');
        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockUpdateLikeHandler.mock.calls.length).toBe(2);


        
    })
});
