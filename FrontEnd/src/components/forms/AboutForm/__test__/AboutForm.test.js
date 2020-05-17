import React from 'react'
import ReactDOM from 'react-dom'
import { render, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import AboutForm from '../AboutForm'

afterEach(cleanup)

it('matches snapshot', async () => {
  const tree = renderer.create(<AboutForm />).toJSON()
  expect(tree).toMatchSnapshot()
})

it('renders without crashing', async () => {
  const div = document.createElement('div')
  ReactDOM.render(<AboutForm />, div)
  ReactDOM.unmountComponentAtNode(div)
})