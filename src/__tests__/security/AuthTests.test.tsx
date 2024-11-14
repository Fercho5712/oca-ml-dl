import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Login from '../../pages/Login';
import { BrowserRouter } from 'react-router-dom';

describe('Login Security Tests', () => {
  it('should prevent XSS in login form', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    const xssPayload = "<script>alert('xss')</script>";
    const emailInput = screen.getByLabelText(/correo/i);
    
    fireEvent.change(emailInput, { target: { value: xssPayload } });
    expect(emailInput).not.toContain('<script>');
  });

  it('should not store sensitive data in localStorage', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    const emailInput = screen.getByLabelText(/correo/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(localStorage.getItem('password')).toBeNull();
    expect(localStorage.getItem('plainTextCredentials')).toBeNull();
  });

  it('should implement rate limiting for failed attempts', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    const loginButton = screen.getByText(/iniciar sesión/i);
    
    // Simulate multiple failed login attempts
    for (let i = 0; i < 6; i++) {
      fireEvent.click(loginButton);
    }
    
    await waitFor(() => {
      const errorMessage = screen.getByText(/demasiados intentos/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it('should validate input against SQL injection', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    const emailInput = screen.getByLabelText(/correo/i);
    const sqlInjection = "' OR '1'='1";
    
    fireEvent.change(emailInput, { target: { value: sqlInjection } });
    
    const loginButton = screen.getByText(/iniciar sesión/i);
    fireEvent.click(loginButton);
    
    expect(screen.getByText(/credenciales incorrectas/i)).toBeInTheDocument();
  });

  it('should implement CSRF protection', async () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch;
    
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    const loginButton = screen.getByText(/iniciar sesión/i);
    fireEvent.click(loginButton);
    
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'X-CSRFToken': expect.any(String)
        })
      })
    );
  });
});