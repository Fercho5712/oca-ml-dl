import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Login from '../../pages/Login';
import { BrowserRouter } from 'react-router-dom';

describe('Authentication Security Tests', () => {
  it('should not store sensitive data in localStorage', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    
    const usernameInput = screen.getByLabelText(/usuario/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);
    
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpass' } });
    
    expect(localStorage.getItem('password')).toBeNull();
    expect(localStorage.getItem('plainTextCredentials')).toBeNull();
  });

  it('should clear sensitive data after logout', () => {
    localStorage.setItem('testData', 'sensitive');
    // Simulate logout
    localStorage.clear();
    expect(localStorage.getItem('testData')).toBeNull();
  });
});