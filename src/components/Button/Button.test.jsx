import { render, screen, fireEvent } from '@testing-library/react'

import Button from './Button'

describe('Button Component', () => {
  test('renders children correctly', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })

  test('applies default styles', () => {
    render(<Button>Click Me</Button>)
    const button = screen.getByText('Click Me')
    expect(button).toHaveClass('bg-primary')
    expect(button).toHaveClass('rounded-md')
  })

  test('applies custom className', () => {
    render(<Button className="custom-class">Click Me</Button>)
    const button = screen.getByText('Click Me')
    expect(button).toHaveClass('custom-class')
  })

  test('renders loading state', () => {
    render(<Button isLoading={true}>Click Me</Button>)
    const button = screen.getByText('Loading...')
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
    expect(button).toHaveClass('bg-accent')
  })

  test('handles onClick events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click Me</Button>)
    const button = screen.getByText('Click Me')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
