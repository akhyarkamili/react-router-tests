import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
import { BrowserRouter } from 'react-router-dom'
import { createStaticRouter, StaticRouterProvider } from '@remix-run/router'

// For testing client-side navigation
const renderWithBrowser = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter })
}

// For testing direct URL access (SSR)
const renderWithStatic = (ui: React.ReactElement, url: string) => {
  const router = createStaticRouter([
    {
      path: '*',
      element: ui
    }
  ], {
    basename: '',
    location: url
  })

  return render(
    <StaticRouterProvider router={router} context={{}} />
  )
}

describe('Router', () => {
  describe('Direct URL Access (SSR)', () => {
    it('should render home page on direct access to /', () => {
      renderWithStatic(<App />, '/')
      expect(screen.getByText(/welcome to the home page/i)).toBeInTheDocument()
    })

    it('should render about page on direct access to /about', () => {
      renderWithStatic(<App />, '/about')
      expect(screen.getByText(/about page/i)).toBeInTheDocument()
    })

    it('should render 404 page on direct access to non-existent route', () => {
      renderWithStatic(<App />, '/non-existent-route')
      expect(screen.getByText(/404/i)).toBeInTheDocument()
    })
  })

  describe('Client-side Navigation', () => {
    it('should navigate to about page when clicking about link', async () => {
      renderWithBrowser(<App />)
      const user = userEvent.setup()
      
      const aboutLink = screen.getByRole('link', { name: /about/i })
      await user.click(aboutLink)
      await waitFor(() => {
        expect(screen.getByText(/about page/i)).toBeInTheDocument()
      })
    })

    it('should navigate back to home page when clicking home link', async () => {
      renderWithBrowser(<App />)
      const user = userEvent.setup()
      
      const aboutLink = screen.getByRole('link', { name: /about/i })
      await user.click(aboutLink)
      
      const homeLink = screen.getByRole('link', { name: /home/i })
      await user.click(homeLink)
      await waitFor(() => {
        expect(screen.getByText(/welcome to the home page/i)).toBeInTheDocument()
      })
    })

    it('should preserve counter state during client-side navigation', async () => {
      renderWithBrowser(<App />)
      const user = userEvent.setup()
      
      // Click counter on home page
      const incrementButton = screen.getByRole('button', { name: /increment/i })
      await user.click(incrementButton)
      await waitFor(() => {
        expect(screen.getByText(/count: 1/i)).toBeInTheDocument()
      })
      
      // Navigate to about page and back
      await user.click(screen.getByRole('link', { name: /about/i }))
      await waitFor(() => {
        expect(screen.getByText(/about page/i)).toBeInTheDocument()
      })
      
      await user.click(screen.getByRole('link', { name: /home/i }))
      await waitFor(() => {
        expect(screen.getByText(/count: 1/i)).toBeInTheDocument()
      })
    })
  })
}) 